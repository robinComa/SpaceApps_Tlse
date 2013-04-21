function HomeCtrl($rootScope, $scope, Data){

	$scope.newArea = {
			author: null,
			description: null,
			endDate: null,
			points: [
			         {coordinates:{lat:null, lon:null}}
         ],
         startDate: 0,
         type: null,
         value: null
	};

	$scope.submitNewArea = function(){
		$scope.newArea.startDate = parseInt($scope.newArea.startDate);
		$scope.newArea.endDate = parseInt($scope.newArea.endDate);
		for(var i in $scope.newArea.points){
			$scope.newArea.points[i].coordinates = {
					lat : parseFloat($scope.newArea.points[i].coordinates.lat),
					lon : parseFloat($scope.newArea.points[i].coordinates.lon)
			}
		}
		Data.create($scope.newArea, function(){
			$rootScope.data = Data.read();
		});
	};

	$scope.typeCheck = {};
	$scope.typeSelect = [];
	for(var k in $scope.types){
		if(k.toString().indexOf('$') ==-1){
			$scope.typeCheck[k] = true;
			$scope.typeSelect.push({typeName: k});
		}
	}

	$scope.newAreaAddCoordinates = function(){
		$scope.newArea.points.push({
			coordinates : {
				lat : 0.0,
				lon : 0.0
			}
		});
	}

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

	$scope.fillMap = function(){

		$rootScope.map.clearMap();

		for(var i in $rootScope.data.areas){

			var area = $rootScope.data.areas[i];

			var isInRange = area.startDate <= $rootScope.currentTime && area.endDate >= $rootScope.currentTime;
			var isChecked = $scope.typeCheck[area.type] == true;

			if(isChecked && isInRange){
				var isMarker = area.points.length == 1;
				var isPolyline = area.points.length == 2;
				var isPolygon = area.points.length >= 2;


				if(isMarker){
					$rootScope.map.addMarker({
						point : area.points[0],
						color : $rootScope.types[area.type].color,
						opacity : dataToOpacity(area.type, area.value),
						infoBulle : '<h3>'+area.type+' ('+area.value+')</h3><h5>'+(new Date(area.startDate)).getFullYear()+' / '+(new Date(area.endDate)).getFullYear()+'</h5>'+'<p><strong>'+area.author+'</strong> : '+area.description+'</p>'
					});
				}else if(isPolyline){

				}else if(isPolygon){
					$rootScope.map.addPolygon({
						points : area.points,
						color : $rootScope.types[area.type].color,
						opacity : dataToOpacity(area.type, area.value),
						infoBulle : '<h3>'+area.type+' ('+area.value+')</h3><h5>'+(new Date(area.startDate)).getFullYear()+' / '+(new Date(area.endDate)).getFullYear()+'</h5>'+'<p><strong>'+area.author+'</strong> : '+area.description+'</p>'
					});
				}	
			}

		}	
	};

	$scope.area = false;
	$rootScope.map = new $rootScope.Map({lat : 40, lon : 0});

	$('#datepicker-start-date').datetimepicker({
		pickTime: false
	}).on('changeDate', function(e) {
		$scope.$apply(function () {
			$scope.newArea.startDate = e.date.getTime();
		});
	});
	$('#datepicker-end-date').datetimepicker({
		pickTime: false
	}).on('changeDate', function(e) {
		$scope.$apply(function () {
			$scope.newArea.endDate = e.date.getTime();
		});
	});
	
	setTimeout(function(){
		$('.tooltipLegend').tooltip({
			trigger : 'hover',
			placement : 'top'
		});
	}, 500);

	$('#timeline').slider({
		max : 0,
		min : $rootScope.currentTime,
		step : 1000*60*60*24 * 365.2,
		orientation : 'vertical',
		value : 0,
		tooltip : 'show',
		formater : function(val){
			return (new Date(val)).getFullYear();
		}
	}).on('slide', function(ev){
		$rootScope.currentTime = ev.value;
		$scope.fillMap($rootScope.data);
	});

	setTimeout(function(){
		$scope.fillMap($rootScope.data);
	}, 500);
}

function AboutCtrl($rootScope, $scope){
	
}

function ApiCtrl(){
	
}