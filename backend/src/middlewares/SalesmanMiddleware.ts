import db from '../database/connections';
import { Request, Response, NextFunction } from 'express';

class SalesmanMiddleware {
  async isSalesman(request: Request, response: Response, next: NextFunction) {
    const { email } = request.body;

    const isSalesman = await db('users')
      .select('users.*')
      .where('users.email', '=', email)
      .andWhere('users.category', '=', 'salesman');

    if (isSalesman.length < 1) {
      return response.json({ error: 'Invalid Email' });
    }

    request.user_id = isSalesman[0].id;
    next();
  }
}

export default new SalesmanMiddleware().isSalesman;
