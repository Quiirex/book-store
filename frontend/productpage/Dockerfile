FROM node:19-alpine AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:19-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
EXPOSE 3001

CMD ["yarn", "start"]
