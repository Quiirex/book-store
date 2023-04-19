import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
}

interface RegisterUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  address: string;
}

interface LoginUser {
  email: string;
  password: string;
}

const host = 'localhost';
const port = 5000;

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const loginUser: LoginUser = {
      email,
      password,
    };
    const response: AxiosResponse = await axios.post(
      `http://${host}:${port}/api/user/login`,
      loginUser,
    );
    return res.status(200).json({ message: response.data });
  } catch (error) {
    next(error);
  }
};

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
      `http://${host}:${port}/api/user`,
      newUser,
    );
    return res.status(201).json({ message: response.data });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const result: AxiosResponse = await axios.get(
      `http://${host}:${port}/api/user`,
      config,
    );
    const users: User[] = result.data;
    return res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const id: string = req.params.id;
    const result: AxiosResponse = await axios.get(
      `http://${host}:${port}/api/user/${id}`,
      config,
    );
    const user: User = result.data;
    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
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
      `http://${host}:${port}/api/user/${id}`,
      updatedFields,
      config,
    );
    return res.status(200).json({ message: response.data });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const id: string = req.params.id;
    const response: AxiosResponse = await axios.delete(
      `http://${host}:${port}/api/user/${id}`,
      config,
    );
    return res.status(204).json({ message: response.data });
  } catch (error) {
    next(error);
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