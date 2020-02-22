export const signup = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
      example: 'john'
    },
    lastName: {
      type: 'string',
      example: 'doe'
    },
    email: {
      type: 'string',
      example: 'johndoe@test.com'
    },
    password: {
      type: 'string'
    }
  }
};
