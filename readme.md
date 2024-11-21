# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

All right here's a tiny and brief writeup of what your favorites + user login journey could look like:

- Hardcode user id = 1 in your backend and add a 'favorite' feature

- Add users table (id, email, token)
INSERT two users with random tokens (use openssl rand -base64 48 to generate fresh tokens on your terminal)
Add favorites table: netflix*show_id and user_id

- add the rest of the feature
Add option to your frontend to 'be user 1' or 'be user 2'.
Depending on which the user chooses, either the token for user 1 or the token for user 2 will be sent along \_with every request* as an Authentication header, e.g. Authentication: Bearer 1IR3hFxs5VNx8W0Rnm8tEMzH666SwG7O2Xo6x0T8Jo2krkfm5C

Your backend then uses a _middleware_ to look up this token in the DB and sets the user id instead of having it hardcoded. If it cannot find a user with this token in the DB and the endpoint is supposed to be 'only for logged in users' then the middleware needs to respond with 401/403, whichever is appropriate.
Add option to your frontend to 'login':
Add a password column to the users table (ALTER TABLE users…)
Use hashing to populate it
Make an API endpoint that receives a email/hashed pw combo and returns a token if they match (SELECT token FROM users WHERE email = ... and password = ...)
Add option to your app to 'sign up':
Add an API endpoint that received an email/hashed pw combo and returns a token if a user could be created
