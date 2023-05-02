import React, { useState, useEffect } from 'react';

import { cart, clearCart } from 'cart/cart';

export default function CartContent() {
  const [items, setItems] = useState([]);

  useEffect(
    () => cart.subscribe((value) => setItems(value?.cartItems ?? [])),
    [],
  );

  return (
    <>
      <div className="my-10 grid grid-cols-4 gap-5">
        {items.map((item) => (
          <React.Fragment key={item.id}>
            <img
              src={
                'https://covers.openlibrary.org/b/isbn/' + item.isbn + '-L.jpg'
              }
              alt={item.title}
              className="max-h-6"
            />
            <div>{item.title}</div>
            <div className="text-right">{item.price}</div>
          </React.Fragment>
        ))}
        <div></div>
        <div></div>
        <div></div>
        <div className="text-right" id="grand_total">
          Total: {items.reduce((a, v) => a + v.price, 0)}
          {/* Total: {items.reduce((a, v) => a + v.quantity * v.price, 0)} */}
        </div>
      </div>
      {items.length > 0 && (
        <div className="flex mb-10">
          <div className="flex-grow">
            <button
              id="clearcart"
              className="bg-white border border-green-800 text-green-800 py-2 px-5 rounded-md text-sm"
              onClick={clearCart}
            >
              Clear
            </button>
          </div>
          <div className="flex-end">
            <button
              className="bg-green-900 text-white py-2 px-5 rounded-md text-sm"
              onClick={clearCart}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
