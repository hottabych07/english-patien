#!/usr/bin/env bash


echo "[*] Migrate"
python3 manage.py migrate

echo "[*] Collectstatic"
python3 /project/manage.py collectstatic -c --noinput &

echo "[*] Start celery"
celery worker -l info -A project --concurrency=2 $

echo "[*] Start django"
python3 manage.py runserver 0.0.0.0:8000
