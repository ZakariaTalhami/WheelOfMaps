import express from "express";
import http from "http";
import debugLib from "debug";
import loaders from "./loaders";
import dotenv from "dotenv";
import path from "path";

// Setup the enviroment varibles from ../.env
dotenv.config({ path: path.join(__dirname, "../.env") });

const debug = debugLib("backend:server");
const PORT = normalizePort(process.env.PORT || "8000");

async function startserver() {
  const app = express();
  app.set("port", PORT);

  await loaders({ expressApp: app });
  // console.log(app._router.stack);
  const server = http.createServer(app);

  server.listen(PORT);
  server.on("error", onError);
  server.on("listening", () => {
    const addr = server.address();
    const bind =
      typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
  });
}

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof PORT === "string" ? `Pipe ${PORT}` : `Port ${PORT}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind}  is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Start the server.
 */
startserver();
