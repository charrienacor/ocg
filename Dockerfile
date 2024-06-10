FROM node:21-alpine AS build

WORKDIR .
COPY package*.json .
RUN npm ci
COPY . 
RUN npm run build
RUN npm prune --production

FROM node:21-alpine AS run

WORKDIR /app
COPY --from=build /package.json ./package.json
COPY --from=build /build ./build
COPY --from=build /node_modules ./node_modules
CMD [ "node", "build" ]

EXPOSE 3000
