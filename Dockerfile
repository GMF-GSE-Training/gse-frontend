# Tahap 1: Build Aplikasi Angular
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build -- --configuration=production

# Tahap 2: Menyajikan aplikasi dengan Nginx
FROM nginx:1.25-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY docker/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist/ /usr/share/nginx/html

COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8080

CMD ["/entrypoint.sh"]