import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { grpcClient } from '../proto/client/client';
import { Book } from '../models/Book';
import { BookWithReviews } from '../models/joint/BookWithReview';
import { Review } from '../models/Review';

const host = 'localhost';
const port = 7000;

const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result: AxiosResponse = await axios.get(
      `http://${host}:${port}/api/book`,
    );
    const books: Book[] = result.data;
    return res.status(200).json({ books });
  } catch (error) {
    console.error(error);
    return res.status(503).json({ message: 'External API not available' });
  }
};

const getBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;
    const result: AxiosResponse = await axios.get(
      `http://${host}:${port}/api/book/${id}`,
    );

    const book: Book = result.data;
    let review: Review;
    let bookWithReview: BookWithReviews;

    grpcClient.getReview(
      { id: '1e288217-354a-457a-891e-b0dfd23067e8' },
      (err, response) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ message: 'Error while getting review' });
        }
        if (!response) {
          return res.status(404).json({ message: 'Review not found' });
        }
        review = {
          id: response.review?.id,
          title: response.review?.title,
          content: response.review?.content,
          author_id: response.review?.author_id,
          book_id: response.review?.book_id,
          posted_at: response.review?.posted_at?.seconds?.toString(),
          updated_at: response.review?.updated_at?.seconds?.toString(),
        };
        bookWithReview = {
          ...book,
          review,
        };
        return res.status(200).json({ bookWithReview });
      },
    );
  } catch (error) {
    console.error(error);
    return res.status(503).json({ message: 'External API not available' });
  }
};

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
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
    } = req.body;

    const newBook: Partial<Book> = {
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
    };

    const response: AxiosResponse = await axios.post(
      `http://${host}:${port}/api/book`,
      newBook,
    );
    return res.status(200).json({ message: response.data });
  } catch (error) {
    console.error(error);
    return res.status(503).json({ message: 'External API not available' });
  }
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;
    const {
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
    } = req.body;

    const updatedFields: Partial<Book> = {
      ...(title && { title }),
      ...(author && { author }),
      ...(yearOfPublication && { yearOfPublication }),
      ...(isbn && { isbn }),
      ...(description && { description }),
      ...(genre && { genre }),
      ...(language && { language }),
      ...(rating && { rating }),
      ...(format && { format }),
      ...(price && { price }),
    };

    const response: AxiosResponse = await axios.put(
      `http://${host}:${port}/api/book/${id}`,
      updatedFields,
    );
    return res.status(200).json({ message: response.data });
  } catch (error) {
    console.error(error);
    return res.status(503).json({ message: 'External API not available' });
  }
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;
    const response: AxiosResponse = await axios.delete(
      `http://${host}:${port}/api/book/${id}`,
    );
    return res.status(200).json({ message: response.data });
  } catch (error) {
    console.error(error);
    return res.status(503).json({ message: 'External API not available' });
  }
};

export default { getBooks, getBook, createBook, updateBook, deleteBook };
