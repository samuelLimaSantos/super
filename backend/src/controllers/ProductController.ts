import { Request, Response, response } from 'express';
import db from '../database/connections';

class ProductController {
  async create(request: Request, response: Response) {
    const { name, value, amount } = request.body;

    const productId = await db('products').insert({
      name,
      value,
      amount,
    });

    const product = await db('products')
      .select('products.*')
      .where('products.id', '=', productId);

    return response.json(product);
  }

  async index(request: Request, response: Response) {
    const products = await db('products').select('products.*');

    return response.json(products);
  }

  async sell(request: Request, response: Response) {
    const { id } = request.params;
    const { quantity } = request.body;

    const [{ amount, value }] = await db('products')
      .select('products.*')
      .where('products.id', '=', id);

    if (quantity > amount) {
      return response
        .status(400)
        .json({ error: 'This product does not have stock' });
    }

    const newAmount = amount - quantity;

    await db('products').where('products.id', '=', id).update({
      id,
      value,
      amount: newAmount,
    });

    const product = await db('products')
      .select('products.*')
      .where('products.id', '=', id);

    return response.status(201).json(product);
  }

  async filter(request: Request, response: Response) {
    const filters = request.query;

    const title = filters.title as string;
    const price = filters.price as string;

    const product = await db('products')
      .select('products.*')
      .where('products.name', 'like', `%${title}%`)
      .andWhere('products.value', '<=', Number(price));

    return response.json(product);
  }
}

export default ProductController;
