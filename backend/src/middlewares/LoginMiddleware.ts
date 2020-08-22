import jwt from 'jsonwebtoken';
import { Response, NextFunction, Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user: string | object;
    user_id: number;
  }
}

class LoginMiddleware {
  loginSection(request: Request, response: Response, next: NextFunction) {
    const bearer = request.headers.authorization;

    if (!bearer) {
      return response.status(401).json({ error: 'Token is missing' });
    }

    const token = bearer.split(' ')[1];

    try {
      const decode = jwt.verify(token, 'segredo');
      request.user = decode;
      next();
    } catch (error) {
      return response.status(401).json({ error: 'Error in authentication' });
    }
  }
}

export default new LoginMiddleware().loginSection;
