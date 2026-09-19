# MCP Server v2 (JavaScript / Express)

An experimental Model Context Protocol (MCP) server built with Node.js, Express 5, and the official `@modelcontextprotocol` v2 SDK.

> [!WARNING]
> **Experimental / Educational Project**  
> This repository is **not intended for production use**. It is an architectural experiment exploring cleaner syntax, modular tool design, and OAuth 2.0 protected resource patterns with the MCP v2 SDK in pure JavaScript (ESM).

---

##  Overview & Key Concepts Explored

This project demonstrates how to set up a remote, authenticated HTTP-based MCP server using modern patterns:

1. **MCP v2 HTTP Transport**: Gating `/mcp` behind an Express application using `createMcpExpressApp` and `@modelcontextprotocol/node`'s `toNodeHandler`.
2. **OAuth 2.0 Protected Resource Metadata (RFC 9728)**: 
   - Uses `mcpAuthMetadataRouter` to publish standard discovery metadata for authorization servers, token endpoints, and scopes.
   - Restricts `/mcp` using `requireBearerAuth` middleware with discovery fallback URLs.
3. **RS256 JWT Token Verification**: Implements a custom `tokenVerifier` that validates incoming bearer tokens against an RSA public key.
4. **Host & Origin Validation**: Built-in middleware (`hostHeaderValidation`, `originValidation`) to safeguard against DNS rebinding and cross-site attacks.
5. **Declarative & Modular Tool Architecture**:
   - Clean, isolated tool declarations using [Zod](https://zod.dev) v4 schemas.
   - Dynamic registration via a centralized `tools-manager`.
6. **Token Delegation to Downstream APIs**:
   - Captures `context.http.authInfo` passed by the transport layer.
   - Re-uses caller credentials to proxy authenticated calls to downstream backend services.

---

## 📁 Project Structure

```text
├── src/
│   ├── app.js               # Express application, OAuth metadata router & auth middleware
│   ├── config.js            # Environment configuration loader
│   ├── index.js             # HTTP server entry point
│   ├── mcp/
│   │   ├── handler.js       # McpServer instantiation & tool registration
│   │   ├── tools-manager.js # Central tool list / registry
│   │   └── tools/           # Modular tool definitions (e.g. addNote.js)
│   ├── services/
│   │   └── apiClient.js     # Downstream HTTP client with token delegation
│   └── utils/
│       ├── jwtHelper.js     # RS256 JWT verification helper
│       └── urlHelper.js     # URL & base path utilities
├── .env.sample              # Environment variables template
└── package.json
```

---

## 🛠️ Tool Definition Syntax

Tools are structured as self-contained modules with intuitive schemas and handler separation:

```javascript
import * as z from 'zod/v4';

export default {
    name: 'add-note',
    title: 'Append a note',
    description: 'Add a note - Simple testing tool',
    inputSchema: {
        note: z.string().describe("Note content to append")
    },
    execute: async ({ note }, context) => {
        return {
            content: [{ type: 'text', text: `You added a note: ${note}` }]
        };
    }
};
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v22.x or higher
- npm 10.x or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/developerdipeshk/mcp-v2-js.git
   cd mcp-v2-js
   ```

2. Install dependencies:
   ```bash
   npm ci
   ```

3. Configure environment variables:
   ```bash
   cp .env.sample .env
   ```
   Fill in your OAuth configuration, endpoints, host, and port in `.env`.

4. Start the server in watch mode:
   ```bash
   npm run dev
   ```

The server will spin up at `http://localhost:3000/mcp` (or your configured `PORT`).

---

## 🔒 Security Notice

- Never commit real private or public keys, credentials, or `.env` files.
- Ensure any production deployment adds proper rate limiting, audit logging, and resilient error masking.

---
