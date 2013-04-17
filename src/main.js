function MainCtrl ($scope, $rootScope) {
	var map = new $rootScope.Map({lat : 40, lon : 0});
	
	map.addMarker({
		coordinate : {
			lat : 43,
			lon : 0
		},
		onClick : function(){
			alert('Click on marker!');
		}
	});
	
	map.addPolyline({
		coordinates : [
		     {
				lat : 0,
				lon : 0
		     },
		     {
				lat : 50,
				lon : 50
		     }
		],
		onClick : function(){
			alert('Click on line!');
		}
	});
	
	map.addPolygon({
		coordinates : [
  		     {
  				lat : 40,
  				lon : -80
  		     },
  		     {
  				lat : 50,
  				lon : -85
  		     },
  		     {
   				lat : 60,
   				lon : -70
   		     }
  		],
  		onClick : function(){
  			alert('Click on polygon!');
  		}
	});
}