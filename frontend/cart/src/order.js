import { getCart } from './cart';

const API_SERVER = 'http://localhost:8080';

export const order = (email, password) =>
  fetch(`${API_SERVER}/order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const access_token = data.message.data.access_token;
      localStorage.setItem(JWT, access_token);
      getCart();
      return access_token;
    });
