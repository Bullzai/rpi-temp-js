import fs from 'fs';

export function readTemp() {
  // const SENSOR_PATH = "/sys/bus/w1/devices/w1_bus_master1/28-xxxxxx/w1_slave"; // replace "28-xxxxxx"
  const SENSOR_PATH = "/home/vidma/DATA"; // replace "28-xxxxxx"
  const data = fs.readFileSync(SENSOR_PATH, 'utf8');
  console.log(data);
  const match = data.match(/t=(\d+)/);
  if (match) {
    return parseFloat(match[1]) / 1000.0;
  }
  return null;
}
