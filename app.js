var app = require('./config/server');
const https = require('https');
const fs = require('fs');

var port = process.env.PORT || 3003;

const options = {
    key: fs.readFileSync("/home/ubuntu/certificate/genesyscloudapps_coddera_com_key.txt"),
    cert: fs.readFileSync("/home/ubuntu/certificate/genesyscloudapps.coddera.com.crt"),
    ca: [
            fs.readFileSync('/home/ubuntu/certificate/genesyscloudapps.coddera.com.ca-bundle')
    ]
  };

// we will pass our 'app' to 'https' server
https.createServer(options, app).listen(port, function(){
    console.log("Server HTTPS Listen port: " + port);
});