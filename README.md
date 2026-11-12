# Login page with Node and MongoDB

An Express app that serves a login form and checks the username and password against a local MongoDB collection.

## What it does

`public/index.html` posts `username` and `password` to `POST /login`. The server looks that username up in the `login` collection of the `login_page` database.

- A matching password redirects to `public/login.html`.
- An unknown username gets a message to create an account first.
- A known username with the wrong password gets an invalid-password message.

## Run it

MongoDB needs to be listening on port 27017.

```bash
npm install
node index.js
```

Open [http://localhost:3000](http://localhost:3000).

There is no signup route. Insert a document in the `login` collection with `username` and `password` fields before trying the form. Passwords are stored and compared as plain strings.

## Files

| File | Role |
| --- | --- |
| `index.js` | Express app, Mongoose connection, `POST /login` |
| `public/index.html` | Login form |
| `public/login.html` | Welcome page after a match |
| `public/style.css` | Form layout |
| `Requirements` | Package notes |

## Notes

The lookup is written with a callback. The MongoDB driver that ships with Mongoose 6 does not run that callback, so the route has to be changed to `async/await` before a login can finish. There is no session, and `login.html` is a static file anyone can open. The process listens on port 3000.

The project page is on the portfolio: [maadhiniportfolio.vercel.app/projects/login-page](https://maadhiniportfolio.vercel.app/projects/login-page).
