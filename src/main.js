function MainCtrl ($scope, $rootScope, Type, Data) {

	$rootScope.types = Type.list();	
	$rootScope.data = Data.get();
	$rootScope.currentTime = (new Date()).getTime();
	
}