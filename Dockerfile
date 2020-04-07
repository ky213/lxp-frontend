# => Build container
FROM node:carbon as builder
WORKDIR /frontend
COPY package.json .
#COPY package.lock .
RUN npm install
COPY . .
RUN npm run build:prod

# => Run container
FROM nginx:1.15.2-alpine

# Nginx config
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# Static build
COPY --from=builder /frontend/dist /usr/share/nginx/html/

# Default port exposure
EXPOSE 80

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./build/env.sh .
COPY ./build/.env .

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x /usr/share/nginx/html/env.sh

# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]