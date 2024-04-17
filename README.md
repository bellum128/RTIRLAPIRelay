# RealtimeIRL API Relay
---

### Description
An extremely hacked together way of retreiving a Twitch streamer's location if they are broadcasting to the RealtimeIRL live map service. Probably the worst code I have ever written, as I could not get the @rtirl/api library to work server side; So I am hosting and displaying the JSON string of their location in a clientside static webpage, then using Puppeteer to read that string in Node, exposing it as a proper JSON API endpoint.

### Related Projects
- [bellum128/TwitchPlaneBot](https://github.com/bellum128/TwitchPlaneBot)
- [bellum128/FlightProximityAPI](https://github.com/bellum128/FlightProximityAPI)
