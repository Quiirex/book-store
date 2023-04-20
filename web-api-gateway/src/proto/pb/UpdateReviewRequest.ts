// Original file: domain/proto/services.proto


export interface UpdateReviewRequest {
  'id'?: (string);
  'title'?: (string);
  'content'?: (string);
  'author_id'?: (string);
  'book_id'?: (string);
  '_title'?: "title";
  '_content'?: "content";
  '_author_id'?: "author_id";
  '_book_id'?: "book_id";
}

export interface UpdateReviewRequest__Output {
  'id': (string);
  'title'?: (string);
  'content'?: (string);
  'author_id'?: (string);
  'book_id'?: (string);
  '_title': "title";
  '_content': "content";
  '_author_id': "author_id";
  '_book_id': "book_id";
}
