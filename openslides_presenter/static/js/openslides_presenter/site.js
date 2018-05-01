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
])

.config([
	'$stateProvider',
	function($stateProvider) {
		$stateProvider.state('presenter', {
			url: '/presenter',
			templateUrl: 'static/templates/openslides_presenter/presenter.html'
		});
	}
])

.controller('PresentationCtrl', [
	'$scope',
	'$http',
	'$document',
	'$filter',
	'Projector',
	'Mediafile',
	function($scope, $http, $document, $filter, Projector, Mediafile) {
		$scope.fullscreen = false;
		$scope.mode = '';
		$scope.iframeWidth = 800;
		$scope.iframeHeight = 600;

		// Update the list with all projectors
		$scope.$watch(function () {
			return Projector.lastModified();
		}, function () {
			$scope.projectors = Projector.getAll();
			if (!$scope.controlledProjector) {
				$scope.controlledProjector = $filter('orderBy')($scope.projectors, 'id')[0];
				console.log("presenter plugin - set default to", $scope.controlledProjector.id);
			}
		});

		$scope.$watch(function() {
			return Projector.lastModified($scope.controlledProjector.id);
		}, function() {
			var projector = Projector.get($scope.controlledProjector.id);
			if (projector) {
				$scope.iframeHeight = $scope.iframeWidth * (projector.height / projector.width);
			}
		});

		$scope.setControlledProjector = function(projector) {
			console.log('presenter plugin - set active projector to', projector);
			$scope.controlledProjector = projector;
		};

		function updatePresentedMediafiles() {
			var projectorElements = _.map(Projector.get(1).elements, function(element) { return element; });
			$scope.presentedMediafiles = _.filter(projectorElements, function(element) {
				return element.name === 'mediafiles/mediafile';
			});

			var mediafile = $scope.presentedMediafiles.length ? Mediafile.get($scope.presentedMediafiles[0].id) : null;
			// Allow computed fields to resolve
			setTimeout(function() {
				if (!mediafile) {
					$scope.mode = 'none';
				} else if (mediafile.is_video) {
					$scope.mode = 'none';
				} else if (mediafile.is_image) {
					$scope.mode = 'none';
				} else if (mediafile.is_pdf || mediafile.is_presentable) {
					$scope.mode = 'pdf';
				}
			}, 0);
		}

		var pdfKeypress = function(e) {
			var mediafileElement = getCurrentlyPresentedMediafile();
			var k = e.keyCode;
			if (e.ctrlKey || e.metaKey || e.altKey) {
				return;
			}

			if ((k === 40 || k === 39 || k === 78 || k === 13 || k === 34 || k === 32) && mediafileElement.page < mediafileElement.numPages) {
				// Next slide
				// Skipping if cannot move to this slide
				sendMediafileCommand({
					page: mediafileElement.page + 1
				});
				return e.preventDefault();
			} else if ((k === 37 || k === 38 || k === 80 || k === 33) && mediafileElement.page > 1) {
				// Previous slide
				// Skipping if cannot move to this slide
				sendMediafileCommand({
					page: mediafileElement.page - 1
				});
				return e.preventDefault();
			} else if (k === 116 || k === 70) {
				// F5. (re)start presentation.
				if ($scope.fullscreen) {
					// $scope.fullscreen = false;
					console.log('presenter plugin - already fullscreen, going to page 1');
					sendMediafileCommand({
						page: 1
					});
				} else {
					$scope.fullscreen = true;
					console.log('presenter plugin - going to fullscreen');
				}
				return e.preventDefault();
			} else if (k === 27) {
				// Escape. Stop the presentation.
				console.log('presenter plugin - escape pressed, exit fullscreen?', $scope.fullscreen);
				if ($scope.fullscreen) {
					$scope.fullscreen = false;
					return e.preventDefault();
				}
			}
		};

		var sendMediafileCommand = function(data) {
			var mediafileElement = getCurrentlyPresentedMediafile();
			var updateData = _.extend({}, mediafileElement);
			_.extend(updateData, data);
			var postData = {};
			postData[mediafileElement.uuid] = updateData;
			$http.post('/rest/core/projector/1/update_elements/', postData);
		};

		$document.bind("mousedown", function(event) {
			// TODO: Go to next page if clicked on a relevant part of the page (e.g. not on a button)
		});

		$document.bind("keydown", function(event) {
			if ($scope.mode === 'pdf') {
				pdfKeypress(event);
			}
		});

		$scope.$on('$routeChangeStart', function(scope, next, current) {
			'presenter plugin - scope is being destroyed!';
		});

		$scope.$watch(function() {
			return Projector.get(1).elements;
		}, updatePresentedMediafiles);
		
		function getCurrentlyPresentedMediafile() {
			return $scope.presentedMediafiles[0];
		};

	}
]);

}());
