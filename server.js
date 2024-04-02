const path = require('path');
const express = require("express");
const app = express();
const port = 18209;

console.log("RealtimeIRL API Relay Starting...");

express.static.mime.define({'application/javascript': ['js']});
app.use(express.static(path.join(__dirname, 'public')));
app.use('/rtirl-api', express.static(path.join(__dirname, 'node_modules/@rtirl/api/lib')));


app.listen(port, () => {
    console.log(`RealtimeIRL API Relay Started on Port ${port}.`);
});

