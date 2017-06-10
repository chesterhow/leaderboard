FROM node:6.10-alpine

# Install dependencies for meteor
RUN apk add --update \
    python \
    g++ \
    make && \
    rm -rf /var/cache/apk/*

COPY ./output/leaderboard.tar.gz /app/
RUN cd /app && \
    tar -xf leaderboard.tar.gz && \
    rm leaderboard.tar.gz

WORKDIR /app/bundle
RUN cd programs/server && npm install

EXPOSE 3000
