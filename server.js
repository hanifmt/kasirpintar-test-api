const http = require("http");
const app = require("./app");
const { config } = require("./api/configs/config");

const server = http.createServer(app);

server.listen(config.port);
console.log("Environment: " + config.env);
console.log(" Server listening on port: " + config.port);

