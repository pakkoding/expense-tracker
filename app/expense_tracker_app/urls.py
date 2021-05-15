from django.urls import path
from . import views

app_name = 'expense_tracker_app'
urlpatterns = [
    path('statement/group/', views.ManageStatementGroupCR.as_view(), name="statement-group-create-view"),
    path('statement/group/<str:pk>/', views.ManageStatementGroupUD.as_view(), name="statement-group-update-delete"),
    path('statement/', views.ManageStatementCR.as_view(), name="statement-view-create-read"),
    path('statement/<str:pk>/', views.ManageStatementUD.as_view(), name="statement-update-delete"),
    path('test/', views.TestSaveJsons.as_view(), name="test"),
]
