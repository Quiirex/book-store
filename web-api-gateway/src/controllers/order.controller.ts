import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

interface Book {
  id: string;
  title: string;
  author: string;
  yearOfPublication: number;
  isbn: string;
  description: string;
  genre: string;
  language: string;
  rating: number;
  format: string;
  price: number;
}

interface Order {
  id: string;
  orderDate: string;
  orderNumber: string;
  orderStatus: string;
  orderTotal: number;
  orderList: Book[];
  shippingAddress: string;
  customerId: string;
}

const host = 'localhost';
const port = 8000;

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result: AxiosResponse = await axios.get(
      `http://${host}:${port}/api/order`,
    );
    const orders: Order[] = result.data;
    return res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    return res.status(503).json({ message: 'External API not available' });
  }
};

const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;
    const result: AxiosResponse = await axios.get(
      `http://${host}:${port}/api/order/${id}`,
    );
    const order: Order = result.data;
    return res.status(200).json({ order });
  } catch (error) {
    console.error(error);
    return res.status(503).json({ message: 'External API not available' });
  }
};

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      orderDate,
      orderNumber,
      orderStatus,
      orderTotal,
      orderList,
      shippingAddress,
      customerId,
    } = req.body;

    const newOrder: Partial<Order> = {
      orderDate,
      orderNumber,
      orderStatus,
      orderTotal,
      orderList,
      shippingAddress,
      customerId,
    };

    const response: AxiosResponse = await axios.post(
      `http://${host}:${port}/api/order`,
      newOrder,
    );
    return res.status(200).json({ message: response.data });
  } catch (error) {
    console.error(error);
    return res.status(503).json({ message: 'External API not available' });
  }
};

// update order
const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;
    const {
      orderDate,
      orderNumber,
      orderStatus,
      orderTotal,
      orderList,
      shippingAddress,
      customerId,
    } = req.body;

    const updatedFields: Partial<Order> = {
      ...(orderDate && { orderDate }),
      ...(orderNumber && { orderNumber }),
      ...(orderStatus && { orderStatus }),
      ...(orderTotal && { orderTotal }),
      ...(orderList && { orderList }),
      ...(shippingAddress && { shippingAddress }),
      ...(customerId && { customerId }),
    };

    const response: AxiosResponse = await axios.put(
      `http://${host}:${port}/api/order/${id}`,
      updatedFields,
    );
    return res.status(200).json({ message: response.data });
  } catch (error) {
    console.error(error);
    return res.status(503).json({ message: 'External API not available' });
  }
};

// delete an order
const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;
    const response: AxiosResponse = await axios.delete(
      `http://${host}:${port}/api/order/${id}`,
    );
    return res.status(200).json({ message: response.data });
  } catch (error) {
    console.error(error);
    return res.status(503).json({ message: 'External API not available' });
  }
};

export default { getOrders, getOrder, createOrder, updateOrder, deleteOrder };
