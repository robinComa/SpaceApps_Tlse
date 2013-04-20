function MainCtrl ($scope, $rootScope) {

	$rootScope.map = new $rootScope.Map({lat : 40, lon : 0});
	$('#timeline').slider({
		max : 0,
		min : (new Date()).getTime(),
		step : 60*60*24,
		orientation : 'vertical',
		value : 2000,
		tooltip : 'show',
		formater : function(val){
			return (new Date(val)).getFullYear();
		}
	}).on('slide', function(ev){
		console.log(ev.value);
	});

}