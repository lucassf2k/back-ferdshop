export const productPaths = {
  '/products': {
    get: {
      tags: ['Product'],
      summary: 'Lista todos os produtos',
      responses: {
        '200': {
          description: 'Lista de produtos',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/Product' },
              },
            },
          },
        },
      },
    },

    post: {
      tags: ['Product'],
      summary: 'Cria um novo produto (ADMIN)',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateProductRequest' },
          },
        },
      },
      responses: {
        '201': {
          description: 'Produto criado com sucesso',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Product' },
            },
          },
        },
        '400': { description: 'Dados inválidos' },
        '401': { description: 'Não autenticado' },
        '403': { description: 'Sem permissão' },
      },
    },
  },

  '/products/search': {
    get: {
      tags: ['Product'],
      summary: 'Busca produtos',
      parameters: [
        {
          name: 'page',
          in: 'query',
          required: true,
          schema: { type: 'number' },
          description: 'Página da listagem',
          example: 1,
        },
        {
          name: 'pageSize',
          in: 'query',
          required: true,
          schema: { type: 'number' },
          description: 'Quantidade de itens por página',
          example: 10,
        },
        {
          name: 'name',
          in: 'query',
          required: false,
          schema: { type: 'string' },
          description: 'Nome do produto para filtrar',
          example: 'notebook',
        },
        {
          name: 'categoryId',
          in: 'query',
          required: false,
          schema: { type: 'string', format: 'uuid' },
          description: 'ID da categoria para filtrar',
        },
        {
          name: 'stock',
          in: 'query',
          required: false,
          schema: { type: 'number' },
          description: 'Quantidade em estoque para filtrar',
        },
      ],
      responses: {
        '200': {
          description: 'Resultados da busca',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/Product' },
              },
            },
          },
        },
      },
    },
  },

  '/products/{id}': {
    get: {
      tags: ['Product'],
      summary: 'Busca produto por ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'ID do produto',
          example: 'prd_123',
        },
      ],
      responses: {
        '200': {
          description: 'Produto encontrado',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Product' },
            },
          },
        },
        '404': { description: 'Produto não encontrado' },
      },
    },

    delete: {
      tags: ['Product'],
      summary: 'Inativa (soft delete) produto por ID (ADMIN)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'ID do produto',
          example: 'prd_123',
        },
      ],
      responses: {
        '200': { description: 'Produto inativado com sucesso' },
        '401': { description: 'Não autenticado' },
        '403': { description: 'Sem permissão' },
        '404': { description: 'Produto não encontrado' },
      },
    },
  },

  '/products/{id}/restore': {
    patch: {
      tags: ['Product'],
      summary: 'Restaura produto inativado por ID (ADMIN)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'ID do produto',
          example: 'prd_123',
        },
      ],
      responses: {
        '200': { description: 'Produto restaurado com sucesso' },
        '401': { description: 'Não autenticado' },
        '403': { description: 'Sem permissão' },
        '404': { description: 'Produto não encontrado' },
      },
    },
  },
};

export const productSchemas = {
  Product: {
    type: 'object',
    properties: {
      id: { type: 'string', example: 'prd_123' },
      name: { type: 'string', example: 'Notebook Dell' },
      description: { type: 'string', example: 'Notebook i7 16GB RAM' },
      price: { type: 'number', format: 'float', example: 4599.9 },
      stock: { type: 'integer', example: 20 },
      categoryId: { type: 'string', example: 'cat_123' },
      isActive: { type: 'boolean', example: true },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  },

  CreateProductRequest: {
    type: 'object',
    required: ['name', 'price', 'stock', 'categoryId'],
    properties: {
      name: { type: 'string', example: 'Notebook Dell' },
      description: { type: 'string', example: 'Notebook i7 16GB RAM' },
      price: { type: 'number', format: 'float', example: 4599.9 },
      stock: { type: 'integer', example: 20 },
      categoryId: { type: 'string', example: 'cat_123' },
    },
  },
};

export const productTags = [
  {
    name: 'Product',
    description: 'Gerenciamento de produtos',
  },
];
