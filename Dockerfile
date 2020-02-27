FROM node:latest as builder
LABEL maintainer="vwangsf@gmail.com"

COPY . /bibify
WORKDIR /bibify

RUN npm i
RUN sed -i 's+http://localhost:8000+http://bibserver.matthew-cloud.com:8080+g' config.json
RUN npm run build

FROM nginx:latest
COPY --from=builder /bibify/build /usr/share/nginx/html