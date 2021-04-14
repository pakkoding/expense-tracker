from rest_framework.generics import (ListCreateAPIView, RetrieveUpdateDestroyAPIView,)
from expense_tracker_app.models import (StatementGroup)
from expense_tracker_app.serializers import (StatementGroupSerializer)


class ManageStatementGroupCR(ListCreateAPIView):
    # permission_classes = (IsAuthenticated,)
    serializer_class = StatementGroupSerializer

    def get_queryset(self):
        return StatementGroup.objects.all()


class ManageStatementGroupUD(RetrieveUpdateDestroyAPIView):
    # permission_classes = (IsAuthenticated,)
    serializer_class = StatementGroupSerializer

    def get_queryset(self):
        return StatementGroup.objects.all()
