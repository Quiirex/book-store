// Original file: domain/proto/services.proto

import type { Long } from '@grpc/proto-loader';

export interface GetReviewsByAuthorIdRequest {
  'author_id'?: (string);
  'page'?: (number | string | Long);
  'limit'?: (number | string | Long);
}

export interface GetReviewsByAuthorIdRequest__Output {
  'author_id': (string);
  'page': (string);
  'limit': (string);
}
