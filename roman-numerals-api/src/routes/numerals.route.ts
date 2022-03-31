import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';

import { createResponse, createError } from '../utils/response';
import Logger from '../core/logger';
import type Server from '../core/server';
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
    // Add route
    this.app.addRoute('/numerals', this.router);
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await this.numbersService.getAllNumeralsList();

      createResponse(res, 200, 'NUMBERS_LIST', null, response);
    } catch (e) {
      Logger.log('error', 'NumeralsRoute ~ getAll catch', e);
      next(createError());
    }
  }
}

export default NumeralsRoute;
