import fs from "fs";
import dotenv from "dotenv";

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

export function readTemp() {
  const SENSOR_PATH = process.env.SENSOR_PATH;
  const data = fs.readFileSync(SENSOR_PATH, "utf8");
  console.log(data);
  const match = data.match(/t=(\d+)/);
  if (match) {
    return parseFloat(match[1]) / 1000.0;
  }
  return null;
}
