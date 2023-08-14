import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const usersPath = path.join(currentDir, '../..', 'users.json');
const usersData = fs.readFileSync(usersPath, 'utf-8');
const users = JSON.parse(usersData);

export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome - I've been expecting you" });
    },
  },

  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to see readings" });
    },
  },

  login: {
    auth: false,
    handler: async function (request, h) {
      try {
        const { username, password } = request.payload;

        // Finding user by username
        const user = users.find(u => u.username === username);

        // Check if the user exists
        if (!user) {
          return h.redirect("/");
        }

        // Check if the provided password matches the stored hash
        if (!bcrypt.compareSync(password, user.hash)) {
          return h.redirect("/");
        }

        request.cookieAuth.set({ id: user._id });
        return h.redirect("/dashboard");
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
  },


  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  async validate(request, session) {
    // Find user by session id
    const user = users.find(u => u._id === session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  }
};
