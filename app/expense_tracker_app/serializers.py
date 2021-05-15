from expense_tracker_app.models import (StatementGroup, Statement, Test)
from rest_framework import serializers
from django.core import serializers as sl
import json
from django.forms.models import model_to_dict


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


class TestSaveJson(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = '__all__'

    def create(self, validated_data):
        get_d = StatementGroup.objects.get(id=2)
        dict_obj = model_to_dict(get_d)
        serialized = json.dumps(dict_obj)
        ins = Test()
        # ins.jsF = sl.serialize('json', {get_d})
        ins.jsF = serialized
        ins.save()
        print('2')
