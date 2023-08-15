import fs from "fs";
import dotenv from "dotenv";

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

export function readTemp() {
  const SENSOR_PATH1 = process.env.SENSOR_PATH1;
  const SENSOR_PATH2 = process.env.SENSOR_PATH2;

  // read temp from Sensor-1
  const data1 = fs.readFileSync(SENSOR_PATH1, "utf8");
  console.log(`Sensor 1 Data: ${data1}`);
  const match1 = data1.match(/t=(\d+)/);
  const temp1 = match1 ? parseFloat(match1[1]) / 1000.0 : null;

  // read temp from Sensor-2
  const data2 = fs.readFileSync(SENSOR_PATH2, "utf8");
  console.log(`Sensor 2 Data: ${data2}`);
  const match2 = data2.match(/t=(\d+)/);
  const temp2 = match2 ? parseFloat(match2[1]) / 1000.0 : null;

  return {
    sensor1_temperature: temp1,
    sensor2_temperature: temp2,
  };
}
