from openslides.utils.main_menu import MainMenuEntry

class OpenslidesClickerPluginMainMenuEntry(MainMenuEntry):
    """
    Main menu entry for OpenSlides Clicker Plugin.
    """
    verbose_name = 'PDF Remote'
    required_permission = 'core.can_manage_projector'
    default_weight = 100
    pattern_name = 'openslides_clicker'
    icon_css_class = 'icon-hand-up'
    stylesheets = 'styles/clicker.css'
