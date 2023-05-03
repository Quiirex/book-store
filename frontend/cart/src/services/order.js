import { v4 as uuidv4 } from 'uuid';
import { clearCart } from './cart';
import jwt_decode from 'jwt-decode';

const API_SERVER = 'http://localhost:8080';
const JWT = 'jwt';

export const order = (items) => {
  console.log(items);

  const orderNumber = uuidv4();
  const jwt = localStorage.getItem(JWT);
  const decodedJwt = jwt_decode(jwt);
  const customerId = decodedJwt.user_id;

  return fetch(`${API_SERVER}/user/${customerId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const shippingAddress = data.user.data.address;

      return fetch(`${API_SERVER}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderDate: new Date().toISOString(),
          orderNumber,
          orderStatus: 'Completed',
          orderTotal: items.reduce((total, item) => total + item.price, 0),
          orderList: items.map((item) => ({
            id: item.id,
            title: item.title,
            author: item.author,
            yearOfPublication: item.yearOfPublication,
            isbn: item.isbn,
            description: item.description,
            genre: item.genre,
            language: item.language,
            rating: item.rating,
            format: item.format,
            price: item.price,
          })),
          shippingAddress,
          customerId,
        }),
      });
    })
    .then((res) => {
      if (res.status === 500 || res.status === 503) {
        alert('There was an error placing your order. Please try again.');
        throw new Error(
          'There was an error placing your order. Please try again.',
        );
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      clearCart();
      alert('Order placed successfully!');
      window.location.href = '/';
      return data;
    });
};
