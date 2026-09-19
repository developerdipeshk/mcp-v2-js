import config from "../config.js";

export const BASE_URL = new URL(
    `${config.IS_SECURE ? 'https' : 'http'}://${config.HOST}:${config.PORT}/mcp`
);