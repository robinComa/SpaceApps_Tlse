/** Local static data Services */

angular.module('i18nService', ['ngResource']).factory('I18n', function($resource){
	return $resource('i18n/:lang.json', {lang:'@lang'});
});

/** Distant data Services */

var serviceUrl = 'http://www.mygeopostcard.com/earthday/:resource';
//var serviceUrl = 'data/struct_sample_scope_1.js';

angular.module('dataService', ['ngResource']).factory('Data', function($resource){
	return $resource(serviceUrl, {resource : 'markers'}, {
		query: {
			method:'GET',
			params:{},
			isArray:false
		}
	});
});