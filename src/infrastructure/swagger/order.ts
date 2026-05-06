export const orderPaths = {
  '/orders': {
    post: {
      tags: ['Order'],
      summary: 'Cria um novo pedido (ADMIN, CUSTOMER)',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateOrderRequest' },
          },
        },
      },
      responses: {
        '201': {
          description: 'Pedido criado com sucesso',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Order' },
            },
          },
        },
        '400': { description: 'Dados inválidos' },
        '401': { description: 'Não autenticado' },
        '403': { description: 'Sem permissão' },
      },
    },

    get: {
      tags: ['Order'],
      summary: 'Lista todos os pedidos',
      responses: {
        '200': {
          description: 'Lista de pedidos',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/Order' },
              },
            },
          },
        },
      },
    },
  },

  '/orders/{id}': {
    get: {
      tags: ['Order'],
      summary: 'Busca pedido por ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'ID do pedido',
          example: 'ord_123',
        },
      ],
      responses: {
        '200': {
          description: 'Pedido encontrado',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Order' },
            },
          },
        },
        '404': { description: 'Pedido não encontrado' },
      },
    },

    delete: {
      tags: ['Order'],
      summary: 'Inativa (soft delete) pedido por ID (ADMIN)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'ID do pedido',
          example: 'ord_123',
        },
      ],
      responses: {
        '200': { description: 'Pedido inativado com sucesso' },
        '401': { description: 'Não autenticado' },
        '403': { description: 'Sem permissão' },
        '404': { description: 'Pedido não encontrado' },
      },
    },
  },

  '/orders/{id}/restore': {
    patch: {
      tags: ['Order'],
      summary: 'Restaura pedido inativado por ID (ADMIN)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'ID do pedido',
          example: 'ord_123',
        },
      ],
      responses: {
        '200': { description: 'Pedido restaurado com sucesso' },
        '401': { description: 'Não autenticado' },
        '403': { description: 'Sem permissão' },
        '404': { description: 'Pedido não encontrado' },
      },
    },
  },

  '/orders/{id}/user': {
    get: {
      tags: ['Order'],
      summary: 'Lista pedidos de um usuário por ID (CUSTOMER)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'ID do usuário',
          example: 'usr_123',
        },
      ],
      responses: {
        '200': {
          description: 'Pedidos do usuário',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/Order' },
              },
            },
          },
        },
        '401': { description: 'Não autenticado' },
        '403': { description: 'Sem permissão' },
        '404': { description: 'Usuário não encontrado' },
      },
    },
  },
};

export const orderSchemas = {
  Order: {
    type: 'object',
    properties: {
      id: { type: 'string', example: 'ord_123' },
      userId: { type: 'string', example: 'usr_123' },
      status: { type: 'string', example: 'PENDING' },
      total: { type: 'number', format: 'float', example: 299.9 },
      items: {
        type: 'array',
        items: { $ref: '#/components/schemas/OrderItem' },
      },
      isActive: { type: 'boolean', example: true },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  },

  OrderItem: {
    type: 'object',
    properties: {
      productId: { type: 'string', example: 'prd_123' },
      quantity: { type: 'integer', example: 2 },
      unitPrice: { type: 'number', format: 'float', example: 149.95 },
    },
  },

  CreateOrderRequest: {
    type: 'object',
    required: ['userId', 'items'],
    properties: {
      userId: { type: 'string', example: 'usr_123' },
      items: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'object',
          required: ['productId', 'quantity'],
          properties: {
            productId: { type: 'string', example: 'prd_123' },
            quantity: { type: 'integer', example: 2, minimum: 1 },
          },
        },
      },
    },
  },
};

export const orderTags = [
  {
    name: 'Order',
    description: 'Gerenciamento de pedidos',
  },
];
