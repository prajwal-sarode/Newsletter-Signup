const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https')
const mailchimp = require("@mailchimp/mailchimp_marketing");


const app = express();

app.use(express.static("public/css"));
app.use(bodyParser.urlencoded({extended: true}));

mailchimp.setConfig({
    apiKey: "***",
    server: "us9"
});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.emaiconst

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us9.api.mailchimp.com/3.0/?apikey=***";

    const options = {
        method: "POST",
        auth: '***:***-us9'
    }

    const request = https.request(url, options, function(response) {
            
        
        if (response.statusCode ===200){
            res.send("Successfully subscribed");
        } else {
            res.send("There was an error with signing up, please try again!");
        }
        
        response.on("data", function(data){
           console.log(JSON.parse(data))
        })
    });

    request.write(jsonData);
    request.end();

});


app.listen(3000, function(){
    console.log("Server is running on port 3000");
});


// API
// d7c6db6e46a1b2a66bdadc7fe2846cab-us9

// List ID
// 2f233c300c