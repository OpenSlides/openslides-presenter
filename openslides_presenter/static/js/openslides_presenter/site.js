(function () {

'use strict';

angular.module('OpenSlidesApp.openslides_presenter.site', ['OpenSlidesApp.openslides_presenter'])

.config([
    'mainMenuProvider',
    'gettext',
    function (mainMenuProvider, gettext) {
        mainMenuProvider.register({
            'ui_sref': 'presenter',
            'img_class': 'television',
            'title': gettext('Presenter'),
            'weight': 1500,
            'perm': 'core.can_manage_projector',
        });
    }
]);

}());
