import React, { useState, useEffect } from 'react';

import { cart, clearCart } from 'cart/cart';

export default function CartContent() {
  const [items, setItems] = useState([]);

  useEffect(
    () => cart.subscribe((value) => setItems(value?.cartItems ?? [])),
    [],
  );

  return (
    <div className="mx-60">
      {items.length === 0 ? (
        <div className="text-center text-2xl mt-10">
          Your cart is currently empty.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2">
          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              <div className="flex items-center justify-between">
                <img
                  src={
                    'https://covers.openlibrary.org/b/isbn/' +
                    item.isbn +
                    '-L.jpg'
                  }
                  alt={item.title}
                  className="max-h-24"
                />
                <div className="ml-4 flex-grow text-xl">{item.title}</div>
                <div className="text-right text-xl">
                  {item.quantity} x {item.price.toFixed(2)}€
                </div>
              </div>
              {index !== items.length - 1 && <hr className="my-2" />}
            </React.Fragment>
          ))}
          <div className="text-right" id="grand_total">
            Total:{' '}
            {items.reduce((a, v) => a + v.quantity * v.price, 0).toFixed(2)}€
          </div>
          <div className="flex mt-5">
            <div className="flex-grow">
              <button
                id="clearcart"
                className="bg-white py-2 px-5 rounded-md text-sm"
                onClick={clearCart}
              >
                Clear
              </button>
            </div>
            <div className="flex-end">
              <button
                className="border text-white py-2 px-5 rounded-md text-sm"
                onClick={() => alert('Order placed successfully!')}
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
