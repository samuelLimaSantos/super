import { Router } from 'express';
import ProductController from './controllers/ProductController';
import ProductMiddleware from './middlewares/ProductMiddleware';
import UserController from './controllers/UserController';
import loginSection from './middlewares/LoginMiddleware';

const routes = Router();
const productController = new ProductController();
const productMiddleware = new ProductMiddleware();
const userController = new UserController();

// User Routes
routes.post('/users/register', userController.createUser);
routes.post('/users/login', userController.loginUser);

// Product Routes

routes.post(
  '/products',
  loginSection,
  productMiddleware.isFieldEmpty,
  productController.create
);
routes.get('/products', loginSection, productController.index);
routes.get('/products/filter', loginSection, productController.filter);
routes.put('/products/:id', loginSection, productController.sell);

export default routes;
