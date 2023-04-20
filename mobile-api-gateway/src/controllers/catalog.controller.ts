import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import { grpcClient } from '../proto/client/client';
import { Book } from '../models/Book';
import { BookWithReviews } from '../models/joint/BookWithReview';
import { Review } from '../models/Review';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const URL = process.env.CATALOG_SERVICE;

const getBooks = async (_req: Request, res: Response) => {
  try {
    const result: AxiosResponse = await axios.get(`${URL}/api/book`);
    const books: Book[] = result.data;
    return res.status(200).json({ books });
  } catch (error) {
    console.error(error);
    return res.status(503).json({ message: 'External API not available' });
  }
};

const getBook = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    let reviews: Review[] = [];
    const [bookResponse] = await Promise.all([
      axios.get(`${URL}/api/book/${id}`),

      new Promise((resolve, reject) => {
        const stream = grpcClient.getReviewsByBookId({ book_id: id });

        stream.on('data', (data: Review) => {
          reviews.push(data);
        });

        stream.on('end', () => {
          resolve(reviews);
        });

        stream.on('error', (err) => {
          reject(err);
        });
      }),
    ]);

    const book: Book = bookResponse.data;
    const bookWithReviews: BookWithReviews = {
      ...book,
      reviews,
    };
    return res.status(200).json({ book: bookWithReviews });
  } catch (error) {
    console.error(error);
    return res.status(503).json({ message: 'External API not available' });
  }
};

const createBook = async (req: Request, res: Response) => {
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
      `${URL}/api/book`,
      newBook,
    );
    return res.status(200).json({ message: response.data });
  } catch (error) {
    console.error(error);
    return res.status(503).json({ message: 'External API not available' });
  }
};

const updateBook = async (req: Request, res: Response) => {
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
      `${URL}/api/book/${id}`,
      updatedFields,
    );
    return res.status(200).json({ message: response.data });
  } catch (error) {
    console.error(error);
    return res.status(503).json({ message: 'External API not available' });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const response: AxiosResponse = await axios.delete(`${URL}/api/book/${id}`);
    return res.status(200).json({ message: response.data });
  } catch (error) {
    console.error(error);
    return res.status(503).json({ message: 'External API not available' });
  }
};

export default { getBooks, getBook, createBook, updateBook, deleteBook };
