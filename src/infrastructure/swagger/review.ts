export const reviewPaths = {
  '/reviews': {
    post: {
      tags: ['Review'],
      summary: 'Cria uma nova avaliação (ADMIN, CUSTOMER)',
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateReviewRequest' },
          },
        },
      },
      responses: {
        '201': {
          description: 'Avaliação criada com sucesso',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Review' },
            },
          },
        },
        '400': { description: 'Dados inválidos' },
        '401': { description: 'Não autenticado' },
        '403': { description: 'Sem permissão' },
      },
    },
  },

  '/reviews/{id}': {
    delete: {
      tags: ['Review'],
      summary: 'Inativa (soft delete) avaliação por ID (ADMIN, CUSTOMER)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'ID da avaliação',
          example: 'rev_123',
        },
      ],
      responses: {
        '200': { description: 'Avaliação inativada com sucesso' },
        '401': { description: 'Não autenticado' },
        '403': { description: 'Sem permissão' },
        '404': { description: 'Avaliação não encontrada' },
      },
    },
  },

  '/reviews/{id}/restore': {
    patch: {
      tags: ['Review'],
      summary: 'Restaura avaliação inativada por ID (ADMIN, CUSTOMER)',
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' },
          description: 'ID da avaliação',
          example: 'rev_123',
        },
      ],
      responses: {
        '200': { description: 'Avaliação restaurada com sucesso' },
        '401': { description: 'Não autenticado' },
        '403': { description: 'Sem permissão' },
        '404': { description: 'Avaliação não encontrada' },
      },
    },
  },
};

export const reviewSchemas = {
  Review: {
    type: 'object',
    properties: {
      id: { type: 'string', example: 'rev_123' },
      rating: { type: 'number', format: 'float', example: 4.5 },
      comment: { type: 'string', example: 'Produto muito bom!' },
      userId: { type: 'string', example: 'usr_123' },
      productId: { type: 'string', example: 'prd_123' },
      isActive: { type: 'boolean', example: true },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  },

  CreateReviewRequest: {
    type: 'object',
    required: ['rating', 'productId'],
    properties: {
      rating: {
        type: 'number',
        format: 'float',
        minimum: 0,
        maximum: 5,
        example: 4.5,
      },
      comment: {
        type: 'string',
        example: 'Entrega rápida e qualidade excelente.',
      },
      productId: {
        type: 'string',
        example: 'prd_123',
      },
    },
  },
};

export const reviewTags = [
  {
    name: 'Review',
    description: 'Gerenciamento de avaliações',
  },
];
