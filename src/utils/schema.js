// helpful validator or schema hints for the metadata structure
export const diagramJsonSchemaHint = {
  type: 'object',
  properties: {
    nodes: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'position', 'data'],
        properties: {
          id: { type: 'string' },
          type: { type: 'string' },
          position: {
            type: 'object',
            properties: {
              x: { type: 'number' },
              y: { type: 'number' },
            },
          },
          data: {
            type: 'object',
            properties: {
              label: { type: 'string' },
              meta: { type: 'object' },
            },
          },
        },
      },
    },
    edges: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'source', 'target'],
        properties: {
          id: { type: 'string' },
          source: { type: 'string' },
          target: { type: 'string' },
          label: { type: 'string' },
        },
      },
    },
  },
};
