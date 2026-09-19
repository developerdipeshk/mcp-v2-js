import 'dotenv/config';

export default {
    APP_NAME: process.env.APP_NAME,
    HOST: process.env.HOST || 'localhost',
    IS_SECURE: process.env.IS_SECURE?.toLowerCase() === 'true',
    PORT: process.env.PORT || 3000,
    NODE_SERVER_NAME: process.env.NODE_SERVER_NAME ?? 'default',
    OAUTH_ISSUER: process.env.OAUTH_ISSUER,
    OAUTH_AUTHORIZATION_ENDPOINT: process.env.OAUTH_AUTHORIZATION_ENDPOINT,
    OAUTH_TOKEN_ENDPOINT: process.env.OAUTH_TOKEN_ENDPOINT,
    OAUTH_PUBLIC_KEY_PATH: process.env.OAUTH_PUBLIC_KEY_PATH,
    OAUTH_SCOPES: process.env.OAUTH_SCOPES,
    API_URL: process.env.API_URL
}