import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { getProductById } from "home/products";
import placeAddToCart from "addtocart/placeAddToCart";

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
      placeAddToCart(addToCart.current, product.id);
    }
  }, [product]);

  if (!product) return null;

  return (
    <a
      class="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <div className="grid grid-cols-2 gap-5">
        <div>
          <img src={product.image} alt={product.name} />
        </div>
        <div>
          <div className="flex">
            <h1 className="font-bold text-3xl flex-grow">{product.name}</h1>
          </div>
          <div ref={addToCart}></div>
          <div className="mt-10">{product.description}</div>
          <div className="mt-10">{product.longDescription}</div>
        </div>
      </div>
    </a>
  );
}
