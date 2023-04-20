// Original file: domain/proto/services.proto

import type { Long } from '@grpc/proto-loader';

export interface GetReviewsByBookIdRequest {
  'book_id'?: (string);
  'page'?: (number | string | Long);
  'limit'?: (number | string | Long);
}

export interface GetReviewsByBookIdRequest__Output {
  'book_id': (string);
  'page': (string);
  'limit': (string);
}
