function HomeCtrl($rootScope, $scope){
		
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
	
	var fillMap = function(data){
		
		$rootScope.map.clearMap();
		
		for(var i in data.areas){
			
			var area = data.areas[i];
			
			console.log(area.endDate >= $rootScope.currentTime);
			console.log(area.endDate);
			console.log($rootScope.currentTime);
			
			if(area.startDate <= $rootScope.currentTime && area.endDate >= $rootScope.currentTime){
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
			
		}	
	};
	
	$rootScope.map = new $rootScope.Map({lat : 40, lon : 0});
	$('#timeline').slider({
		max : 0,
		min : $rootScope.currentTime,
		step : 60*60*24,
		orientation : 'vertical',
		value : 2000,
		tooltip : 'show',
		formater : function(val){
			return (new Date(val)).getFullYear();
		}
	}).on('slide', function(ev){
		$rootScope.currentTime = ev.value;
		fillMap($rootScope.data);
	});
	
	setTimeout(function(){
		fillMap($rootScope.data);
	}, 500);
}