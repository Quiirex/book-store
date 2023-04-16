import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from '../pb/services';
import customConfig from './config/default';
import {
  createReviewHandler,
  deleteReviewHandler,
  findAllReviewsHandler,
  findReviewHandler,
  updateReviewHandler,
} from '../../application/controller/reviewController';
import { ReviewServiceHandlers } from '../pb/ReviewService';
import connectToDatabase from './util/prisma';

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const { port } = customConfig;
const PROTO_FILE = '../../domain/proto/services.proto';
const packageDef = protoLoader.loadSync(
  path.resolve(__dirname, PROTO_FILE),
  options,
);

const proto = grpc.loadPackageDefinition(
  packageDef,
) as unknown as ProtoGrpcType;

const server = new grpc.Server();

server.addService(proto.ReviewService.service, {
  CreateReview: (req, res) => createReviewHandler(req, res),
  UpdateReview: (req, res) => updateReviewHandler(req, res),
  DeleteReview: (req, res) => deleteReviewHandler(req, res),
  GetReview: (req, res) => findReviewHandler(req, res),
  GetReviews: (call) => findAllReviewsHandler(call),
} as ReviewServiceHandlers);

server.bindAsync(
  `0.0.0.0:${port}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error(err);
      return;
    }
    server.start();
    connectToDatabase();
    console.log(
      `> Review service gRPC server listening on 'grpc://0.0.0.0:${port}'`,
    );
  },
);
