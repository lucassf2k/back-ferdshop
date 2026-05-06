export const appStatusCode = {
  emailAlreadyExists: {
    status: 409,
    code: 'EMAIL_ALREADY_EXISTS',
  },
  passwordIncorrect: {
    status: 401,
    code: 'PASSWORD_INCORRECT',
  },
  userNotFound: {
    status: 404,
    code: 'USER_NOT_FOUND',
  },
  categoryAlreadyExists: {
    status: 409,
    code: 'CATEGORY_ALREADY_EXISTS',
  },
  productAlreadyExists: {
    status: 409,
    code: 'PRODUCT_ALREADY_EXISTS',
  },
  validationError: {
    status: 400,
    code: 'VALIDATION_ERROR',
  },
  categoryNotFound: {
    status: 404,
    code: 'CATEGORY_NOT_FOUND',
  },
  productNotFound: {
    status: 404,
    code: 'PRODUCT_NOT_FOUND',
  },
  orderNotFound: {
    status: 404,
    code: 'ORDER_NOT_FOUND',
  },
  orderItemNotFound: {
    status: 404,
    code: 'ORDER_ITEM_NOT_FOUND',
  },
  unauthorized: {
    status: 401,
    code: 'UNAUTHORIZED',
  },
  forbidden: {
    status: 403,
    code: 'FORBIDDEN',
  },
  badRequest: {
    status: 400,
    code: 'BAD_REQUEST',
  },
  internalServerError: {
    status: 500,
    code: 'INTERNAL_SERVER_ERROR',
  },
  jwtError: {
    status: 401,
    code: 'JWT_ERROR',
  },
  categoryNotCreated: {
    status: 400,
    code: 'CATEGORY_NOT_CREATED',
  },
} as const;
