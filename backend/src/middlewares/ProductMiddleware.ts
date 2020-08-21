import { Response, Request, NextFunction } from 'express';

class ProductMiddleware {
  isFieldEmpty(request: Request, response: Response, next: NextFunction) {
    const { name, value, amount } = request.body;

    if (!name || !value || !amount) {
      return response
        .status(400)
        .json({ error: 'Bad Request: one or more fields are empty' });
    }

    next();
  }
}

export default ProductMiddleware;
