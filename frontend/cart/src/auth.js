import { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';
import { getCart } from './cart';

const API_SERVER = 'http://localhost:8080';
const JWT = 'jwt';

export const jwt = new BehaviorSubject(localStorage.getItem(JWT));

export const login = (email, password) =>
  fetch(`${API_SERVER}/user/login`, {
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
      jwt.next(access_token);
      getCart();
      return access_token;
    });

export const logout = () => {
  localStorage.removeItem(JWT);
  jwt.next(null);
};

export const register = (email, password) =>
  fetch(`${API_SERVER}/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => res.json());

export function useLoggedIn() {
  const [loggedIn, setLoggedIn] = useState(!!jwt.value);
  useEffect(() => {
    setLoggedIn(!!jwt.value);
    return jwt.subscribe((c) => {
      setLoggedIn(!!jwt.value);
    });
  }, []);
  return loggedIn;
}
