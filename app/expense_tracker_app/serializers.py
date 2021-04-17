from expense_tracker_app.models import (StatementGroup, Statement)
from rest_framework import serializers


class StatementGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatementGroup
        fields = '__all__'


class StatementSerializer(serializers.ModelSerializer):
    group = serializers.SerializerMethodField()

    def get_group(self, ins):
        if ins.group is not None:
            return ins.group.name
        return None

    class Meta:
        model = Statement
        fields = '__all__'
