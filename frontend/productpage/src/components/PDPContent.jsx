import React, { useState, useEffect, useRef, memo } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from 'container/products';
import placeAddToCart from 'addtocart/placeAddToCart';
import { review, deleteReview } from '../services/review';
import { useLoggedIn } from 'authentication/auth';
import jwt_decode from 'jwt-decode';

const PDPContent = memo(() => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const addToCart = useRef(null);
  const loggedIn = useLoggedIn();

  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    var author_id = jwt_decode(jwt).user_id;
  }

  useEffect(() => {
    if (id) {
      getProductById(id).then(setProduct);
    } else {
      setProduct(null);
    }
  }, [id]);

  useEffect(() => {
    if (addToCart.current && product) {
      const {
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
      } = product;
      placeAddToCart(
        addToCart.current,
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
        price
      );
    }
  }, [product]);

  if (!product) return null;

  const {
    title,
    description,
    author,
    yearOfPublication,
    isbn,
    language,
    genre,
    rating,
    format,
    reviews,
    price,
  } = product;

  const handleReviewTitleChange = (event) => {
    setReviewTitle(event.target.value);
  };

  const handleReviewContentChange = (event) => {
    setReviewContent(event.target.value);
  };

  const handleReviewSubmit = () => {
    if (loggedIn) {
      review(reviewTitle, reviewContent, id);
      setReviewTitle('');
      setReviewContent('');
    } else {
      alert('You must be logged in to write a review.');
    }
  };

  const handleReviewDelete = (reviewId) => {
    deleteReview(reviewId);
  };

  return (
    <article className="mx-4 md:mx-20 bg-background p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h1 className="font-bold text-3xl md:text-3xl">{title}</h1>
          <div className="mt-5 text-base md:text-lg">
            <h2 className="font-bold mb-2">Description</h2>
            <p>{description}</p>
          </div>
          <div className="mt-5 text-base md:text-lg">
            <h2 className="font-bold mb-2">Details</h2>
            <ul>
              <li>
                <span className="font-bold">Author:</span> {author}
              </li>
              <li>
                <span className="font-bold">Publication Year:</span>{' '}
                {yearOfPublication}
              </li>
              <li>
                <span className="font-bold">ISBN:</span> {isbn}
              </li>
              <li>
                <span className="font-bold">Language:</span> {language}
              </li>
              <li>
                <span className="font-bold">Format:</span> {format}
              </li>
              <li>
                <span className="font-bold">Genre:</span> {genre}
              </li>
              <li>
                <span className="font-bold">Rating:</span> {rating}
              </li>
              <li>
                <span className="font-bold">Price:</span> {price}
              </li>
            </ul>
            <div ref={addToCart}></div>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src={`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`}
            alt={title}
            className="mt-6 md:mt-0"
          />
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-5">Reviews</h2>
        {reviews?.length ? (
          <ul>
            {reviews.map((review) => (
              <li key={review.id} className="mb-3">
                <div className="flex items-center">
                  <div className="rounded-full overflow-hidden h-12 w-12 mr-3 border-black border">
                    <svg
                      fill="#000000"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="h-full w-full"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {' '}
                        <g>
                          {' '}
                          <g>
                            {' '}
                            <path d="M333.187,237.405c32.761-23.893,54.095-62.561,54.095-106.123C387.282,58.893,328.389,0,256,0 S124.718,58.893,124.718,131.282c0,43.562,21.333,82.23,54.095,106.123C97.373,268.57,39.385,347.531,39.385,439.795 c0,39.814,32.391,72.205,72.205,72.205H400.41c39.814,0,72.205-32.391,72.205-72.205 C472.615,347.531,414.627,268.57,333.187,237.405z M164.103,131.282c0-50.672,41.225-91.897,91.897-91.897 s91.897,41.225,91.897,91.897S306.672,223.18,256,223.18S164.103,181.954,164.103,131.282z M400.41,472.615H111.59 c-18.097,0-32.82-14.723-32.82-32.821c0-97.726,79.504-177.231,177.231-177.231s177.231,79.504,177.231,177.231 C433.231,457.892,418.508,472.615,400.41,472.615z"></path>{' '}
                          </g>{' '}
                        </g>{' '}
                      </g>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{review.title}</h3>
                    <p className="text-base md:text-lg">{review.content}</p>
                    {review.author_id == author_id ? (
                      <button
                        className="text-red-500 hover:text-red-700 text-sm border border-black rounded p-1"
                        onClick={() => handleReviewDelete(review.id)}
                      >
                        Remove
                      </button>
                    ) : null}
                  </div>
                </div>
                <hr class="mt-3" />
              </li>
            ))}
          </ul>
        ) : (
          <p class="text-sm mt-5">No reviews for this book yet.</p>
        )}
        <div className="mt-5">
          <h3 className="text-2xl font-bold mb-2">Write a review</h3>
          <div className="mb-3">
            <label
              htmlFor="reviewTitle"
              className="block font-bold mb-1 text-lg"
            >
              Title
            </label>
            <input
              type="text"
              id="reviewTitle"
              value={reviewTitle}
              onChange={handleReviewTitleChange}
              className="w-1/2 border border-gray-400 p-2 rounded text-lg"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="reviewContent"
              className="block font-bold mb-1 text-lg"
            >
              Content
            </label>
            <textarea
              id="reviewContent"
              value={reviewContent}
              onChange={handleReviewContentChange}
              className="w-1/2 border border-gray-400 p-2 rounded text-lg"
            ></textarea>
          </div>
          <button
            className="bg-white text-black hover:bg-primary hover:text-white py-2 px-4 rounded border border-black text-base md:text-lg"
            onClick={handleReviewSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </article>
  );
});

export default PDPContent;
