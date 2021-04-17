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

    # def update(self, instance, validated_data):
    #     # if validated_data['type'] is not None:
    #     #     validated_data['type'] = int(validated_data['type'])
    #     instance.save()
    #     return instance


class StatementUDSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statement
        fields = '__all__'
