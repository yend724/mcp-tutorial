import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

// Create server instance
const server = new McpServer({
  name: 'uuid-generator',
  version: '1.0.0',
});

// Register tools
server.tool('generate_uuid', 'UUIDを生成する。', {}, async () => {
  const uuid = crypto.randomUUID();

  return {
    content: [
      {
        type: 'text',
        text: `生成されたUUID: ${uuid}`,
      },
    ],
  };
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log('UUID Generator MCP Server running on stdio');
}

main().catch(error => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
