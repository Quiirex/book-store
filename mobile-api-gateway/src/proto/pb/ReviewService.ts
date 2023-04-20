// Original file: domain/proto/services.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateReviewRequest as _CreateReviewRequest, CreateReviewRequest__Output as _CreateReviewRequest__Output } from './CreateReviewRequest';
import type { DeleteReviewResponse as _DeleteReviewResponse, DeleteReviewResponse__Output as _DeleteReviewResponse__Output } from './DeleteReviewResponse';
import type { GetReviewsByAuthorIdRequest as _GetReviewsByAuthorIdRequest, GetReviewsByAuthorIdRequest__Output as _GetReviewsByAuthorIdRequest__Output } from './GetReviewsByAuthorIdRequest';
import type { GetReviewsByBookIdRequest as _GetReviewsByBookIdRequest, GetReviewsByBookIdRequest__Output as _GetReviewsByBookIdRequest__Output } from './GetReviewsByBookIdRequest';
import type { GetReviewsRequest as _GetReviewsRequest, GetReviewsRequest__Output as _GetReviewsRequest__Output } from './GetReviewsRequest';
import type { Review as _Review, Review__Output as _Review__Output } from './Review';
import type { ReviewRequest as _ReviewRequest, ReviewRequest__Output as _ReviewRequest__Output } from './ReviewRequest';
import type { ReviewResponse as _ReviewResponse, ReviewResponse__Output as _ReviewResponse__Output } from './ReviewResponse';
import type { UpdateReviewRequest as _UpdateReviewRequest, UpdateReviewRequest__Output as _UpdateReviewRequest__Output } from './UpdateReviewRequest';

export interface ReviewServiceClient extends grpc.Client {
  CreateReview(argument: _CreateReviewRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ReviewResponse__Output>): grpc.ClientUnaryCall;
  CreateReview(argument: _CreateReviewRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ReviewResponse__Output>): grpc.ClientUnaryCall;
  CreateReview(argument: _CreateReviewRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ReviewResponse__Output>): grpc.ClientUnaryCall;
  CreateReview(argument: _CreateReviewRequest, callback: grpc.requestCallback<_ReviewResponse__Output>): grpc.ClientUnaryCall;
  createReview(argument: _CreateReviewRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ReviewResponse__Output>): grpc.ClientUnaryCall;
  createReview(argument: _CreateReviewRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ReviewResponse__Output>): grpc.ClientUnaryCall;
  createReview(argument: _CreateReviewRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ReviewResponse__Output>): grpc.ClientUnaryCall;
  createReview(argument: _CreateReviewRequest, callback: grpc.requestCallback<_ReviewResponse__Output>): grpc.ClientUnaryCall;
  
  DeleteReview(argument: _ReviewRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_DeleteReviewResponse__Output>): grpc.ClientUnaryCall;
  DeleteReview(argument: _ReviewRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_DeleteReviewResponse__Output>): grpc.ClientUnaryCall;
  DeleteReview(argument: _ReviewRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_DeleteReviewResponse__Output>): grpc.ClientUnaryCall;
  DeleteReview(argument: _ReviewRequest, callback: grpc.requestCallback<_DeleteReviewResponse__Output>): grpc.ClientUnaryCall;
  deleteReview(argument: _ReviewRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_DeleteReviewResponse__Output>): grpc.ClientUnaryCall;
  deleteReview(argument: _ReviewRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_DeleteReviewResponse__Output>): grpc.ClientUnaryCall;
  deleteReview(argument: _ReviewRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_DeleteReviewResponse__Output>): grpc.ClientUnaryCall;
  deleteReview(argument: _ReviewRequest, callback: grpc.requestCallback<_DeleteReviewResponse__Output>): grpc.ClientUnaryCall;
  
  GetReview(argument: _ReviewRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ReviewResponse__Output>): grpc.ClientUnaryCall;
  GetReview(argument: _ReviewRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ReviewResponse__Output>): grpc.ClientUnaryCall;
  GetReview(argument: _ReviewRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ReviewResponse__Output>): grpc.ClientUnaryCall;
  GetReview(argument: _ReviewRequest, callback: grpc.requestCallback<_ReviewResponse__Output>): grpc.ClientUnaryCall;
  getReview(argument: _ReviewRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ReviewResponse__Output>): grpc.ClientUnaryCall;
  getReview(argument: _ReviewRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ReviewResponse__Output>): grpc.ClientUnaryCall;
  getReview(argument: _ReviewRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ReviewResponse__Output>): grpc.ClientUnaryCall;
  getReview(argument: _ReviewRequest, callback: grpc.requestCallback<_ReviewResponse__Output>): grpc.ClientUnaryCall;
  
