
const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//var db = require("./db");

// app.get('/all', function(req, res) {
//     var collection = db.get().collection('posts')
  
//     collection.find().toArray(function(err, docs) {
//         res.status(500);
//         res.json({
//           posts: docs
//         });
//     })
//   })

app.post('/email', function(req,res) {
    try
    {
        console.log(req.body);
        
        var name = req.body.name;
        var email = req.body.email;
        var message = req.body.message;

        var emailMsg = name + " " + email + " " + message;

        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'wcramblitt@gmail.com',
            pass: 'M0Pa1N31Kung'
        }
        });

        var mailOptions = {
        from: 'wcramblitt@gmail.com',
        to: 'wcramblitt@gmail.com',
        subject: name + " " + email + " ",
        text: emailMsg
        };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        }); 
        res.json("success");
    }
    catch (e) {
        console.log(e);
        res.json("error");
    }
        res.status(200);
})


//db.connect(function (res) {
    app.listen(port, () => console.log(`Wesley Cramblitt listening on port ${port}!`))
//});



