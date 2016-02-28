from django.db import models
from django.utils.translation import ugettext_noop

class Clicker(models.Model):
    class Meta:
        permissions = (('can_manage_current_presentation', ugettext_noop('Can manage current presentation')),)
