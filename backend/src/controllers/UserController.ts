import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from '../database/connections';
import jwt from 'jsonwebtoken';

interface UserData {
  id: number;
  email: string;
  password: string;
  category: string;
}

class UserController {
  async createUser(request: Request, response: Response) {
    const { name, email, password, category } = request.body;

    const isEmailAlreadyRegistered: number[] = await db('users')
      .select('users.*')
      .where('users.email', '=', email);

    if (isEmailAlreadyRegistered.length > 0) {
      return response
        .status(401)
        .json({ error: 'Email is already registered' });
    }

    try {
      const cryptoHash = await bcrypt.hash(password, 8);
      const [idUser] = await db('users').insert({
        name,
        email,
        password: cryptoHash,
        category,
      });
      return response.status(201).json({ idUser, email });
    } catch (err) {
      return response.status(400).json({ error: 'Error' });
    }
  }

  async loginUser(request: Request, response: Response) {
    const { email, password } = request.body;

    const userData: UserData[] = await db('users')
      .select('users.*')
      .where('users.email', '=', email);

    if (userData.length < 1) {
      return response.status(401).json({ error: 'Email is not registered' });
    }

    const isPasswordOk = await bcrypt.compare(password, userData[0].password);

    if (isPasswordOk === false) {
      return response.status(401).json({ error: 'Invalid Password' });
    }

    const token = jwt.sign(
      {
        id: userData[0].id,
        email: userData[0].email,
      },
      'segredo',
      {
        expiresIn: '1h',
      }
    );

    return response.json({ token, category: userData[0].category });
  }
}

export default UserController;
