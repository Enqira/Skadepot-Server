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
  res.sendStatus(200)

});
var subjectField
var imagePath

app.post('/upload', upload.single('image'), function (req, res, next) {
  // req.file will hold files like images
  // req.body will hold the text fields, if there were any

  console.log("uncoming post request from Skadepot")
  console.log("title: "+req.body.title)
  console.log("image file name: "+req.file.filename)
  console.log("image path: "+req.file.path)
  console.log("file encoding: "+req.file.encoding)
  console.log("file mimetype: "+req.file.encoding)
  imagePath = req.file.path
  subjectField = req.body.title
  sendEmailNow()
  
})

const blobToImage = (blob) => {
  return new Promise(resolve => {
    const url = URL.createObjectURL(blob)
    let img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.src = url
  })
}

// app.post('/upload', (req, res, next) => {
//   const form = formidable({ multiples: true });

//     let body = '';
//     req.on('data', chunk => {
//         body += chunk.toString(); // convert Buffer to string
//     });
//     req.on('end', () => {
//         console.log(body);
//         res.end('ok');
//     });


   
//   // form.parse(req, (err, fields, files) => {
//   //   if (err) {
//   //     next(err);
//   //     return;
//   //   }
//   //   // res.json({ fields, files });
    
//   //   console.log({ fields, files })
//   //   // console.log(req.title)
    
//   //   });
    
// });
 
// Nodemailer starts here
"use strict"


// async..await is not allowed in global scope, must use a wrapper
async function sendEmailNow() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
    //let testAccount = await nodemailer.createTestAccount();
const account = {
    user:"eula.kunze22@ethereal.email",
    pass: "75CZrPAFj5WpRb5cJ6"
}
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: account.user, // generated ethereal user
      pass: account.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "moenkira@yahoo.com, baz@example.com", // list of receivers
    subject: subjectField, // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
    attachments: [
         {   // data uri as an attachment

            path: imagePath
        }
     ]
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}







app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000 ...');
});



