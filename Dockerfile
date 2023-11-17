FROM node:18
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3090
CMD ["node", "index.js"]