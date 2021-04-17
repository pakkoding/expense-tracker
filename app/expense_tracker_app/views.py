from rest_framework.generics import (ListCreateAPIView, RetrieveUpdateDestroyAPIView,)
from expense_tracker_app.models import (StatementGroup, Statement)
from expense_tracker_app.serializers import (StatementGroupSerializer, StatementSerializer, StatementUDSerializer)
# from rest_framework.permissions import (IsAuthenticated)


class ManageStatementGroupCR(ListCreateAPIView):
    serializer_class = StatementGroupSerializer

    def get_queryset(self):
        return StatementGroup.objects.all()


class ManageStatementGroupUD(RetrieveUpdateDestroyAPIView):
    serializer_class = StatementGroupSerializer

    def get_queryset(self):
        return StatementGroup.objects.all()


class ManageStatementCR(ListCreateAPIView):
    serializer_class = StatementSerializer

    def get_queryset(self):
        return Statement.objects.all()


class ManageStatementUD(RetrieveUpdateDestroyAPIView):
    serializer_class = StatementUDSerializer

    def get_queryset(self):
        return Statement.objects.all()
