from django.core.exceptions import PermissionDenied
from django.http import HttpResponse
from django.contrib.staticfiles import finders

from openslides.utils.rest_api import GenericViewSet


class PresenterViewSet(GenericViewSet):
    """
    Improved presentation view that supports Powerpoint-like controls.
    """
    def check_view_permissions(self):
        return self.request.user.has_perm('core.can_manage_projector')
