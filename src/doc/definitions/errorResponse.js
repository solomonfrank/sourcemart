export const badRequest = {
  type: 'object',
  required: ['status', 'message'],
  properties: {
    status: {
      type: 'string',
      example: 'fail'
    },
    message: {
      type: 'string',
      example: 'Bad request'
    },
    payload: {
      type: 'object',
      items: {
        type: 'string',
        example: 'Bad Bequest'
      }
    }
  }
};

export const serverError = {
  type: 'object',
  required: ['status', 'message'],
  properties: {
    status: {
      type: 'boolean',
      example: false
    },
    message: {
      type: 'string',
      example: 'Server Error'
    },
    payload: {
      type: 'object'
    }
  }
};
