# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build -- --configuration=production

# Stage 2: Runtime
FROM nginx:1.25-alpine

# Copy config
COPY docker/nginx/nginx.conf.template /etc/nginx/conf.d/
COPY docker/entrypoint.sh /entrypoint.sh

# Copy build hasil
COPY --from=builder /app/dist/frontend /usr/share/nginx/html

# Permission
RUN chmod +x /entrypoint.sh

EXPOSE 8080
CMD ["/entrypoint.sh"]