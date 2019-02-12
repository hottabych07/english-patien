from django.db import models


class Course(models.Model):
    name = models.CharField(verbose_name='Название', max_length=20)
    description = models.TextField(
        verbose_name='Описание',
        max_length=300,
        blank=True,
    )

    teachers = models.ManyToManyField(
        verbose_name='Учителя',
        to='users.User',
        related_name='courses',
        blank=True,
    )

    start_date = models.DateField(verbose_name='Дата начала')
    end_date = models.DateField(verbose_name='Дата окончания')
    created_at = models.DateTimeField(
        verbose_name='Дата создания',
        auto_now_add=True,
    )
    groups = models.ManyToManyField(
        verbose_name='Группы',
        to='groups.Group',
        related_name='courses',
        blank=True,
    )

    def __str__(self):
        return self.name
