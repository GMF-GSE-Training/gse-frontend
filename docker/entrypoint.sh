#!/bin/sh
set -e

# Validasi environment variable
if [ -z "$API_URL" ]; then
  echo "ERROR: API_URL environment variable is required"
  exit 1
fi

# Generate config Nginx
envsubst '$API_URL' < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/default.conf

# Inject environment variables ke Angular
echo "window.__env = { API_URL: '$API_URL' };" > /usr/share/nginx/html/assets/env.js

exec nginx -g "daemon off;"