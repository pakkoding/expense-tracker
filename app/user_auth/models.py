from django.db import models
from django.contrib.auth.models import AbstractUser


class AllUser(AbstractUser):
    username = models.CharField(max_length=30,  unique=True)

    REQUIRED_FIELDS = ['email',]

    def __str__(self):
        return f'username : {self.username}'
