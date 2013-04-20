/** Local static data Services */

angular.module('i18nService', ['ngResource']).factory('I18n', function($resource){
	return $resource('i18n/:lang.json', {lang:'@lang'});
});

/** Distant data Services */

angular.module('dataService', ['ngResource']).factory('Data', function($resource){
	return $resource('data/sample.js', {}, {
		query: {
			method:'GET',
			params:{},
			isArray:false
		}
	});
});