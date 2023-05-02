import { createEffect, createSignal, Show } from 'solid-js';

import { jwt, addToCart } from 'cart/auth';

export default ({ id, title, price, isbn }) => {
  const [loggedIn, setLoggedIn] = createSignal(false);

  createEffect(() => {
    return jwt.subscribe((jwt) => {
      setLoggedIn(!!jwt);
    });
  });

  return (
    <Show when={loggedIn()}>
      <button
        onClick={() => addToCart(id, title, price, isbn)}
        class="bg-primary text-text-base py-2 px-5 rounded-md text-sm mt-5"
      >
        Add to cart
      </button>
    </Show>
  );
};
