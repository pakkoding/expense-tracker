from django.db import models


class Statement(models.Model):
    name = models.CharField(max_length=300, null=True, blank=True)
    datetime = models.DateTimeField()
    type = models.CharField(max_length=30, null=True, blank=True)
    group = models.CharField(max_length=50, null=True, blank=True)
    amount = models.DecimalField(decimal_places=2, max_digits=10, blank=True, null=True)


class StatementGroup(models.Model):
    name = models.CharField(max_length=50)
