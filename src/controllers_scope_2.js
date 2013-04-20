function HomeCtrl($rootScope, $scope, Data){
	
	var response = Data.get({}, function(){
		var dataToOpacity = function(type, data){
			var min = $rootScope.types[type].unity.range.min;
			var max = $rootScope.types[type].unity.range.max;
			if(data >= max){
				return max;
			}
			if(data <= min){
				return min
			}
			return (data-min) / (max - min);
		};
				
		$scope.changeDate = function(){
			console.log(this);
		};
		for(var i in response.areas){
			var area = response.areas[i];
			
			var isMarker = area.points.length == 1;
			var isPolyline = area.points.length == 2;
			var isPolygon = area.points.length >= 2;
									
			if(isMarker){
				
			}else if(isPolyline){
				
			}else if(isPolygon){
				$rootScope.map.addPolygon({
					points : area.points,
					color : $rootScope.types[area.type].color,
					opacity : dataToOpacity(area.type, area.value),
					onClick : function(){
						alert('toto');
					}
				});
			}	
		}	
	});
}