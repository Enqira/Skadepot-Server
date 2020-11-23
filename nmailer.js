const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

("use strict");

module.exports.mailNow = function sendEmailNow(subjectField, objectsToSend) {
  const account = {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  };
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: account.user,
      pass: account.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  let info = transporter.sendMail({
    from: '"Skadepot" <moenqira@gmail.com>', // sender address
    to: "caled17715@tjuln.com", // list of receivers
    subject: subjectField, // Subject line
    text: "Hello world?", // plain text body
    html: subjectField, // html body
    attachments: objectsToSend,
    // attachments: [
    //     {   // data uri as an attachment
    //       filename: imageName,
    //       path: imagePath,
    //       cid: 'cid:unique@kreata.ee' //same cid value as in the html img src
    //     }
    //  ]
  });

  console.log("Email sent succesfully");
};
