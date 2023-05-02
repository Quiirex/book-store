import { render } from 'solid-js/web';

import AddToCart from './AddToCart';

export default function placeAddToCart(el, id, title, price, isbn) {
  render(
    () => <AddToCart id={id} title={title} price={price} isbn={isbn} />,
    el,
  );
}
