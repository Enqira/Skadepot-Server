require('dotenv').config()
const express = require('express');
const formidable = require('formidable');
const path = require('path')
var multer  = require('multer')
const nodemailer = require("nodemailer");


 
const app = express();
 
// setup static folder for images
app.use('/uploads/images', express.static(path.join(__dirname, 'public')))

// setup multer storage and filename
const storage = multer.diskStorage({
        destination: './uploads/images/',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null, req.body.title+ '-' + Date.now()+".jpg");
        }
    }
)

var upload = multer( { storage: storage } );
// finish with multer

app.get('/', (req, res) => {
  
  res.send('Welcome to node-skadepot server')
});
var subjectField
var imagePath
var imageName

app.post('/upload', upload.single('image'), function (req, res, next) {
  // req.file will hold files like images
  // req.body will hold the text fields, if there were any

  console.log("uncoming post request from Skadepot")
  console.log("title: "+req.body.title)
  console.log("image file name: "+req.file.filename)
  console.log("image path: "+req.file.path)
  // console.log("file encoding: "+req.file.encoding)
  imageName = req.file.filename
  imagePath = req.file.path
  subjectField = req.body.title
  sendEmailNow()

  res.end('It worked!');
  
})


"use strict"


// async..await is not allowed in global scope, must use a wrapper
function sendEmailNow() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
    //let testAccount = await nodemailer.createTestAccount();
const account = {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
}
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: account.user, // generated ethereal user
      pass: account.pass, // generated ethereal password
    },
    tls:{
      rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  let info = transporter.sendMail({
    from: '"Fred Foo 👻" <moenqira@gmail.com>', // sender address
    to: 'moenkira@yahoo.com', // list of receivers
    subject: subjectField, // Subject line
    text: "Hello world?", // plain text body
    html: 'Embedded image: <img src="cid:unique@kreata.ee"/>', // html body
    attachments: [
         {   // data uri as an attachment
          filename: imageName,
        path: imagePath,
        cid: 'cid:unique@kreata.ee' //same cid value as in the html img src
    }
     ]
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// sendEmailNow().catch(console.error);





const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));



