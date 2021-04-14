from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from user_auth.models import (AllUser)


class User(UserAdmin):
    model = AllUser
    list_display = ['username', ]


admin.site.register(AllUser, User)
