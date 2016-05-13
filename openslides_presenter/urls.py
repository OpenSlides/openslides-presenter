from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^presenter/$',
        views.PresenterView.as_view(),
        name='presenter'),
]
