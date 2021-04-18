from rest_framework.generics import (ListCreateAPIView, RetrieveUpdateDestroyAPIView,)
from expense_tracker_app.models import (StatementGroup, Statement)
from expense_tracker_app.serializers import (StatementGroupSerializer, StatementSerializerView,
                                             StatementUDSerializer, StatementSerializerCreate)
# from rest_framework.permissions import (IsAuthenticated)


class ManageStatementGroupCR(ListCreateAPIView):
    serializer_class = StatementGroupSerializer
    queryset = StatementGroup.objects.all()


class ManageStatementGroupUD(RetrieveUpdateDestroyAPIView):
    serializer_class = StatementGroupSerializer
    queryset = StatementGroup.objects.all()


class ManageStatementCR(ListCreateAPIView):

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return StatementSerializerView
        return StatementSerializerCreate

    def get_queryset(self):
        return Statement.objects.all()


class ManageStatementUD(RetrieveUpdateDestroyAPIView):
    serializer_class = StatementUDSerializer

    def get_queryset(self):
        return Statement.objects.all()
