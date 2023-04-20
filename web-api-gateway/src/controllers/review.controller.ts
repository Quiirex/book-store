import { Request, Response } from 'express';
import { Review } from '../models/Review';
import { grpcClient } from '../proto/client/client';

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
    return res.status(503).json({ message: 'External API not available' });
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
    return res.status(503).json({ message: 'External API not available' });
  }
};

export default { getReviewsByAuthorId, deleteReview };
