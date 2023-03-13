web: gunicorn core.wsgi
release: python manage.py collectstatic -c --noinput
release: python manage.py migrate --noinput