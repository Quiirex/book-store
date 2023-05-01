import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getBooks } from './books';
import { addToCart, useLoggedIn } from 'cart/cart';

export default function HomeContent() {
  const loggedIn = useLoggedIn();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then(setBooks);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-5">
      {books.map((book) => (
        <div key={book.id}>
          <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <Link to={`/book/${book.id}`}>
              <img class="rounded-t-lg" src={book.image} alt={book.name} />
            </Link>
            <div class="p-5">
              <a>
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <Link to={`/book/${book.id}`}>
                    <a>{book.name}</a>
                  </Link>
                </h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {book.description}
              </p>
              {loggedIn && (
                <div className="text-right mt-2">
                  <button
                    className="bg-primary hover:bg-blue-700 text-text-base text-sm font-bold py-2 px-4 rounded"
                    onClick={() => addToCart(book.id)}
                    id={`addtocart_${book.id}`}
                  >
                    Add to cart
                  </button>
                </div>
              )}
              <Link to={`/book/${book.id}`}>
                <a class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Learn more
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
