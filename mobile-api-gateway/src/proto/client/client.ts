import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from '../pb/services';

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const PROTO_FILE = '../services.proto';

const packageDef = protoLoader.loadSync(
  path.resolve(__dirname, PROTO_FILE),
  options,
);

export const proto = grpc.loadPackageDefinition(
  packageDef,
) as unknown as ProtoGrpcType;

export const grpcClient = new proto.ReviewService(
  `0.0.0.0:50051`,
  grpc.credentials.createInsecure(),
);
const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 1);
grpcClient.waitForReady(deadline, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  onClientReady();
});

function onClientReady() {
  console.log('> gRPC client is ready');
}
