import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import _ from 'lodash';

import errors from '../utils/errors';
import { createResponse, createError } from '../utils/response';
import type Server from '../core/server';
import Logger from '../core/logger';
import NumeralsService from '../services/numerals.service';

class NumeralsRoute {

  private router: Router;
  private app: Server;
  private numbersService: NumeralsService;

  constructor(app: Server) {
    this.router = Router();
    this.app = app;

    this.numbersService = new NumeralsService();

    // Setup routes
    this.router.get('/all', this.getAll.bind(this));
    this.router.get('/arabic/:inputValue', this.verifyRomanNumeral, this.getArabic.bind(this));
    this.router.get('/roman/:inputValue', this.verifyArabicNumeral, this.getRoman.bind(this));
    this.router.delete('/remove', this.removeAll.bind(this));
    // Add route
    this.app.addRoute('/numerals', this.router);
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await this.numbersService.getAllNumeralsList();

      createResponse(res, 200, 'NUMBERS_LIST', null, _.map(response, r => ({ inputValue: r.roman, convertedValue: r.arabic })));
    } catch (e) {
      Logger.log('error', 'NumeralsRoute ~ getAll catch', e);
      next(createError());
    }
  }

  async getArabic(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await this.numbersService.getArabicNumeral(req.params);

      createResponse(res, 200, 'ARABIC_NUMERAL', null, { inputValue: response.roman, convertedValue: response.arabic });
    } catch (e) {
      Logger.log('error', 'NumeralsRoute ~ getArabic catch', e);
      next(createError());
    }
  }

  async getRoman(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await this.numbersService.getRomanNumeral(req.params);

      createResponse(res, 200, 'ROMAN_NUMERAL', null, { inputValue: response.arabic, convertedValue: response.roman });
    } catch (e) {
      Logger.log('error', 'NumeralsRoute ~ getRoman catch', e);
      next(createError());
    }
  }

  async removeAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.numbersService.removeAllNumerals();

      createResponse(res, 200, 'NUMBERS_REMOVED', null, []);
    } catch (e) {
      Logger.log('error', 'NumeralsRoute ~ getAll catch', e);
      next(createError());
    }
  }

  verifyRomanNumeral(req: Request, res: Response, next: NextFunction): void {
    // M{0,3} specifies the thousands section and basically restrains it to between 0 and 4000
    // (CM|CD|D?C{0,3}) is for the hundreds section.
    // (XC|XL|L?X{0,3}) is for the tens place.
    // (IX|IV|V?I{0,3}) is the units section.
    const romanRegEx = new RegExp('^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$');

    if (!req.params.inputValue.match(romanRegEx)) {
      Logger.log('error', 'NumeralsRoute ~ verifyRomanNumeral');
      next(createError(errors.not_valid));
      return;
    }

    next();
  }

  verifyArabicNumeral(req: Request, res: Response, next: NextFunction): void {
    if (_.isNaN(Number(req.params.inputValue))) {
      Logger.log('error', 'NumeralsRoute ~ verifyArabicNumeral');
      next(createError(errors.not_valid));
      return;
    }

    next();
  }
}

export default NumeralsRoute;
