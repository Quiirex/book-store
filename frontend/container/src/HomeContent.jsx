import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getProducts } from './products';
import { addToCart } from 'cart/cart';
import { useLoggedIn } from 'cart/auth';

export default function HomeContent() {
  const loggedIn = useLoggedIn();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((products) => {
      setProducts(products);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 mx-20">
          {products.map((book) => (
            <div key={book.id} className="max-w-sm bg-background">
              <div class="bg-white shadow-md dark:bg-gray-800 dark:border-gray-700 h-full">
                <Link to={`/book/${book.id}`}>
                  <img
                    class="object-contain h-64 w-full"
                    src={
                      'https://covers.openlibrary.org/b/isbn/' +
                      book.isbn +
                      '-L.jpg'
                    }
                    alt={book.title}
                  />
                </Link>
                <div class="p-5">
                  <a>
                    <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                      <Link to={`/book/${book.id}`}>
                        <a>{book.title}</a>
                      </Link>
                    </h5>
                  </a>
                  <div class="flex flex-col justify-between">
                    <p class="text-sm font-normal text-gray-700 dark:text-gray-400">
                      <b>Author:</b> {book.author} ({book.yearOfPublication})
                    </p>
                    <p class="text-sm font-normal text-gray-700 dark:text-gray-400">
                      <b>ISBN:</b> {book.isbn}
                    </p>
                    <p class="text-sm font-normal text-gray-700 dark:text-gray-400">
                      <b>Genre:</b> {book.genre}
                    </p>
                    <p class="text-sm font-normal text-gray-700 dark:text-gray-400">
                      <b>Rating:</b> {book.rating}/5
                    </p>
                    <p class="text-sm font-normal text-gray-700 dark:text-gray-400">
                      <b>Language:</b> {book.language}
                    </p>
                    <p class="text-sm font-normal text-gray-700 dark:text-gray-400">
                      <b>Format:</b> {book.format}
                    </p>
                    <p class="text-sm font-normal text-gray-700 dark:text-gray-400">
                      <b>Price:</b> {book.price}€
                    </p>
                  </div>
                  {loggedIn && (
                    <div className="text-right">
                      <button
                        className="bg-primary hover:bg-blue-700 text-text-base text-sm font-bold py-2 px-4 rounded"
                        onClick={() =>
                          addToCart(book.id, book.title, book.price, book.isbn)
                        }
                        id={`addtocart_${book.id}`}
                      >
                        Add to cart
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
