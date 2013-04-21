/** Local static data Services */

angular.module('i18nService', ['ngResource']).factory('I18n', function($resource){
	return $resource('i18n/:lang.json', {lang:'@lang'});
});

angular.module('typeService', ['ngResource']).factory('Type', function($resource){
	return $resource('data/type.js', {}, {
		list: {method:'GET', isArray:false}
	});
});

/** Distant data Services */

var serviceUrl = 'http://www.mygeopostcard.com/earthday/:resource';
//var serviceUrl = 'data/struct_sample_scope_3.js';

angular.module('dataService', ['ngResource']).factory('Data', function($resource){
	return $resource(serviceUrl, {resource : 'area'}, {
		read: {
			method:'GET',
			params:{},
			isArray:false
		},
		create: {
			method:'POST'
		}
	});
});