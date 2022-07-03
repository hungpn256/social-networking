FROM node:15.13-alpine
WORKDIR /social-networking
COPY . .
RUN npm run build
CMD ["npm","start"]
