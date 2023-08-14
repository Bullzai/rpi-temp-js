import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import Cookie from 'hapi-auth-cookie';
import fs from 'fs';
// import { hashSync, verifySync } = require('sodium').crypto.pwhash;
import Handlebars from "handlebars";
import { fileURLToPath } from "url";
import path from "path";
import { webRoutes } from "./web-routes.js"
import { accountsController } from "./controllers/accounts-controller.js";
import 'dotenv/config'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  await server.register(Inert);
  await server.register(Vision);
  await server.register(Cookie);

  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });

  const cache = server.cache({ segment: 'sessions', expiresIn: 60 * 60 * 1000 }); // should be 1hr
  server.app.cache = cache;

  server.auth.strategy('session', 'cookie', {
    cookie: {
      name: "rpi-temp",
      password: process.env.SESSION_SECRET,
      isSecure: false,
    },
    redirectTo: "/",
    validateFunc: async (request, session) => {
      const account = await accountsController.validate(request, session);
      const out = {
        valid: account.isValid
      };

      if (out.valid) {
        return { valid: true, credentials: account.credentials };
      }
      return { valid: false };
    }
    // validate: accountsController.validate,
  });

  server.auth.default('session');

  server.route(webRoutes);
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
