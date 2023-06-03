const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/signup.html", function(req, res){
//     res.sendFile(__dirname + "/signup.html")
// })

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  // console.log(firstName, lastName, email);

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us9.api.mailchimp.com/3.0/lists/95e422f522";

  const options = {
    method: "POST",
    auth: "edgar1:9d30300c4f59dce43b777160c6cf223d-us9",
  };

  const request = https.request(url, options, function (response) {
   
     if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req, res) {
  res.redirect("/")
})

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});

// API Key with name of key
// 9d30300c4f59dce43b777160c6cf223d-us9

// List/Audience ID
// 95e422f521
