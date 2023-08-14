// change details accordingly - npm i nodemailer axios 
export function sendEmail(temperature) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'YOUR_EMAIL@gmail.com',
      pass: 'YOUR_PASSWORD'
    }
  });

  let mailOptions = {
    from: 'YOUR_EMAIL@gmail.com',
    to: 'RECIPIENT_EMAIL@gmail.com',
    subject: 'Temperature Alert!',
    text: `The temperature has reached ${temperature}°C`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

export function sendSlackMessage(temperature) {
  axios.post(SLACK_WEBHOOK_URL, {
    text: `<!here> The temperature has reached ${temperature}°C`
  }).then(response => {
    console.log("Message sent to Slack");
  }).catch(error => {
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