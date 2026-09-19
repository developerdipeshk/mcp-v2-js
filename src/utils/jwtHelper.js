import jwt from "jsonwebtoken";
import fs from "fs";
import { OAuthError, OAuthErrorCode } from "@modelcontextprotocol/server";
import config from "../config.js";

const PASSPORT_PUBLIC_KEY = fs.readFileSync(config.OAUTH_PUBLIC_KEY_PATH, "utf8");

export const tokenVerifier = {
  async verifyAccessToken(token) {

    try {
      const payload = jwt.verify(token, PASSPORT_PUBLIC_KEY, {
        algorithms: ["RS256"],
      });

      return {
        token,
        clientId: payload.aud,
        scopes: Array.isArray(payload.scopes) ? payload.scopes : [],
        expiresAt: payload.exp,
        extra: { userId: payload.sub },
      };
    } catch (err) {
      throw new OAuthError(OAuthErrorCode.InvalidToken, "Invalid or expired token");
    }
  },
};