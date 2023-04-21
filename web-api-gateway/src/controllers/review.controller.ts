import { Request, Response } from 'express';
import { Review } from '../models/Review';
import { grpcClient } from '../proto/client/client';
import { UpdateReviewRequest } from '../proto/pb/UpdateReviewRequest';

const getReviewsByAuthorId = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  try {
    const reviews: Review[] = await new Promise((resolve, reject) => {
      const stream = grpcClient.getReviewsByAuthorId({ author_id: id });
      const reviews: Review[] = [];
      stream.on('data', (data: Review) => {
        reviews.push(data);
      });
      stream.on('error', (error) => {
        reject(error);
      });
      stream.on('end', () => {
        resolve(reviews);
      });
    });
    return res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    return res
      .status(503)
      .json({ message: 'Fatal error / External API not available' });
  }
};

const createReview = async (req: Request, res: Response) => {
  const review: Review = req.body;
  try {
    const response = await new Promise((resolve, reject) => {
      grpcClient.createReview(review, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
    return res.status(200).json({ message: response });
  } catch (error) {
    console.error(error);
    return res
      .status(503)
      .json({ message: 'Fatal error / External API not available' });
  }
};

const updateReview = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const review: UpdateReviewRequest = req.body;
  try {
    const response = await new Promise((resolve, reject) => {
      grpcClient.updateReview({ id: id, ...review }, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
    return res.status(200).json({ message: response });
  } catch (error) {
    console.error(error);
    return res
      .status(503)
      .json({ message: 'Fatal error / External API not available' });
  }
};

const deleteReview = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  try {
    const response = await new Promise((resolve, reject) => {
      grpcClient.deleteReview({ id: id }, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
    return res.status(200).json({ message: response });
  } catch (error) {
    console.error(error);
    return res
      .status(503)
      .json({ message: 'Fatal error / External API not available' });
  }
};

export default {
  getReviewsByAuthorId,
  createReview,
  updateReview,
  deleteReview,
};
