from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from .managers import UserManager


class User(AbstractUser):
    TEACHER = 'teacher'
    MANAGER = 'manager'
    ROLES = (
        (TEACHER, 'Teacher'),
        (MANAGER, 'Manager'),
    )

    objects = UserManager()
    email = models.EmailField(verbose_name='Email', blank=True, unique=True)
    patronymic = models.CharField(verbose_name='Отчество', max_length=30, blank=True)
    role = models.CharField(verbose_name='Роль', max_length=10, choices=ROLES, default=MANAGER)
    phone = models.CharField(verbose_name='Телефон', max_length=15, blank=True, null=True)
    birthday = models.DateField(verbose_name='Дата рождения', blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return '{} {} {}'.format(
            self.last_name,
            self.first_name,
            self.patronymic,
        )
