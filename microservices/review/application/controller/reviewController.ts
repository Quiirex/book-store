import * as grpc from '@grpc/grpc-js';
import {
  createReview,
  deleteReview,
  findAllReviews,
  findReview,
  findUniqueReview,
  updateReview,
} from '../../domain/service/reviewService';
import { ReviewResponse } from '../../infrastructure/pb/ReviewResponse';
import { CreateReviewRequest__Output } from '../../infrastructure/pb/CreateReviewRequest';
import { UpdateReviewRequest__Output } from '../../infrastructure/pb/UpdateReviewRequest';
import { ReviewRequest__Output } from '../../infrastructure/pb/ReviewRequest';
import { DeleteReviewResponse } from '../../infrastructure/pb/DeleteReviewResponse';
import { GetReviewsRequest__Output } from '../../infrastructure/pb/GetReviewsRequest';
import { Review } from '../../infrastructure/pb/Review';

export const findAllReviewsHandler = async (
  call: grpc.ServerWritableStream<GetReviewsRequest__Output, Review>,
) => {
  try {
    const { page, limit } = call.request;
    const reviews = await findAllReviews({
      page: parseInt(page),
      limit: parseInt(limit),
    });

    for (let i = 0; i < reviews.length; i++) {
      const review = reviews[i];
      call.write({
        id: review.id,
        title: review.title,
        content: review.content,
        author_id: review.author_id,
        book_id: review.book_id,
        posted_at: {
          seconds: review.created_at.getTime() / 1000,
        },
        updated_at: {
          seconds: review.updated_at.getTime() / 1000,
        },
      });
    }
    call.end();
  } catch (error: any) {
    console.log(error);
  }
};

export const findReviewHandler = async (
  req: grpc.ServerUnaryCall<ReviewRequest__Output, ReviewResponse>,
  res: grpc.sendUnaryData<ReviewResponse>,
) => {
  try {
    const review = await findUniqueReview({ id: req.request.id });

    if (!review) {
      res({
        code: grpc.status.NOT_FOUND,
        message: 'No review with that ID exists',
      });
      return;
    }

    res(null, {
      review: {
        id: review.id,
        title: review.title,
        content: review.content,
        author_id: review.author_id,
        book_id: review.book_id,
        posted_at: {
          seconds: review.created_at.getTime() / 1000,
        },
        updated_at: {
          seconds: review.updated_at.getTime() / 1000,
        },
      },
    });
  } catch (err: any) {
    res({
      code: grpc.status.INTERNAL,
      message: err.message,
    });
  }
};

export const createReviewHandler = async (
  req: grpc.ServerUnaryCall<CreateReviewRequest__Output, ReviewResponse>,
  res: grpc.sendUnaryData<ReviewResponse>,
) => {
  try {
    const review = await createReview({
      title: req.request.title,
      content: req.request.content,
      author_id: req.request.author_id,
      book_id: req.request.book_id,
    });

    res(null, {
      review: {
        id: review.id,
        title: review.title,
        content: review.content,
        author_id: review.author_id,
        book_id: review.book_id,
        posted_at: {
          seconds: review.created_at.getTime() / 1000,
        },
        updated_at: {
          seconds: review.updated_at.getTime() / 1000,
        },
      },
    });
  } catch (err: any) {
    if (err.code === 'P2002') {
      res({
        code: grpc.status.ALREADY_EXISTS,
        message: 'Review with that title already exists',
      });
    }
    res({
      code: grpc.status.INTERNAL,
      message: err.message,
    });
  }
};

export const updateReviewHandler = async (
  req: grpc.ServerUnaryCall<UpdateReviewRequest__Output, ReviewResponse>,
  res: grpc.sendUnaryData<ReviewResponse>,
) => {
  try {
    const reviewExists = await findReview({ id: req.request.id });

    if (!reviewExists) {
      res({
        code: grpc.status.NOT_FOUND,
        message: 'No review with that ID exists',
      });
      return;
    }
    const updatedReview = await updateReview(
      { id: req.request.id },
      {
        title: req.request.title,
        content: req.request.content,
        author_id: req.request.author_id,
        book_id: req.request.book_id,
      },
    );

    res(null, {
      review: {
        id: updatedReview.id,
        title: updatedReview.title,
        content: updatedReview.content,
        author_id: updatedReview.author_id,
        book_id: updatedReview.book_id,
        posted_at: {
          seconds: updatedReview.created_at.getTime() / 1000,
        },
        updated_at: {
          seconds: updatedReview.updated_at.getTime() / 1000,
        },
      },
    });
  } catch (err: any) {
    res({
      code: grpc.status.INTERNAL,
      message: err.message,
    });
  }
};

export const deleteReviewHandler = async (
  req: grpc.ServerUnaryCall<ReviewRequest__Output, DeleteReviewResponse>,
  res: grpc.sendUnaryData<DeleteReviewResponse>,
) => {
  try {
    const reviewExists = await findReview({ id: req.request.id });

    if (!reviewExists) {
      res({
        code: grpc.status.NOT_FOUND,
        message: 'No review with that ID exists',
      });
      return;
    }

    const review = await deleteReview({ id: req.request.id });

    if (!review) {
      res({
        code: grpc.status.NOT_FOUND,
        message: 'No review with that ID exists',
      });
      return;
    }

    res(null, {
      success: true,
    });
  } catch (err: any) {
    res({
      code: grpc.status.INTERNAL,
      message: err.message,
    });
  }
};
