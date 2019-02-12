from fabric.api import local


def makemigrations():
    return local(
        'docker-compose run --rm django '
        'python3 /project/manage.py makemigrations'
    )


def migrate():
    """Прогон миграций."""
    return local(
        'docker-compose run --rm django '
        'python3 /project/manage.py migrate'
    )


def shell():
    """Запуск shell"""
    return local(
        'docker-compose run --rm django '
        'python3 /project/manage.py shell_plus --quiet-load'
    )


def shellsql():
    """Запуск shell"""
    return local(
        'docker-compose run --rm django '
        'python3 /project/manage.py shell_plus --print-sql --quiet-load'
    )


def createsuperuser():
    """Создание суперпользователя."""
    return local(
        'docker-compose run --rm django '
        'python3 /project/manage.py createsuperuser'
    )
