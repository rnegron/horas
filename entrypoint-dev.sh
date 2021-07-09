#!/usr/bin/env bash

set -euo pipefail

postgres_ready(){
python manage.py shell << END
import sys
import psycopg2
from django.db import connections
try:
    connections['default'].cursor()
except psycopg2.OperationalError:
    sys.exit(-1)
sys.exit(0)
END
}

if [ "$1" = 'serve' ]; then
  until postgres_ready; do
    >&2 echo "==> Waiting for Postgres..."
    sleep 1
  done

  echo "==> Collecting static filles..."
  python manage.py collectstatic --noinput

  echo "==> Running migrations..."
  python manage.py migrate

  echo "==> Loading initial data..."
  python manage.py loaddata apps/profiles/fixtures/admin.json

  echo "==> Running web dev server..."
  python manage.py runserver 0.0.0.0:8000
else
  exec "$@"
fi


