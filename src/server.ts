import App from "./App";

/**
 * Error Handler. Provides full stack - remove for production
 */
let app = new App(process.env["PORT"]);

/**
 * Start Express server.
 */
const server = app.listen();

// console.log(app.app._router);
export default server;
