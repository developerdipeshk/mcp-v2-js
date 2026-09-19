import config from "./config.js";
import app from "./app.js";
import { BASE_URL } from "./utils/urlHelper.js";

/** Listed to the app */
try {
  app.listen(
    config.PORT,
    () => console.log(`
      ${config.APP_NAME} started at ${BASE_URL}
      Current node is ${config.NODE_SERVER_NAME}
    `)
  );
} catch (err) {
  console.error("Failed to start server:", err);
}
