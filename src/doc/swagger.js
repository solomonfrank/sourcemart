import { created, success } from './definitions/succesResponse';
import { badRequest, serverError } from './definitions/errorResponse';
import { signupPath } from './paths/signup';
import { signup } from './definitions/signup';

const swaggerDocument = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'Souree market',
    description: 'API Documentation for source market',
    header: 'none'
  },
  host: 'http://localhost:6000',
  basePath: '/api/v1/',
  produces: ['application/json'],
  consumes: ['application/json'],
  schemes: ['http', 'https'],
  securityDefinitions: {
    BearerToken: {
      description: `
        All protected routes must be accessed with a Bearer Token.
        The JWT Token is generated by the API upon user login.`,
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },
  tags: [{ name: 'user', description: 'sign up route' }],
  paths: {
    '/auth/signup': signupPath
  },
  definitions: {
    badRequest,
    serverError,
    created,
    success,
    signup
  }
};

export default swaggerDocument;
