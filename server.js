const config = require("./config.json");
const path = require("path");
const express = require("express");
const puppeteer = require("puppeteer");
const app = express();

console.log("RealtimeIRL API Relay Starting...");

let locationJSON;

express.static.mime.define({ "application/javascript": ["js"] });
app.use(express.static(path.join(__dirname, "public")));
app.use("/rtirl-api", express.static(path.join(__dirname, "node_modules/@rtirl/api/lib")));

app.get("/location", (req, res) => {
    location = JSON.parse(locationJSON);
    location.streamerId = config.streamerId;
    res.send(JSON.stringify(location));
});

app.listen(config.port, () => {
    console.log(`RealtimeIRL API Relay Started on Port ${config.port}.`);

    console.log(`Attempting page pull:`);
    const url = `${config.host}:${config.port}/?streamerId=${config.streamerId}`;
    console.log(`Relay URL: ${url}`);
    const selector = "body";
    monitorTextChanges(url, selector)
        .catch(error => console.error(error));
});

async function monitorTextChanges(url, selector, checkInterval = 1000) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    let currentText = await page.evaluate(selector => document.querySelector(selector).innerText, selector);

    console.log("Initial location:", currentText);
    locationJSON = currentText;

    const checkForChanges = async () => {
        const newText = await page.evaluate(selector => document.querySelector(selector).innerText, selector);

        if (newText !== currentText) {
            console.log("New location:", newText);
            currentText = newText;
            locationJSON = currentText;
        }

        setTimeout(checkForChanges, checkInterval);
    };

    setTimeout(checkForChanges, checkInterval);
}