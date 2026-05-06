export const userPaths = {
  '/users': {
    get: {
      tags: ['User'],
      summary: 'Lista todos os usuários (ADMIN)',
      security: [{ bearerAuth: [] }],
      responses: {
        '200': {
          description: 'Lista de usuários',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/User' },
              },
            },
          },
        },
        '401': { description: 'Não autenticado' },
        '403': { description: 'Sem permissão' },
      },
    },

    post: {
      tags: ['User'],
      summary: 'Cria um novo usuário',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateUserRequest' },
          },
        },
      },
      responses: {
        '201': {
          description: 'Usuário criado com sucesso',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/User' },
            },
          },
        },
        '400': { description: 'Dados inválidos' },
      },
    },
  },

  '/users/{id}': {
    get: {
      tags: ['User'],
      summary: 'Busca usuário por ID',
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
          description: 'Usuário encontrado',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/User' },
            },
          },
        },
        '404': { description: 'Usuário não encontrado' },
      },
    },

    delete: {
      tags: ['User'],
      summary: 'Inativa (soft delete) usuário por ID (CUSTOMER)',
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
        '200': { description: 'Usuário inativado com sucesso' },
        '401': { description: 'Não autenticado' },
        '403': { description: 'Sem permissão' },
        '404': { description: 'Usuário não encontrado' },
      },
    },
  },

  '/users/{id}/restore': {
    patch: {
      tags: ['User'],
      summary: 'Restaura usuário inativado por ID',
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
        '200': { description: 'Usuário restaurado com sucesso' },
        '404': { description: 'Usuário não encontrado' },
      },
    },
  },
};

export const userSchemas = {
  User: {
    type: 'object',
    properties: {
      id: { type: 'string', example: 'usr_123' },
      name: { type: 'string', example: 'Lucas Silva' },
      email: { type: 'string', format: 'email', example: 'lucas@email.com' },
      role: { type: 'string', example: 'CUSTOMER' },
      isActive: { type: 'boolean', example: true },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  },

  CreateUserRequest: {
    type: 'object',
    required: ['name', 'email', 'password'],
    properties: {
      name: { type: 'string', example: 'Lucas Silva' },
      email: { type: 'string', format: 'email', example: 'lucas@email.com' },
      password: { type: 'string', example: '12345678' },
      role: {
        type: 'string',
        enum: ['ADMIN', 'CUSTOMER'],
        example: 'CUSTOMER',
      },
    },
  },
};

export const userTags = [
  {
    name: 'User',
    description: 'Gerenciamento de usuários',
  },
];
