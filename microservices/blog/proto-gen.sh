#!/bin/bash

rm -rf pb/
pnpm proto-loader-gen-types --longs=String --enums=String --defaults --keepCase --oneofs --grpcLib=@grpc/grpc-js --outDir=pb/ proto/*.proto
