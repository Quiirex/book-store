import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { ReviewServiceClient as _ReviewServiceClient, ReviewServiceDefinition as _ReviewServiceDefinition } from './ReviewService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  CreateReviewRequest: MessageTypeDefinition
  DeleteReviewResponse: MessageTypeDefinition
  GetReviewsByAuthorIdRequest: MessageTypeDefinition
  GetReviewsByBookIdRequest: MessageTypeDefinition
  GetReviewsRequest: MessageTypeDefinition
  Review: MessageTypeDefinition
  ReviewRequest: MessageTypeDefinition
  ReviewResponse: MessageTypeDefinition
  ReviewService: SubtypeConstructor<typeof grpc.Client, _ReviewServiceClient> & { service: _ReviewServiceDefinition }
  UpdateReviewRequest: MessageTypeDefinition
  google: {
    protobuf: {
      Timestamp: MessageTypeDefinition
    }
  }
}

