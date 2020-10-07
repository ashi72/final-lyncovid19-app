const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const { resolve } = require("path");
const mongoose = require('mongoose');
const connectDB = require('./db');
const users = require('./routes/api/users');
const bodyParser = require('body-parser');

// require("dotenv").config({
//   path: resolve(process.cwd(), "src", "server", ".env"),
// });
const port = process.env.PORT || 5000;
// const appOrigin = 'http://localhost:3000';
// const audience = process.env.REACT_APP_AUDIENCE;
// const issuer = process.env.REACT_APP_AUTH0_DOMAIN;

const appOrigin = 'http://localhost:3000'

const audience = 'https://covid19-lynbrook/'
const issuer = 'https://dev-kzr1audd.us.auth0.com/'
//

const app = express();


if (!issuer || !audience) {
  throw new Error("Please make sure that .env is in place and populated");
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS, DELETE');
  next();
});

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: appOrigin }));
connectDB();
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${issuer}.well-known/jwks.json`,
  }),

  audience: audience,
  issuer: issuer,
  algorithms: ["RS256"],
});

app.use('/api/users', users);
app.get("/api/public-message", (req, res) => {
  res.send({
    msg: "The API doesn't require an access token to share this message.",
  });
});

app.get("/api/private-message", checkJwt, (req, res) => {
  res.send({
    msg: "The API successfully validated your access token.",
  });
});

app.listen(port, () => console.log(`API Server listening on port ${port}`));
