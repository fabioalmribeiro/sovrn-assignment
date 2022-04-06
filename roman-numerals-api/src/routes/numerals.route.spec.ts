import type { Request } from 'express';

import errors from '../utils/errors';
import Server from '../core/server';
import Logger from '../core/logger';
import NumeralsRoute from './numerals.route';

describe('Numerals Route', () => {

  let server: Server;
  let route: NumeralsRoute;

  beforeAll(() => {
    Logger.log = jest.fn();

    server = new Server();
    route = new NumeralsRoute(server);
  });

  test('verifyRomanNumeral middleware should call next', () => {
    expect.assertions(1);

    const req: Partial<Request> = { params: { inputValue: 'V' } };
    const next = jest.fn();
    route.verifyRomanNumeral(req as Request, null, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  test('verifyRomanNumeral middleware should call next with not_valid error', () => {
    expect.assertions(2);

    const req: Partial<Request> = { params: { inputValue: 'VV' } };
    const next = jest.fn();
    route.verifyRomanNumeral(req as Request, null, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(errors.not_valid);
  });

  test('verifyArabicNumeral middleware should call next', () => {
    expect.assertions(1);

    const req: Partial<Request> = { params: { inputValue: '5' } };
    const next = jest.fn();
    route.verifyArabicNumeral(req as Request, null, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  test('verifyArabicNumeral middleware should call next with not_valid error', () => {
    expect.assertions(2);

    const req: Partial<Request> = { params: { inputValue: 'a' } };
    const next = jest.fn();
    route.verifyArabicNumeral(req as Request, null, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(errors.not_valid);
  });

});
