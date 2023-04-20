import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { Order } from '../models/Order';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const URL = process.env.ORDER_SERVICE;

const getOrders = async (_req: Request, res: Response) => {
  try {
    const result: AxiosResponse = await axios.get(`${URL}/api/order`);
    const orders: Order[] = result.data;
    return res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    return res.status(503).json({ message: 'External API not available' });
  }
};

const getOrder = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const result: AxiosResponse = await axios.get(`${URL}/api/order/${id}`);
    const order: Order = result.data;
    return res.status(200).json({ order });
  } catch (error) {
    console.error(error);
    return res.status(503).json({ message: 'External API not available' });
  }
};

const createOrder = async (req: Request, res: Response) => {
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
      `${URL}/api/order`,
      newOrder,
    );
    return res.status(200).json({ message: response.data });
  } catch (error) {
    console.error(error);
    return res.status(503).json({ message: 'External API not available' });
  }
};

// update order
const updateOrder = async (req: Request, res: Response) => {
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
      `${URL}/api/order/${id}`,
      updatedFields,
    );
    return res.status(200).json({ message: response.data });
  } catch (error) {
    console.error(error);
    return res.status(503).json({ message: 'External API not available' });
  }
};

// delete an order
const deleteOrder = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const response: AxiosResponse = await axios.delete(
      `${URL}/api/order/${id}`,
    );
    return res.status(200).json({ message: response.data });
  } catch (error) {
    console.error(error);
    return res.status(503).json({ message: 'External API not available' });
  }
};

export default { getOrders, getOrder, createOrder, updateOrder, deleteOrder };
