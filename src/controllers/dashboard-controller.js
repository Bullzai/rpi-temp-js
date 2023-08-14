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

      const viewData = {
        title: "Temperature Readings Dashboard",
        user: loggedInUser,
        readings: readings
      };

      return h.view("dashboard-view", viewData);
    },
  },

};
