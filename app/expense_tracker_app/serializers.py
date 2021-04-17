from expense_tracker_app.models import (StatementGroup, Statement)
from rest_framework import serializers


class StatementGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatementGroup
        fields = '__all__'


class StatementUDSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statement
        fields = '__all__'


class StatementSerializerCreate(serializers.ModelSerializer):
    class Meta:
        model = Statement
        fields = '__all__'


class StatementSerializerView(StatementSerializerCreate):
    group = serializers.SerializerMethodField()

    def get_group(self, ins):
        if ins.group is not None:
            return ins.group.name
        return None
