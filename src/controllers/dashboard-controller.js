import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;

      // Read temperature readings from the JSON file
      const currentDir = path.dirname(fileURLToPath(import.meta.url));
      const readingsPath = path.join(currentDir, '../..', 'readings.json');
      const readingsData = fs.readFileSync(readingsPath, 'utf-8');
      const readings = JSON.parse(readingsData);
      const latestReadings = readings.slice(-20).reverse();

      const viewData = {
        title: "Temperature Readings Dashboard",
        user: loggedInUser,
        readings: latestReadings
      };

      return h.view("dashboard-view", viewData);
    },
  },

};
