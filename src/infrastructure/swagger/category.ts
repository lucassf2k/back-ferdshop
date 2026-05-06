export const categoryPaths = {
  '/categories': {
    get: {
      tags: ['Category'],
      summary: 'Lista todas as categorias',
      responses: {
        '200': {
          description: 'Lista de categorias',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/Category' },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ['Category'],
      summary: 'Cria uma nova categoria (ADMIN)',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateCategoryRequest' },
          },
        },
      },
      responses: {
        '201': {
          description: 'Categoria criada com sucesso',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Category' },
            },
          },
        },
        '401': { description: 'Não autenticado' },
        '403': { description: 'Sem permissão' },
      },
    },
  },

  '/categories/search': {
    get: {
      tags: ['Category'],
      summary: 'Busca categoria por nome',
      parameters: [
        {
          name: 'name',
          in: 'query',
          required: true,
          schema: { type: 'string' },
          description: 'Nome da categoria',
          example: 'Eletrônicos',
        },
      ],
      responses: {
        '200': {
          description: 'Categoria encontrada',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Category' },
            },
          },
        },
        '404': { description: 'Categoria não encontrada' },
      },
    },
  },

  '/categories/{id}': {
    get: {
      tags: ['Category'],
      summary: 'Busca categoria por ID',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'ID da categoria',
          example: 'cat_123',
        },
      ],
      responses: {
        '200': {
          description: 'Categoria encontrada',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Category' },
            },
          },
        },
        '404': { description: 'Categoria não encontrada' },
      },
    },

    delete: {
      tags: ['Category'],
      summary: 'Inativa (soft delete) categoria por ID (ADMIN)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'ID da categoria',
          example: 'cat_123',
        },
      ],
      responses: {
        '200': { description: 'Categoria inativada com sucesso' },
        '401': { description: 'Não autenticado' },
        '403': { description: 'Sem permissão' },
        '404': { description: 'Categoria não encontrada' },
      },
    },
  },

  '/categories/{id}/restore': {
    patch: {
      tags: ['Category'],
      summary: 'Restaura categoria inativada por ID (ADMIN)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'ID da categoria',
          example: 'cat_123',
        },
      ],
      responses: {
        '200': { description: 'Categoria restaurada com sucesso' },
        '401': { description: 'Não autenticado' },
        '403': { description: 'Sem permissão' },
        '404': { description: 'Categoria não encontrada' },
      },
    },
  },
};

export const categorySchemas = {
  Category: {
    type: 'object',
    properties: {
      id: { type: 'string', example: 'cat_123' },
      name: { type: 'string', example: 'Eletrônicos' },
      isActive: { type: 'boolean', example: true },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  },

  CreateCategoryRequest: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string', example: 'Eletrônicos' },
    },
  },
};

export const categoryTags = [
  {
    name: 'Category',
    description: 'Gerenciamento de categorias',
  },
];
