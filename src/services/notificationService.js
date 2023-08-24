import axios from "axios";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

export function sendEmail(temperatureData) {
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
    text: `${process.env.EMAIL_MESSAGE} Sensor 1 temperature: ${temperatureData.sensor1_temperature}°C, Sensor 2 temperature: ${temperatureData.sensor2_temperature}°C`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

export function sendSlackMessage(temperatureData) {
  axios
    .post(process.env.SLACK_WEB_HOOK, {
      text: `${process.env.SLACK_MESSAGE} Sensor 1 temperature: ${temperatureData.sensor1_temperature}°C, Sensor 2 temperature: ${temperatureData.sensor2_temperature}°C`,
    })
    .then((response) => {
      console.log("Message sent to Slack");
    })
    .catch((error) => {
      console.error("Error sending message to Slack: ", error);
    });
}

export function sendSlackDirectMessage(temperatureData) {
  axios
    .post('https://slack.com/api/chat.postMessage',
      {
        channel: process.env.USER_ID,
        text: `${process.env.SLACK_MESSAGE} Sensor 1 temperature: ${temperatureData.sensor1_temperature}°C, Sensor 2 temperature: ${temperatureData.sensor2_temperature}°C`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.BOT_TOKEN}`,
          "Content-Type": "application/json",
        },
      })
    .then((response) => {
      console.log("Message sent to user");
    })
    .catch((error) => {
      console.error("Error sending message to Slack: ", error);
    });
}

export function sendNotifications(temperatureData) {
  const threshold = 25; // set the value in C

  if (
    temperatureData.sensor1_temperature > threshold ||
    temperatureData.sensor2_temperature > threshold
  ) {
    sendEmail(temperatureData);
    sendSlackMessage(temperatureData);
    sendSlackDirectMessage(temperatureData);
  }
}
