from django.db import models


class Payment(models.Model):
    learner = models.ForeignKey(
        to='learners.Learner',
        related_name='payments',
        on_delete=models.CASCADE,
    )
    comment = models.TextField(blank=True)
    status = models.CharField(
        max_length=10,
        blank=True,
    )
    payment_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    amount = models.DecimalField(max_digits=9, decimal_places=2, default='0.0')


    def __str__(self):
        return 'Payment ({})'.format(
            self.status,
        )  
