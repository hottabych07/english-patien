from rest_framework import serializers

from .models import Payment


class PaymentDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = (
            'id',
            'learner',
            'comment',
            'status',
            'payment_date',
            'amount',
            'created_at',
        )
