import 'jest';
import { StatusCodes } from 'http-status-codes';
import { server } from '../../../server';
import supertest from 'supertest';

afterEach(() => {
  server.close();
});

describe('Auth routes', () => {
  it('should', async () => {
    const response = await supertest(server)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send({
        email: 'john.doe@email.com',
        password: 'P4ssword',
      });

    let errorResponse = null;

    if (response.error) {
      errorResponse = JSON.parse(response.error.text);
    }

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(errorResponse).toEqual({
      message: 'User does not exists',
      statusCode: StatusCodes.BAD_REQUEST,
    });
  });
});
