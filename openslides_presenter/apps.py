from django.apps import AppConfig

from . import (
    __description__,
    __license__,
    __url__,
    __verbose_name__,
    __version__,
)


class PresenterAppConfig(AppConfig):
    name = 'openslides_presenter'
    verbose_name = __verbose_name__
    description = __description__
    version = __version__
    license = __license__
    url = __url__
    angular_site_module = True
    angular_projector_module = False
    js_files = [
        'static/js/openslides_presenter/base.js',
        'static/js/openslides_presenter/site.js'
    ]
