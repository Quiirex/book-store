import { Book } from './Book';

export interface Order {
  id: string;
  orderDate: string;
  orderNumber: string;
  orderStatus: string;
  orderTotal: number;
  orderList: Book[];
  shippingAddress: string;
  customerId: string;
}
