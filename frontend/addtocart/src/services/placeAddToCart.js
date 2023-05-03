import { render } from 'solid-js/web';

import AddToCart from '../components/AddToCart';

export default function placeAddToCart(
  el,
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
) {
  render(
    () => (
      <AddToCart
        id={id}
        title={title}
        author={author}
        yearOfPublication={yearOfPublication}
        isbn={isbn}
        description={description}
        genre={genre}
        language={language}
        rating={rating}
        format={format}
        price={price}
      />
    ),
    el,
  );
}
