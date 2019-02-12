from django.db import models


class Group(models.Model):
    name = models.CharField(
        verbose_name='Название',
        max_length=30,
        blank=False,
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    learners = models.ManyToManyField(
        verbose_name='Ученики',
        to='learners.Learner',
        related_name='learners',
        blank=True,
    )

    def __str__(self):
        return self.name
