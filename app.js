const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { config } = require("./api/configs/config");

/*
 * setup API Router
 */
const ping = require("./api/routes/ping");
const user = require("./api/routes/user");
const district = require("./api/routes/district");

process.setMaxListeners(config.maxlistener);
console.log("Maximum Listener: " + process.getMaxListeners());

app.use(
  morgan(
    ":remote-addr :remote-user (:date[iso])|:method :url :status :res[content-length] :response-time ms"
  )
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* config CORS */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-API-Key"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

/* set Router Path method */
app.use("/api/ping", ping);
app.use("/api/user", user);
app.use("/api/kecamatan", district);

app.use((req, res, next) => {
  const error = new Error("Invalid URL or parameters");
  error.status = 400;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
