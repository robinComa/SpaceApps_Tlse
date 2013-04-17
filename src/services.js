/** Local static data Services */

angular.module('i18nService', ['ngResource']).factory('I18n', function($resource){
	return $resource('i18n/:lang.json', {lang:'@lang'});
});

/** Distant data Services */

//TODO