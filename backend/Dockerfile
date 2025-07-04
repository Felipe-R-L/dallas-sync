FROM node:20-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
COPY --from=build /app/package.json /app/package-lock.json ./
RUN npm install --omit=dev --no-optional
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD [ "node", "dist/main.js" ]