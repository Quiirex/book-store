import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getProducts } from "./products";
import { addToCart, useLoggedIn } from "cart/cart";

export default function HomeContent() {
  const loggedIn = useLoggedIn();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-5">
      {products.map((product) => (
        <div key={product.id}>
          <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <Link to={`/product/${product.id}`}>
              <img
                class="rounded-t-lg"
                src={product.image}
                alt={product.name}
              />
            </Link>
            <div class="p-5">
              <a>
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <Link to={`/product/${product.id}`}>
                    <a>{product.name}</a>
                  </Link>
                </h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {product.description}
              </p>
              {loggedIn && (
                <div className="text-right mt-2">
                  <button
                    className="bg-primary hover:bg-blue-700 text-text-base text-sm font-bold py-2 px-4 rounded"
                    onClick={() => addToCart(product.id)}
                    id={`addtocart_${product.id}`}
                  >
                    Skleni zavarovanje
                  </button>
                </div>
              )}
              <Link to={`/product/${product.id}`}>
                <a class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Preberi več
                  <svg
                    class="ml-2 -mr-1 w-4 h-4"
                    fill="primary"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
