# Raspberry Pi temperature notifier - NodeJS

**Name:** Vidmantas Valskis

## Features.

+ Read temparutres using 1 or 2 DS18B20 temperature sensors.
+ Send emails upon reaching the threshold.
+ Send slack messages to a channel upon reaching the threshold.
+ View temperature LIVE readings via browser.
+ Authentication using hash & salt.
+ Sessions

#### Persistence

Readings are saved in readings.json
Users are saved in users.json

## Deployment.

```
npm install
npm run start
```

## Additional Information.

- edit .env to add sensitive data
```
SESSION_SECRET="32-char-length-pass"
EMAIL_PORT=25
EMAIL_IP="SMTP-server-ip-address"
EMAIL_USER="username"
EMAIL_PASS="pass"
EMAIL_FROM="username@domain.com"
EMAIL_TO="my@email.com"
EMAIL_SUBJECT="The room is on fire! - Temperature Alert!"
EMAIL_MESSAGE="Bring the extinguisher"
SLACK_WEB_HOOK="slack-channel-webhook"
SLACK_MESSAGE="<!here> The temperature threshold has been reached :"
SENSOR_PATH1="/sys/bus/w1/devices/w1_bus_master1/28-xxxxxxxxxxxx/w1_slave"
SENSOR_PATH2="/sys/bus/w1/devices/w1_bus_master1/28-xxxxxxxxxxxx/w1_slave"
```
