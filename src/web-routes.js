import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.showLogin },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/dashboard", config: dashboardController.index },

  { method: 'GET', path: '/bg.mp4', handler: { file: 'bg.mp4' }, options: { auth: false } }
];
