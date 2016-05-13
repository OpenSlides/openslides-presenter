from django.apps import AppConfig

from . import __description__, __verbose_name__, __version__


class PresenterAppConfig(AppConfig):
    name = 'openslides_presenter'
    verbose_name = __verbose_name__
    description = __description__
    version = __version__
    angular_site_module = True
    angular_projector_module = False
    js_files = [
        'js/openslides_presenter/base.js',
        'js/openslides_presenter/site.js']

    def ready(self):
        # Add plugin urlpatters to application configuration so OpenSlides
        # can find it.
        from .urls import urlpatterns

        self.urlpatterns = urlpatterns
