const apiOutput = document.getElementById("apiOutput");

const urlParams = new URLSearchParams(window.location.search);
const streamerId = urlParams.get('streamerId');

try {
    RealtimeIRL
        .forStreamer("twitch", streamerId)
        .addLocationListener((location) => {
            console.log(location);
            apiOutput.innerHTML = JSON.stringify(location);
        });
}
catch (e) {
    apiOutput.innerHTML = JSON.stringify({ error: "Error retrieving RealtimeIRL output." });
    console.log(e);
}
