from django.conf.urls import patterns, url

from . import views

urlpatterns = patterns(
        '',
        url(r'^clicker/$',
            views.ClickerView.as_view(),
            name="openslides_clicker"
        ),
    )
