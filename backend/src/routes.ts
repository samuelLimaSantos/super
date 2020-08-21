import { Router } from 'express';
import ProductController from './controllers/ProductController';
import ProductMiddleware from './middlewares/ProductMiddleware';

const routes = Router();
const productController = new ProductController();
const productMiddleware = new ProductMiddleware();

routes.post(
  '/products',
  productMiddleware.isFieldEmpty,
  productController.create
);
routes.get('/products', productController.index);
routes.get('/products/filter', productController.filter);
routes.put('/products/:id', productController.sell);

export default routes;
