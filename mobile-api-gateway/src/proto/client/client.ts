import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from '../pb/services';
import { ReviewServiceClient } from '../pb/ReviewService';

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const PROTO_FILE = '../services.proto';

const packageDef: protoLoader.PackageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, PROTO_FILE),
  options,
);

const proto: ProtoGrpcType = grpc.loadPackageDefinition(
  packageDef,
) as unknown as ProtoGrpcType;

const grpcClient: ReviewServiceClient = new proto.ReviewService(
  `review-service:50051`,
  grpc.credentials.createInsecure(),
);

async function waitForClientReady(): Promise<void> {
  return new Promise((resolve, reject) => {
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 30);
    grpcClient.waitForReady(deadline, (err) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        onClientReady();
        resolve();
      }
    });
  });
}

async function startClient() {
  try {
    await waitForClientReady();
  } catch (err) {
    console.error(err);
  }
}

function onClientReady() {
  console.log('gRPC client is ready');
}

startClient();

export { grpcClient };
