import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

function formatDate(isoString) {
  const date = new Date(isoString);

  // Convert to Dublin time
  const options = { timeZone: 'Europe/Dublin', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
  const formatted = new Intl.DateTimeFormat('en-US', options).format(date);

  const [_, month, day, year, hour, minute] = formatted.match(/(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2})/);

  return `${month}/${day}/${year} - ${hour}:${minute}`;
}

export function updateReadingsFile(temperatureValue) {
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const readingsPath = path.join(currentDir, '../..', 'readings.json');
  const data = fs.readFileSync(readingsPath, 'utf-8');
  const readings = JSON.parse(data);
  const timestamp = new Date().toISOString();

  const newReading = {
    timestamp: formatDate(timestamp),
    temperature: temperatureValue
  };

  readings.push(newReading);

  fs.writeFileSync(readingsPath, JSON.stringify(readings, null, 2));
}