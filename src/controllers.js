function HomeCtrl($rootScope, $scope, Data){
	
	var data = Data.get({}, function(){
		for(var i in data.markers){
			$rootScope.map.addMarker({
				coordinate : data.markers[i].coordinate,
				onClick : function(){
					alert('Click on marker!');
				}
			});
		}
		for(var i in data.polylines){
			$rootScope.map.addPolyline({
				coordinates : data.polylines[i].coordinates,
				onClick : function(){
					alert('Click on Polyline!');
				}
			});
		}
		for(var i in data.polygons){
			$rootScope.map.addPolygon({
				coordinates : data.polygons[i].coordinates,
				onClick : function(){
					alert('Click on Polygon!');
				}
			});
		}
	});
}