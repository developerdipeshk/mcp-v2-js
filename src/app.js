import {
  createMcpExpressApp,
  hostHeaderValidation,
  originValidation,
  mcpAuthMetadataRouter,
  getOAuthProtectedResourceMetadataUrl,
  requireBearerAuth } from '@modelcontextprotocol/express';
import config from './config.js';
import handler from './mcp/handler.js';
import { BASE_URL } from "./utils/urlHelper.js";
import { tokenVerifier } from "./utils/jwtHelper.js";

const app = createMcpExpressApp({ host: config.HOST });

const allowedHosts = [config.HOST, `${config.HOST}:${config.PORT}`];
app.use(hostHeaderValidation(allowedHosts));

app.use(originValidation([ config.HOST ]));

const resourceServerUrl = BASE_URL;

const oauthMetadata = {
  issuer: config.OAUTH_ISSUER,
  authorization_endpoint: config.OAUTH_AUTHORIZATION_ENDPOINT,
  token_endpoint: config.OAUTH_TOKEN_ENDPOINT,
  response_types_supported: ["code"],
  grant_types_supported: ['authorization_code', 'refresh_token'],
  code_challenge_methods_supported: ['S256'],
  token_endpoint_auth_methods_supported: ['none'],
  subject_types_supported: ['public'],
  scopes_supported: config.OAUTH_SCOPES.split(',')
};

// 1. Mount the discovery router at the app root
app.use(mcpAuthMetadataRouter({ oauthMetadata, resourceServerUrl }));

// 2. Gate /mcp with bearer auth, pointing failures at the discovery doc
const auth = requireBearerAuth({
  verifier: tokenVerifier,
  requiredScopes: config.OAUTH_SCOPES.split(','),
  resourceMetadataUrl: getOAuthProtectedResourceMetadataUrl(resourceServerUrl),
});

app.all('/mcp', auth, (req, res) => void handler(req, res, req.body));

export default app;