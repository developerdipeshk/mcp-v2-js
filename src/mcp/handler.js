import { toNodeHandler } from '@modelcontextprotocol/node';
import { createMcpHandler, McpServer } from '@modelcontextprotocol/server';
import config from '../config.js';
import tools from './tools-manager.js';

/** Create MCP server handler */
const handler = createMcpHandler(() => {
    const server = new McpServer({
        name: config.APP_NAME,
        version: '1.0.0'
    }, { capabilities: {} });
    
    tools.forEach(tool => {
        /** Add custom tools to MCP server */
        server.registerTool(
            tool.name,
            {
                title: tool.title,
                description: tool.description,
                inputSchema: tool.inputSchema,
            },
            tool.execute
        );
    });

    return server;
});

export default toNodeHandler(handler);