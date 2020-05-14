FROM node:latest as builder
LABEL maintainer="vwangsf@gmail.com"

ENV BIBSERVERURL="https://api.bibify.org"

COPY . /bibify
WORKDIR /bibify

RUN npm i
RUN npm run build

FROM nginx:latest
COPY --from=builder /bibify/build /usr/share/nginx/html
