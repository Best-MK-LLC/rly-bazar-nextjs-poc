FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
COPY . .
ENV PORT 31080
EXPOSE 31080
RUN yarn build
CMD [ "yarn", "start" ]
