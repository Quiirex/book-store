import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { LoginUser } from '../models/LoginUser';
import { RegisterUser } from '../models/RegisterUser';
import { User } from '../models/User';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const URL = process.env.USER_SERVICE;

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const loginUser: LoginUser = {
      email,
      password,
    };
    const response: AxiosResponse = await axios.post(
      `${URL}/api/user/login`,
      loginUser,
    );
    return res.status(200).json({ message: response.data });
  } catch (error) {
    console.error(error);
    return res.status(503).json({ message: 'External API not available' });
  }
};

const registerUser = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, password, address } = req.body;

    const newUser: RegisterUser = {
      first_name,
      last_name,
      email,
      password,
      address,
    };

    const response: AxiosResponse = await axios.post(
      `${URL}/api/user`,
      newUser,
    );
    return res.status(201).json({ message: response.data });
  } catch (error) {
    console.error(error);
    return res.status(503).json({ message: 'External API not available' });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const result: AxiosResponse = await axios.get(`${URL}/api/user`, config);
    const users: User[] = result.data;
    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    return res.status(503).json({ message: 'External API not available' });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const id: string = req.params.id;
    const result: AxiosResponse = await axios.get(
      `${URL}/api/user/${id}`,
      config,
    );
    const user: User = result.data;
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(503).json({ message: 'External API not available' });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const id: string = req.params.id;
    const { first_name, last_name, email, password, address } = req.body;

    const updatedFields: Partial<User> = {
      ...(first_name && { first_name }),
      ...(last_name && { last_name }),
      ...(email && { email }),
      ...(password && { password }),
      ...(address && { address }),
    };

    const response: AxiosResponse = await axios.put(
      `${URL}/api/user/${id}`,
      updatedFields,
      config,
    );
    return res.status(200).json({ message: response.data });
  } catch (error) {
    console.error(error);
    return res.status(503).json({ message: 'External API not available' });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const id: string = req.params.id;
    const response: AxiosResponse = await axios.delete(
      `${URL}/api/user/${id}`,
      config,
    );
    return res.status(204).json({ message: response.data });
  } catch (error) {
    console.error(error);
    return res.status(503).json({ message: 'External API not available' });
  }
};

export default {
  loginUser,
  registerUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
