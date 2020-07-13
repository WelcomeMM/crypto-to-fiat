//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    var crypto = req.body.crypto;
    var fiat = req.body.fiat;

    request("https://apiv2.bitcoinaverage.com/indices/global/ticker/"+ crypto + fiat, function (error, response, body) {

        var data = JSON.parse(body);
        var price = data.last;
        var crypto = req.body.crypto;
        var fiat = req.body.fiat;
        

        res.write("The current price of " + crypto +  " is " + price + fiat);
        res.send()
    });

    

    
});

app.listen(3000, function () {
    console.log("Server running to the port 3000");
});