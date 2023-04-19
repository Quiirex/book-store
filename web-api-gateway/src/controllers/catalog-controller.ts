import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

interface Book {
  id: string;
  title: string;
  author: string;
  yearOfPublication: number;
  isbn: string;
  description: string;
  genre: string;
  language: string;
  rating: number;
  format: string;
  price: number;
}

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
    next(error);
  }
};

const getBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;
    const result: AxiosResponse = await axios.get(
      `http://${host}:${port}/api/book/${id}`,
    );
    const book: Book = result.data;
    return res.status(200).json({ book });
  } catch (error) {
    next(error);
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
    next(error);
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
    next(error);
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
    next(error);
  }
};

export default { getBooks, getBook, createBook, updateBook, deleteBook };
