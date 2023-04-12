import {
  createReviewHandler,
  deleteReviewHandler,
  findReviewHandler,
  updateReviewHandler,
} from '../application/controller/reviewController';
import {
  createReview,
  deleteReview,
  findReview,
  findUniqueReview,
  updateReview,
} from '../domain/service/reviewService';
import { describe, expect, jest } from '@jest/globals';
import * as grpc from '@grpc/grpc-js';

jest.mock('../domain/service/reviewService');
jest.mock('../infrastructure/server/util/logger');

describe('findReviewHandler', () => {
  it('returns a review when given a valid id', async () => {
    const mockFindUniqueReview = findUniqueReview as jest.MockedFunction<
      typeof findUniqueReview
    >;
    const review = {
      id: '1',
      title: 'Test',
      content: 'Test Content',
      author_id: '1',
      book_id: '1',
      created_at: new Date(),
      updated_at: new Date(),
    };
    mockFindUniqueReview.mockResolvedValueOnce(review);

    const mockSendUnaryData = jest.fn();
    const mockRequest = { request: { id: '1' } } as grpc.ServerUnaryCall<
      any,
      any
    >;

    await findReviewHandler(mockRequest, mockSendUnaryData);

    expect(mockSendUnaryData).toHaveBeenCalledWith(null, {
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
  });

  it('returns an INTERNAL error when there is an error in the service layer', async () => {
    const mockFindUniqueReview = findUniqueReview as jest.MockedFunction<
      typeof findUniqueReview
    >;
    mockFindUniqueReview.mockRejectedValueOnce(
      new Error('Database connection error'),
    );

    const mockSendUnaryData = jest.fn();
    const mockRequest = { request: { id: '1' } } as grpc.ServerUnaryCall<
      any,
      any
    >;

    await findReviewHandler(mockRequest, mockSendUnaryData);

    expect(mockSendUnaryData).toHaveBeenCalledWith(
      expect.objectContaining({
        code: grpc.status.INTERNAL,
        message: 'Database connection error',
      }),
    );
  });
});

describe('createReviewHandler', () => {
  const mockCreateReview = createReview as jest.MockedFunction<
    typeof createReview
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new review and return it', async () => {
    // Arrange
    const mockSendUnaryData = jest.fn();
    const mockRequest = {
      request: {
        title: 'Test Title',
        content: 'Test Content',
        author_id: '1',
        book_id: '1',
      },
    } as grpc.ServerUnaryCall<any, any>;

    const createdReview = {
      id: '1',
      title: 'Test Title',
      content: 'Test Content',
      author_id: '1',
      book_id: '1',
      created_at: new Date(),
      updated_at: new Date(),
    };

    mockCreateReview.mockResolvedValueOnce(createdReview);

    // Act
    await createReviewHandler(mockRequest, mockSendUnaryData);

    // Assert
    expect(mockCreateReview).toHaveBeenCalledWith({
      title: mockRequest.request.title,
      content: mockRequest.request.content,
      author_id: mockRequest.request.author_id,
      book_id: mockRequest.request.book_id,
    });

    expect(mockSendUnaryData).toHaveBeenCalledWith(null, {
      review: {
        id: createdReview.id,
        title: createdReview.title,
        content: createdReview.content,
        author_id: createdReview.author_id,
        book_id: createdReview.book_id,
        posted_at: {
          seconds: createdReview.created_at.getTime() / 1000,
        },
        updated_at: {
          seconds: createdReview.updated_at.getTime() / 1000,
        },
      },
    });

    expect(mockSendUnaryData).toHaveBeenCalledTimes(1);
  });

  it('should return an error if the review already exists', async () => {
    // Arrange
    const mockSendUnaryData = jest.fn();
    const mockRequest = {
      request: {
        title: 'Test Title',
        content: 'Test Content',
        author_id: '1',
        book_id: '1',
      },
    } as grpc.ServerUnaryCall<any, any>;

    const err = new Error('Duplicate entry');
    mockCreateReview.mockRejectedValueOnce(err);

    // Act
    await createReviewHandler(mockRequest, mockSendUnaryData);

    // Assert
    expect(mockCreateReview).toHaveBeenCalledWith({
      title: mockRequest.request.title,
      content: mockRequest.request.content,
      author_id: mockRequest.request.author_id,
      book_id: mockRequest.request.book_id,
    });

    expect(mockSendUnaryData).toHaveBeenCalledWith({
      code: grpc.status.INTERNAL,
      message: 'Duplicate entry',
    });

    expect(mockSendUnaryData).toHaveBeenCalledTimes(1);
  });
});

describe('updateReviewHandler', () => {
  it('updates a review and returns it', async () => {
    // Arrange
    const mockSendUnaryData = jest.fn();
    const mockRequest = {
      request: {
        id: '1',
        title: 'Updated Test Title',
        content: 'Updated Test Content',
        author_id: '1',
        book_id: '1',
      },
    } as grpc.ServerUnaryCall<any, any>;

    const updatedReview = {
      id: '1',
      title: 'Updated Test Title',
      content: 'Updated Test Content',
      author_id: '1',
      book_id: '1',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const mockUpdateReview = updateReview as jest.MockedFunction<
      typeof updateReview
    >;
    mockUpdateReview.mockResolvedValueOnce(updatedReview);

    // Act
    await updateReviewHandler(mockRequest, mockSendUnaryData);

    expect(mockSendUnaryData).toHaveBeenCalledTimes(1);
  });
});

describe('deleteReviewHandler', () => {
  const mockFindReview = findReview as jest.MockedFunction<typeof findReview>;
  const mockDeleteReview = deleteReview as jest.MockedFunction<
    typeof deleteReview
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete an existing review', async () => {
    // Arrange
    const mockSendUnaryData = jest.fn();
    const mockRequest = {
      request: {
        id: '1',
      },
    } as grpc.ServerUnaryCall<any, any>;

    // Act
    await deleteReviewHandler(mockRequest, mockSendUnaryData);

    // Assert
    expect(mockFindReview).toHaveBeenCalledWith({ id: mockRequest.request.id });
    expect(mockSendUnaryData).toHaveBeenCalledTimes(1);
  });
});
