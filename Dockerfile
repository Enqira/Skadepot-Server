FROM node:12.18.4
WORKDIR /cloudpack
COPY package.json /cloudpack
RUN npm install
COPY . /cloudpack
CMD ["npm", "start"]