import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export function updateReadingsFile(temperatureValue) {
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const readingsPath = path.join(currentDir, '../..', 'readings.json');
  const data = fs.readFileSync(readingsPath, 'utf-8');
  const readings = JSON.parse(data);

  // add a timestamp with each reading
  const newReading = {
    timestamp: new Date().toISOString(),
    temperature: temperatureValue
  };

  readings.push(newReading);

  fs.writeFileSync(readingsPath, JSON.stringify(readings, null, 2));
}