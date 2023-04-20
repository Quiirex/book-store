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
  console.log('? gRPC client is ready');
}
// client.createAccount(
//   {
//     id: MUUID.v4().toString(),
//     name: 'John',
//     surname: 'Doe',
//     username: 'johndoe',
//     email: 'john.doe@gmail.com',
//     password: 'password',
//     age: 20,
//   },
//   (error: any, user: any) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log(user);
//     }
//   },
// );

// client.getAccounts({}, (error: any, user: any) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(user);
//   }
// });

// client.updateAccount(
//   {
//     id: '48bc5e02-61b4-4b5b-80d5-082c5d632ace',
//     name: 'John',
//     surname: 'Doe',
//     username: 'johndoe',
//     password: 'password123',
//     email: 'snekay@gmail.com',
//   },
//   (error: any, status: any) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log(status);
//     }
//   },
// );

// client.deleteAccount(
//   {
//     id: 'bcbf17b2-8c40-4e67-915c-9db7f1858ecb',
//   },
//   (error: any, status: any) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log(status);
//     }
//   },
// );
