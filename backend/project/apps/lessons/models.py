from django.db import models


class Lesson(models.Model):
    EVENT = 'event'
    SESSION = 'session'
    TYPES = (
        (EVENT, 'Event'),
        (SESSION, 'Session'),
    )

    name = models.CharField(max_length=50, blank=True)
    course = models.ForeignKey(
        verbose_name='Курс',
        to='courses.Course',
        related_name='lessons',
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
    groups = models.ManyToManyField(
        verbose_name='Группы',
        blank=True,
        related_name='groups',
        to='groups.Group',
    )
    teacher = models.ForeignKey(
        verbose_name='Учитель',
        to='users.User',
        related_name='lessons',
        on_delete=models.CASCADE,
    )

    created_at = models.DateTimeField(
        verbose_name='Дата создания',
        auto_now_add=True,
    )
    start_time = models.DateTimeField(verbose_name='Время начала')
    end_time = models.DateTimeField(verbose_name='Время окончания')
    lesson_type = models.CharField(
        verbose_name='Тип занятия',
        max_length=10,
        choices=TYPES,
        default=SESSION,
    )
    location = models.CharField(
        verbose_name='Место занятия',
        max_length=24,
        blank=True,
    )
    bg_color = models.CharField(verbose_name='Цвет', max_length=24, blank=True)

    def __str__(self):
        return '{} {} ({})'.format(
            self.lesson_type,
            self.location,
            self.bg_color,
        )
