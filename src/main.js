function MainCtrl ($scope, $rootScope, Type, Data) {

	$rootScope.types = Type.list();	
	$rootScope.data = Data.read();
	$rootScope.currentTime = (new Date()).getTime();
	$rootScope.showSubmitNewAreaFormStatus = false;
	$rootScope.showSubmitNewAreaForm = function(){
		$rootScope.showSubmitNewAreaFormStatus = true;
	};
		
}