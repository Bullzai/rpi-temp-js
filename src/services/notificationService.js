import axios from "axios";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

export function sendEmail(temperature) {
  let transporter = nodemailer.createTransport({
    port: process.env.EMAIL_PORT,
    host: process.env.EMAIL_IP,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: process.env.EMAIL_SUBJECT,
    text: `The temperature has reached ${temperature}°C`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

export function sendSlackMessage(temperature) {
  axios
    .post(process.env.SLACK_WEB_HOOK, {
      text: `${process.env.SLACK_MESSAGE} ${temperature}°C`,
    })
    .then((response) => {
      console.log("Message sent to Slack");
    })
    .catch((error) => {
      console.error("Error sending message to Slack: ", error);
    });
}

export function sendNotifications(temperatureValue) {
  const threshold = 25; // set the value in C

  if (temperatureValue > threshold) {
    sendEmail(temperatureValue);
    sendSlackMessage(temperatureValue);
  }
}
