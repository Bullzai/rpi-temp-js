import { readTemp } from './services/sensorService.js';
import { updateReadingsFile } from './services/dataService.js';
import { sendNotifications } from './services/notificationService.js';

export function monitorTemp() {
  setInterval(() => {
    const temperatureValue = readTemp();
    console.log(temperatureValue);
    updateReadingsFile(temperatureValue);
    sendNotifications(temperatureValue);
  }, 5 * 60 * 1000); // 5 min interval
}
