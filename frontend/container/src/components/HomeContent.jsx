import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { getProducts } from '../services/products';
import { addToCart } from 'cart/cart';
import { useLoggedIn } from 'authentication/auth';

export default function HomeContent() {
  const loggedIn = useLoggedIn();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAddToCart = useCallback(
    (
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
    ) => {
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
      );
    },
    [addToCart],
  );

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
              <div className="bg-white shadow-md dark:bg-gray-800 dark:border-gray-700 h-full flex flex-col">
                <Link to={`/book/${book.id}`}>
                  <img
                    className="object-contain h-64 w-full"
                    src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
                    alt={book.title}
                  />
                </Link>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                      <Link to={`/book/${book.id}`}>
                        <a>{book.title}</a>
                      </Link>
                    </h5>
                    <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                      <b>Author:</b> {book.author} ({book.yearOfPublication})
                    </p>
                    <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                      <b>ISBN:</b> {book.isbn}
                    </p>
                    <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                      <b>Genre:</b> {book.genre}
                    </p>
                    <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                      <b>Rating:</b> {book.rating}/5
                    </p>
                    <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                      <b>Language:</b> {book.language}
                    </p>
                    <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                      <b>Format:</b> {book.format}
                    </p>
                    <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                      <b>Price:</b> {book.price}€
                    </p>
                  </div>
                  {loggedIn && (
                    <div className="text-right">
                      <button
                        className="bg-white hover:bg-primary hover:text-white text-black text-sm font-bold py-2 px-4 rounded border border-black"
                        onClick={() =>
                          handleAddToCart(
                            book.id,
                            book.title,
                            book.author,
                            book.yearOfPublication,
                            book.isbn,
                            book.description,
                            book.genre,
                            book.language,
                            book.rating,
                            book.format,
                            book.price,
                          )
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
