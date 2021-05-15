from django.db import models
from django.contrib.postgres.fields import JSONField


class StatementGroup(models.Model):
    name = models.CharField(max_length=50, null=True, blank=True)


class Statement(models.Model):
    name = models.CharField(max_length=300, null=True, blank=True)
    datetime = models.DateTimeField()
    type = models.CharField(max_length=30, null=True, blank=True)
    group = models.ForeignKey(StatementGroup, null=True, blank=True, on_delete=models.SET_NULL)
    amount = models.DecimalField(decimal_places=2, max_digits=10, blank=True, null=True)


class Test(models.Model):
    jsF = JSONField(blank=True, null=True)
