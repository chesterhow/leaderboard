#!/bin/bash

BUILD_IMG="leaderboard-build-img"
BUILD_CONT="leaderboard-build-cont"

docker build -t $BUILD_IMG -f Dockerfile.build .
docker create --name $BUILD_CONT $BUILD_IMG
docker cp $BUILD_CONT:/home/output ./
docker rm $BUILD_CONT
docker rmi $BUILD_IMG
