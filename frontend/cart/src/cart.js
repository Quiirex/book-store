import { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';

export const cart = new BehaviorSubject(getLocalCart());

function getLocalCart() {
  const localCart = localStorage.getItem('cart');
  return localCart ? JSON.parse(localCart) : { cartItems: [] };
}

function setLocalCart(newCart) {
  localStorage.setItem('cart', JSON.stringify(newCart));
  cart.next(newCart);
}

export const getCart = () => {
  const localCart = getLocalCart();
  cart.next(localCart);
  return Promise.resolve(localCart);
};

export const addToCart = (id, title, price, isbn) => {
  const localCart = getLocalCart();
  const cartItems = localCart.cartItems || [];
  const existingItem = cartItems.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ id, title, price, isbn, quantity: 1 });
  }

  setLocalCart({ cartItems });
};

export const clearCart = () => {
  localStorage.removeItem('cart');
  cart.next({ cartItems: [] });
};

export function useCart() {
  const [cartItems, setCartItems] = useState(cart.value.cartItems);
  useEffect(() => {
    setCartItems(cart.value.cartItems);
    return cart.subscribe((c) => {
      setCartItems(c.cartItems);
    });
  }, []);
  return [cartItems, addToCart, clearCart];
}
