import React, { useEffect, useState } from 'react';
import { cart, clearCart } from './cart';
import { useLoggedIn } from './auth';

export default function MiniCart() {
  const [items, setItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const loggedIn = useLoggedIn();

  useEffect(() => {
    const subscription = cart.subscribe((c) => {
      setItems(c?.cartItems || []);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (!loggedIn) return null;

  return (
    <>
      <span
        onClick={() => setShowCart(!showCart)}
        id="showcart_span"
        class="mr-5"
      >
        <i className="ri-shopping-cart-2-fill text-xl" id="showcart"></i>
        {items.reduce((acc, item) => acc + item.quantity, 0)}
      </span>
      {showCart && (
        <>
          <div
            className="absolute p-5 border-4 border-white rounded-xl bg-primary text-black"
            style={{
              width: 300,
              top: '2rem',
              left: -265,
            }}
          >
            <div
              className="grid gap-3 text-sm"
              style={{
                gridTemplateColumns: '1fr 3fr 10fr 2fr',
              }}
            >
              {items.map((item) => (
                <React.Fragment key={item.id}>
                  <div>{item.quantity}</div>
                  <img
                    src={
                      'https://covers.openlibrary.org/b/isbn/' +
                      item.isbn +
                      '-L.jpg'
                    }
                    alt={item.title}
                    className="max-h-12"
                  />
                  <div>{item.title}</div>
                  <div className="text-right">
                    {(item.quantity * item.price).toFixed(2)}€
                  </div>
                </React.Fragment>
              ))}
              <div></div>
              <div></div>
              <div></div>
              <div>
                Total:{' '}
                {items.reduce((a, v) => a + v.quantity * v.price, 0).toFixed(2)}
                €
              </div>
            </div>
            <div className="flex mt-2">
              <div className="flex-grow">
                <button
                  id="clearcart"
                  className="bg-white border border-black text-black hover:bg-primary hover:text-white py-2 px-5 rounded-md text-sm"
                  onClick={() => {
                    window.location.href = '/cart';
                  }}
                >
                  Checkout
                </button>
              </div>
              <div className="flex-end">
                <button
                  className="bg-white border border-black text-black hover:bg-primary hover:text-white py-2 px-5 rounded-md text-sm"
                  onClick={clearCart}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
