const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./.env" });

const sender_email ='silvashe99@gmail.com';

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: sender_email,
    pass: 'ygvxdtbodtydudzt'

  }
});

exports.adminPasswordSender = async function (admin,randomPassword) {
  transport
    .sendMail({
      from: sender_email,
      to: admin.email,
      subject: "Welcome to Apartment service solution app!",
      html: `<h1><b>Hello ${admin.name} !</b></h1>

                <h4>Let's update your Admin Account</h4><br>
                <p><b>Email : </b>${admin.email}</p>
                <p><b>Password : </b>${randomPassword}</p><br>`,
    })
    .then(() => {
      console.log("Email Sent to " + admin.email + " for admin account creation.");
    })
    .catch(() => {
      console.log(
        "Email Not Sent to " + admin.email + " for admin account creation."
      );
    });
};

exports.residentPasswordSender = async function (resident,randomPassword) {
  transport
    .sendMail({
      from: sender_email,
      to: resident.email,
      subject: "Welcome to Apartment service solution app!",
      html: `<h1><b>Hello ${resident.name} !</b></h1>

                <h4>Let's update your Resident Account</h4><br>
                <p><b>Email : </b>${resident.email}</p>
                <p><b>Password : </b>${randomPassword}</p><br>`,
    })
    .then(() => {
      console.log("Email Sent to " + resident.email + " for resident account creation.");
    })
    .catch(() => {
      console.log(
        "Email Not Sent to " + resident.email + " for resident account creation."
      );
    });
};

exports.securityPasswordSender = async function (security,randomPassword) {
  transport
    .sendMail({
      from: sender_email,
      to: security.email,
      subject: "Welcome to Apartment service solution app!",
      html: `<h1><b>Hello ${security.name} !</b></h1>

                <h4>Let's update your Security Account</h4><br>
                <p><b>Email : </b>${security.email}</p>
                <p><b>Password : </b>${randomPassword}</p><br>`,
    })
    .then(() => {
      console.log("Email Sent to " + security.email + " for security account creation.");
    })
    .catch(() => {
      console.log(
        "Email Not Sent to " + security.email + " for security account creation."
      );
    });
};




exports.adminForgotPasswordSender = async function (user,randomPassword) {
  transport
    .sendMail({
      from: "vehicleservicecenterfct@gmail.com",
      to: user.email,
      subject: "Please  log in and update your account",
      html: `<h1><b>Hello ${user.first_name} !</b></h1>

                <h4><i>Forgot password resetting</i></h4>
                <h5>Let's log in and update your admin account by using below recovery password</h5><br>
                <p><b>Email : </b>${user.email}</p>
                <p><b>Password : </b>${randomPassword}</p><br>`,
    })
    .then(() => {
      console.log("Email Sent to " + user.email + " to reset admin password.");
    })
    .catch(() => {
      console.log(
        "Email Not Sent to " + user.email + " to reset admin password."
      );
    });
};



exports.employeeForgotPasswordSender = async function (user,randomPassword) {
  transport
    .sendMail({
      from: "vehicleservicecenterfct@gmail.com",
      to: user.email,
      subject: "Please  log in and update your account",
      html: `<h1><b>Hello ${user.first_name} !</b></h1>

                <h4><i>Forgot password resetting</i></h4>
                <h5>Let's log in and update your employee account by using below recovery password</h5><br>
                <p><b>Email : </b>${user.email}</p>
                <p><b>Password : </b>${randomPassword}</p><br>`,
    })
    .then(() => {
      console.log("Email Sent to " + user.email + " to reset employee password.");
    })
    .catch(() => {
      console.log(
        "Email Not Sent to " + user.email + " to reset employee password."
      );
    });
};


exports.customerForgotPasswordSender = async function (user,randomPassword) {
  transport
    .sendMail({
      from: "vehicleservicecenterfct@gmail.com",
      to: user.email,
      subject: "Please  log in and update your account",
      html: `<h1><b>Hello ${user.first_name} !</b></h1>

                <h4><i>Forgot password resetting</i></h4>
                <h5>Let's log in and update your customer account by using below recovery password</h5><br>
                <p><b>Email : </b>${user.email}</p>
                <p><b>Password : </b>${randomPassword}</p><br>`,
    })
    .then(() => {
      console.log("Email Sent to " + user.email + " to reset customer password.");
    })
    .catch(() => {
      console.log(
        "Email Not Sent to " + user.email + " to reset customer password."
      );
    });
};



