FROM node:16.17 as build

# install simple http server for serving static
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install \
  npm update \
  npm audit fix --force

# copy project files and folders to the current working directory
COPY . .


RUN npm run build

EXPOSE 8080

CMD [ "http-server", "dist" ]
