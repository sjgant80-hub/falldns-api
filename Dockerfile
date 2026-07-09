FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund
COPY src ./src
ENV PORT=3535 HOST=0.0.0.0
EXPOSE 3535
CMD ["node", "src/bin.js"]
