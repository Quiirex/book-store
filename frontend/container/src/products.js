const API_SERVER = 'http://localhost:8080';

export const getProducts = () =>
  fetch(`${API_SERVER}/book`)
    .then((res) => res.json())
    .then((data) => data.books);

export const getProductById = (id) =>
  fetch(`${API_SERVER}/book/${id}`).then((res) => res.json());

export const currency = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
});
