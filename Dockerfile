FROM node:20
WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY tsconfig.json .
COPY src src

ENTRYPOINT ["npm"]
CMD ["run", "server"]
