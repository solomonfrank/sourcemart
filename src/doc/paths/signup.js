export const signupPath = {
  post: {
    tag: ['user'],
    security: {},
    summary: 'user should be able to sign up',
    description: 'sign up description',
    parameter: [
      {
        name: 'body',
        in: 'body',
        description: 'User signup',
        required: true,
        schema: {
          $ref: '#/definitions/signup'
        }
      }
    ],
    responses: {
      200: {
        description: 'user signup successfully',
        schema: {
          $ref: '#/definitions/created'
        }
      },
      400: {
        description: 'Invalid request details',
        schema: {
          $ref: '#/definitions/badRequest'
        }
      },
      500: {
        description: 'Server error',
        schema: {
          $ref: '#/definitions/serverError'
        }
      }
    }
  }
};
