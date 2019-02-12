from django.db import models


class Learner(models.Model):
    first_name = models.CharField(
        verbose_name='Имя',
        max_length=32,
    )
    last_name = models.CharField(
        verbose_name='Фамилия',
        max_length=32,
        blank=True,
    )
    patronymic = models.CharField(
        verbose_name='Отчество',
        max_length=32,
        blank=True,
    )
    phone = models.CharField(
        verbose_name='Телефон',
        max_length=15,
        blank=True,
    )
    email = models.EmailField(
        verbose_name='Email',
        blank=True,
    )
    birthday = models.DateField(
        verbose_name='Дата рождения',
        blank=True,
        null=True,
    )

    def __str__(self):
        return '{} {} {}'.format(
            self.last_name,
            self.first_name,
            self.patronymic,
        )