  GetReviews(argument: _GetReviewsRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_Review__Output>;
  GetReviews(argument: _GetReviewsRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_Review__Output>;
  getReviews(argument: _GetReviewsRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_Review__Output>;
  getReviews(argument: _GetReviewsRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_Review__Output>;
  
  GetReviewsByAuthorId(argument: _GetReviewsByAuthorIdRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_Review__Output>;
  GetReviewsByAuthorId(argument: _GetReviewsByAuthorIdRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_Review__Output>;
  getReviewsByAuthorId(argument: _GetReviewsByAuthorIdRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_Review__Output>;
  getReviewsByAuthorId(argument: _GetReviewsByAuthorIdRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_Review__Output>;
  
  GetReviewsByBookId(argument: _GetReviewsByBookIdRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_Review__Output>;
  GetReviewsByBookId(argument: _GetReviewsByBookIdRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_Review__Output>;
  getReviewsByBookId(argument: _GetReviewsByBookIdRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_Review__Output>;
  getReviewsByBookId(argument: _GetReviewsByBookIdRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_Review__Output>;
  
  UpdateReview(argument: _UpdateReviewRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ReviewResponse__Output>): grpc.ClientUnaryCall;
  UpdateReview(argument: _UpdateReviewRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ReviewResponse__Output>): grpc.ClientUnaryCall;
  UpdateReview(argument: _UpdateReviewRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ReviewResponse__Output>): grpc.ClientUnaryCall;
  UpdateReview(argument: _UpdateReviewRequest, callback: grpc.requestCallback<_ReviewResponse__Output>): grpc.ClientUnaryCall;
  updateReview(argument: _UpdateReviewRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ReviewResponse__Output>): grpc.ClientUnaryCall;
  updateReview(argument: _UpdateReviewRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ReviewResponse__Output>): grpc.ClientUnaryCall;
  updateReview(argument: _UpdateReviewRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ReviewResponse__Output>): grpc.ClientUnaryCall;
  updateReview(argument: _UpdateReviewRequest, callback: grpc.requestCallback<_ReviewResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface ReviewServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateReview: grpc.handleUnaryCall<_CreateReviewRequest__Output, _ReviewResponse>;
  
  DeleteReview: grpc.handleUnaryCall<_ReviewRequest__Output, _DeleteReviewResponse>;
  
  GetReview: grpc.handleUnaryCall<_ReviewRequest__Output, _ReviewResponse>;
  
  GetReviews: grpc.handleServerStreamingCall<_GetReviewsRequest__Output, _Review>;
  
  GetReviewsByAuthorId: grpc.handleServerStreamingCall<_GetReviewsByAuthorIdRequest__Output, _Review>;
  
  GetReviewsByBookId: grpc.handleServerStreamingCall<_GetReviewsByBookIdRequest__Output, _Review>;
  
  UpdateReview: grpc.handleUnaryCall<_UpdateReviewRequest__Output, _ReviewResponse>;
  
}

export interface ReviewServiceDefinition extends grpc.ServiceDefinition {
  CreateReview: MethodDefinition<_CreateReviewRequest, _ReviewResponse, _CreateReviewRequest__Output, _ReviewResponse__Output>
  DeleteReview: MethodDefinition<_ReviewRequest, _DeleteReviewResponse, _ReviewRequest__Output, _DeleteReviewResponse__Output>
  GetReview: MethodDefinition<_ReviewRequest, _ReviewResponse, _ReviewRequest__Output, _ReviewResponse__Output>
  GetReviews: MethodDefinition<_GetReviewsRequest, _Review, _GetReviewsRequest__Output, _Review__Output>
  GetReviewsByAuthorId: MethodDefinition<_GetReviewsByAuthorIdRequest, _Review, _GetReviewsByAuthorIdRequest__Output, _Review__Output>
  GetReviewsByBookId: MethodDefinition<_GetReviewsByBookIdRequest, _Review, _GetReviewsByBookIdRequest__Output, _Review__Output>
  UpdateReview: MethodDefinition<_UpdateReviewRequest, _ReviewResponse, _UpdateReviewRequest__Output, _ReviewResponse__Output>
}
