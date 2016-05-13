from django.core.exceptions import PermissionDenied

from openslides.utils.views import View


class PresenterView(View):
    """
    Improved presentation view that supports Powerpoint-like controls.
    """
