from rest_framework import serializers

from .models import DiscountCode


class DiscountCodeDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiscountCode
        fields = (
            'id',
            'name',
            'description',
            'start_date',
            'end_date',
            'count',
            'discount',
            'code',
            'status',
            'learners',
        )
