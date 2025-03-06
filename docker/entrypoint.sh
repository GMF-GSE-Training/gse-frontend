#!/bin/sh
set -e

echo "DEBUG: API_URL is set to: '$API_URL'"

if [ -z "$API_URL" ]; then
  echo "ERROR: API_URL environment variable is required"
  exit 1
fi

echo "window.__env = { API_URL: '$API_URL' };" > /usr/share/nginx/html/assets/env-7JDVT4U3.js
exec nginx -g "daemon off;"