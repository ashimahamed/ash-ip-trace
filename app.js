const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const ejs = require('ejs');

const app = express();
app.use(express.static("Public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.set('view engine', 'ejs');

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html")

})

app.post("/result", function(req, res) {
    var ipAddress = req.body.ip;
    var URL = "http://ip-api.com/json/" + ipAddress

    request(URL, function(error, response, body) {
        var loc = JSON.parse(body)
        var country = loc.country;
        var countryCode = loc.countryCode;
        var region = loc.regionName;
        var city = loc.city;
        var zip = loc.zip;
        var latitude = loc.lat;
        var longitude = loc.lon;
        var org = loc.org;
        var timezone = loc.timezone;
        var isp = loc.isp;
        var asname = loc.as;
        var hosting = loc.hosting;
        var currency = loc.currency;

        res.render('data', {
            country: country,
            countryCode: countryCode,
            regionName: region,
            cityName: city,
            zipCode: zip,
            lat: latitude,
            lon: longitude,
            organization: org,
            timezone: timezone,
            isp: isp,
            as: asname,
            hosting: hosting,
            currency: currency
        });
    });
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on PORT 3000");
})