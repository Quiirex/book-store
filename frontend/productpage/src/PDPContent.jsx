import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { getProductById } from 'container/products';
import placeAddToCart from 'addtocart/placeAddToCart';

export default function PDPContent() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      getProductById(id).then(setProduct);
    } else {
      setProduct(null);
    }
  }, [id]);

  const addToCart = useRef(null);

  useEffect(() => {
    if (addToCart.current) {
      placeAddToCart(
        addToCart.current,
        product.id,
        product.title,
        product.price,
        product.isbn,
      );
    }
  }, [product]);

  if (!product) return null;

  return (
    <a class="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="grid grid-cols-2 gap-5">
        <div>
          <img
            src={
              'https://covers.openlibrary.org/b/isbn/' + product.isbn + '-L.jpg'
            }
            alt={product.title}
          />
        </div>
        <div>
          <div className="flex">
            <h1 className="font-bold text-3xl flex-grow">{product.title}</h1>
          </div>
          <div ref={addToCart}></div>
          <div className="mt-10">{product.description}</div>
        </div>
      </div>
    </a>
  );
}
