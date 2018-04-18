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
	'Projector',
	'Mediafile',
	function($scope, $http, $document, Projector, Mediafile) {
		$scope.fullscreen = false;
		$scope.mode = '';
		$scope.iframeWidth = 800;
		$scope.iframeHeight = 600;

		$scope.$watch(function() {
			return Projector.lastModified(1);
		}, function() {
			var projector = Projector.get(1);
			if (projector) {
				$scope.iframeHeight = $scope.iframeWidth * (projector.height / projector.width);
			}
		});

		function updatePresentedMediafiles() {
			var projectorElements = _.map(Projector.get(1).elements, function(element) { return element; });
			$scope.presentedMediafiles = _.filter(projectorElements, function(element) {
				return element.name === 'mediafiles/mediafile';
			});

			var mediafile = $scope.presentedMediafiles.length ? Mediafile.get($scope.presentedMediafiles[0].id) : null;
			// Allow computed fields to resolve
			setTimeout(function() {
				console.log('Loaded:', mediafile);
				if (!mediafile) {
					$scope.mode = 'none';
				} else if (mediafile.is_video) {
					$scope.mode = 'none';
				} else if (mediafile.is_image) {
					$scope.mode = 'none';
				} else if (mediafile.is_pdf || mediafile.is_presentable) {
					console.log('PDF file detected, enable presenter.');
					$scope.mode = 'pdf';
				}
			}, 0);
		}

		var pdfKeypress = function(e) {
			var mediafileElement = getCurrentlyPresentedMediafile();
			var k = e.keyCode;
			console.log('Event: ', e);
			if (e.ctrlKey || e.metaKey || e.altKey) {
				return;
			}

			if (k === 40 || k === 39 || k === 78 || k === 13 || k === 34 || k === 32) {
				// Next slide
				sendMediafileCommand({
					page: mediafileElement.page + 1
				});
				return e.preventDefault();
			} else if (k === 37 || k === 38 || k === 80 || k === 33) {
				// Previous slide
				sendMediafileCommand({
					page: mediafileElement.page - 1
				});
				return e.preventDefault();
			} else if (k === 116 || k === 70) {
				// F5. (re)start presentation.
				console.log('Fullscreen toggle', $scope.fullscreen);
				if ($scope.fullscreen) {
					// $scope.fullscreen = false;
					console.log('Already fullscreen, going to page 1');
					sendMediafileCommand({
						page: 1
					});
				} else {
					$scope.fullscreen = true;
					console.log('Going fullscreen now');
				}
				console.log('Fullscreen is now: ', $scope.fullscreen);
				return e.preventDefault();
			} else if (k === 27) {
				// Escape. Stop the presentation.
				console.log('escape pressed', $scope.fullscreen);
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
			// console.log('Postdata: ', postData);
			$http.post('/rest/core/projector/1/update_elements/', postData);
		};

		$document.bind("mousedown", function(event) {
			console.log('Mouse clicked:', event);
		});

		$document.bind("keydown", function(event) {
			console.log('Keydown', event);
			if ($scope.mode === 'pdf') {
				pdfKeypress(event);
			}
		});

		console.log('Destroy should be bound', $scope);
		$scope.$on('$routeChangeStart', function(scope, next, current) {
			'Scope is being destroyed!';
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
