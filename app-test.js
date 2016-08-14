
var app = angular.module('somosportApp', ['ui.router',
 'ngLodash',
 'authModule',
 'portalModule',
 'teamModule',
 'scheduleModule',
 'rootModule',
 'userModule',
 'teamModule',
 'matchesModule',
 'standingsModule',
 'environment',
 'ngAnimate',
 'pascalprecht.translate',
 'aboutModule']);
//configuracion de angular-environment
app.config(function(envServiceProvider) {
	// set the domains and variables for each environment
	envServiceProvider.config({
		domains: {
			development: ['localhost', 'dev.local'],
			herokuDev: ['ss-competition-dev'],
			quality: ['ss-competition-qa'],
			production: ['ss-competition']
		},
		vars: {
			development: {
				apiUrl: 'http://localhost:3000/api/v1.0/'
			},
			herokuDev: {
				apiUrl: 'http://ss-core-dev/api/v1.0/'
			},
			quality: {
				apiUrl: 'https://ss-core-qa.herokuapp.com/api/v1.0/'
			},
			production: {
				apiUrl: 'https://ss-core-dev.herokuapp.com/api/v1.0/'
			}
		}
	});

	// run the environment check, so the comprobation is made
	// before controllers and services are built
	envServiceProvider.check();
});

//codigo para loading indicator
app.factory('httpInterceptor', ['$q', '$rootScope',
	function ($q, $rootScope) {
		var loadingCount = 0;
		return {
			request: function (config) {
				if(++loadingCount === 1) $rootScope.$broadcast('loading:progress');
				return config || $q.when(config);
			},
			response: function (response) {
				if(--loadingCount === 0) $rootScope.$broadcast('loading:finish');
				return response || $q.when(response);
			},
			responseError: function (response) {
				if(--loadingCount === 0) $rootScope.$broadcast('loading:finish');
				return $q.reject(response);
			}
		};
	}
]).config(['$httpProvider', function ($httpProvider) {
	$httpProvider.interceptors.push('httpInterceptor');
}]);

//==========================================================================
// Angular translate
//==========================================================================
app.config(['$translateProvider', function($translateProvider) {

	var langMap = {'en-*': 'en', 'es-*': 'es'};

	$translateProvider
		.useSanitizeValueStrategy('escape')
		.useStaticFilesLoader({prefix: 'lang/', suffix: '.json'})
		.registerAvailableLanguageKeys(['es','en'], langMap)
		// TODO: reactivate on production
		// .fallbackLanguage(['en'])
		.uniformLanguageTag('bcp47')
		.determinePreferredLanguage()
}])
