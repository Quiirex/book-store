// Original file: domain/proto/services.proto

import type { Timestamp as _google_protobuf_Timestamp, Timestamp__Output as _google_protobuf_Timestamp__Output } from './google/protobuf/Timestamp';

export interface Review {
  'id'?: (string);
  'title'?: (string);
  'content'?: (string);
  'author_id'?: (string);
  'book_id'?: (string);
  'posted_at'?: (_google_protobuf_Timestamp | null);
  'updated_at'?: (_google_protobuf_Timestamp | null);
}

export interface Review__Output {
  'id': (string);
  'title': (string);
  'content': (string);
  'author_id': (string);
  'book_id': (string);
  'posted_at': (_google_protobuf_Timestamp__Output | null);
  'updated_at': (_google_protobuf_Timestamp__Output | null);
}
