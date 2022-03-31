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
    this.router.get('/arabic/:inputValue', this.getArabic.bind(this));
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
      if (e === 400) {
        Logger.log('error', 'NumeralsRoute ~ getArabic 400', null);
        next(createError(errors.not_valid));
      } else {
        Logger.log('error', 'NumeralsRoute ~ getArabic catch', e);
        next(createError());
      }
    }
  }
}

export default NumeralsRoute;
