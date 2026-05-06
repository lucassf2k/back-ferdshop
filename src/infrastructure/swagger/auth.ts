export const authPaths = {
  '/sign-in': {
    post: {
      tags: ['Auth'],
      summary: 'Realiza login do usuário',
      description: 'Autentica o usuário com e-mail e senha.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/SignInRequest',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Login realizado com sucesso',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SignInResponse',
              },
            },
          },
        },
        '401': {
          description: 'Credenciais inválidas',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
      },
    },
  },
};

export const authSchemas = {
  SignInRequest: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        example: 'john.doe@email.com',
      },
      password: {
        type: 'string',
        example: '123456',
      },
    },
  },
  SignInResponse: {
    type: 'object',
    properties: {
      accessToken: {
        type: 'string',
        example: 'jwt.token.aqui',
      },
      refreshToken: {
        type: 'string',
        example: 'refresh.token.aqui',
      },
      user: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'usr_123' },
          name: { type: 'string', example: 'John Doe' },
          email: { type: 'string', example: 'john.doe@email.com' },
        },
      },
    },
  },
  ErrorResponse: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'Credenciais inválidas',
      },
    },
  },
};

export const authTags = [
  {
    name: 'Auth',
    description: 'Autenticação',
  },
];
