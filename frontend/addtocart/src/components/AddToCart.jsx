import { createEffect, createSignal, Show } from 'solid-js';

import { jwt } from 'authentication/auth';
import { addToCart } from 'cart/cart';

export default ({
  id,
  title,
  author,
  yearOfPublication,
  isbn,
  description,
  genre,
  language,
  rating,
  format,
  price,
}) => {
  const [loggedIn, setLoggedIn] = createSignal(false);

  createEffect(() => {
    return jwt.subscribe((jwt) => {
      setLoggedIn(!!jwt);
    });
  });

  return (
    <Show when={loggedIn()}>
      <button
        onClick={() =>
          addToCart(
            id,
            title,
            author,
            yearOfPublication,
            isbn,
            description,
            genre,
            language,
            rating,
            format,
            price,
          )
        }
        class="bg-primary text-text-base py-2 px-5 rounded-md text-sm mt-5"
      >
        Add to cart
      </button>
    </Show>
  );
};
