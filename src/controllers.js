function HomeCtrl($rootScope, $scope, Data){
	
	$scope.date = 0;
	
	var displayGeometries = function(geometries, date, bounds){
		for(var i in response.geometries){
			var geometrie = geometries[i];
			if(geometrie.range.min <= $scope.date && $scope.date <= geometrie.range.max){
				
				if(geometrie.class == 'marker'){
					$rootScope.map.addMarker({
						coordinate : geometrie.coordinate,
						opacity : geometrie.opacity,
						onClick : function(){
							alert('Click on marker!');
						}
					});
				}else if(geometrie.class == 'polyline'){
					$rootScope.map.addPolyline({
						coordinates : geometrie.coordinates,
						opacity : geometrie.opacity,
						color : response.theme.style.color,
						onClick : function(){
							alert('Click on marker!');
						}
					});
				}else if(geometrie.class == 'polygon'){
					$rootScope.map.addPolygon({
						coordinates : geometrie.coordinates,
						opacity : geometrie.opacity,
						color : response.theme.style.color,
						onClick : function(){
							alert('Click on marker!');
						}
					});
				}
			}			
		}
	};
	
	$scope.changeDate = function(){
		$rootScope.map.clearMap();
		displayGeometries($scope.geometries, $scope.date, {});
	};
	
	var response = Data.get({}, function(){
		$scope.theme = response.theme;
		$scope.geometries = response.geometries;
		displayGeometries($scope.geometries, $scope.date, {});
	});
}