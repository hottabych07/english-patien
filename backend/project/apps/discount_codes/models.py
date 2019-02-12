from django.core import validators
from django.db import models


class DiscountCode(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=500)
    start_date = models.DateTimeField(blank=True, null=True)
    end_date = models.DateTimeField(blank=True, null=True)
    count = models.IntegerField(
        validators=[
            validators.MinValueValidator(0),
        ],
        blank=True,
        null=True,
    )
    discount = models.IntegerField(
        validators=[
            validators.MinValueValidator(0),
            validators.MaxValueValidator(100),
        ],
        blank=True,
        null=True,
    )
    learners = models.ManyToManyField(
        to='learners.Learner',
        related_name='discount_codes',
        blank=True,
    )
    code = models.CharField(max_length=50)
    status = models.CharField(max_length=50, blank=True)


    def __str__(self):
        return self.name