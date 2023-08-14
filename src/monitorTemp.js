import { readTemp } from './services/sensorService';
import { updateReadingsFile } from './services/dataService';
import { sendNotifications } from './services/notificationService';

export function monitorTemperature() {
  setInterval(() => {
    const temperatureValue = readTemp();
    updateReadingsFile(temperatureValue);
    sendNotifications(temperatureValue);
  }, 5 * 60 * 1000); // 5 min interval
}
