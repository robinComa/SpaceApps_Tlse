function HomeCtrl($rootScope, $scope, Data){
	
	var response = Data.get({}, function(){
		
		var dataToOpacity = function(data){
			return data/100;
		};
				
		$scope.changeDate = function(){
			console.log(this);
		};
		
		for(var i in response.markers){
			var marker = response.markers[i];
			$rootScope.map.addMarker({
				coordinates : marker.coordinates,
				opacity : dataToOpacity(marker.data),
				onClick : function(){
					alert(JSON.stringify(marker.data));
				}
			});
		}		
	});
}