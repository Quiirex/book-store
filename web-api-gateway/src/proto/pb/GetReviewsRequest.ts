// Original file: domain/proto/services.proto

import type { Long } from '@grpc/proto-loader';

export interface GetReviewsRequest {
  'page'?: (number | string | Long);
  'limit'?: (number | string | Long);
}

export interface GetReviewsRequest__Output {
  'page': (string);
  'limit': (string);
}
