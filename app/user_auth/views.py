from __future__ import absolute_import, unicode_literals
from django.contrib.auth import logout
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
import logging

LOOKBACK_PRD = 10
logger = logging.getLogger(__name__)


class AuthView(APIView):
    # https://www.django-rest-framework.org/api-guide/permissions/
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = {
            'id': request.user.id,
            'username': request.user.username,
            'first_name': request.user.first_name,
            'last_name': request.user.last_name
        }
        return Response(content)

    def delete(self, request):
        logout(request)
        return Response({})


def logout_view(request):
    logout(request)
    return JsonResponse({})
