#!/bin/sh
set -e

# Validasi bahwa environment variable API_URL telah diset
if [ -z "$API_URL" ]; then
  echo "ERROR: API_URL environment variable is required"
  exit 1
fi

# Envsubst ganti $API_URL ke Nginx
envsubst '$API_URL' < /etc/nginx/nginx.conf > /etc/nginx/nginx.conf

# Inject ke env.js
echo "window.__env = { API_URL: '$API_URL' };" > /usr/share/nginx/html/assets/env.js

# Jalankan Nginx di foreground
exec nginx -g "daemon off;"