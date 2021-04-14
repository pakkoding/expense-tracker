from expense_tracker_app.models import (StatementGroup)
from rest_framework import serializers


class StatementGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatementGroup
        fields = '__all__'
