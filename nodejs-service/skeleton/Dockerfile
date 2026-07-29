FROM node:22-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY src ./src

ENV PORT=${{ values.port }}
EXPOSE ${{ values.port }}

USER node
CMD ["node", "src/index.js"]
