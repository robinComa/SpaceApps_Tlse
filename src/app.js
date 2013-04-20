angular.module('SpaceAppsTlse', ['i18nService', 'i18nFilter', 'dataService'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
			when('/', {templateUrl: 'src/templates/home.html', controller: HomeCtrl}).
			otherwise({redirectTo: '/'});
}]).config(['$httpProvider', function ($httpProvider) {
	// For CORS XHR Requests
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]).run(function($rootScope, I18n) {
	
	/**Langage detection*/
	var langage = (navigator.browserLanguage ? navigator.browserLanguage : navigator.language);	
	if (langage.indexOf('en') > -1) langage = 'en';
	else if (langage.indexOf('fr') > -1) langage = 'fr';
	else langage = 'en';
	
	/** i18n bootstrap */
	$rootScope.i18n = {
			dictionary : I18n.get({lang : langage}),
			get : function(input, args){
				if(!this.dictionary[input]){
					return input;
				}
				var string = this.dictionary[input];
				for(var i in args){
					string = string.replace(new RegExp('(\\{' + i + '\\})', "g"), args[i]);
				}
				return string;
			},
			changeLanguage : function (lang) {
				this.dictionary = I18n.get({lang : lang});
			}
	};
	
	/** Mobile detection */
	var isMobile = function() {
		var check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		return check; 
	};
	$rootScope.isMobile = isMobile();
	
	/** Map facade */
	$rootScope.Map = function(coordinates){
		var ELEMENT_ID = 'map';
		var DEFAULT_ZOOM = 2;
		var markers = [];
		
		var map = L.map(ELEMENT_ID).setView([coordinates.lat,coordinates.lon], DEFAULT_ZOOM);	
		L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
		}).addTo(map);
		
		this.addMarker = function(data){
			var icon = L.icon({
			    iconUrl: '/img/marker/grey.png',
			    shadowUrl: '/img/marker/shadow.png',
			    iconAnchor:   [2, 40],
			    shadowAnchor:   [2, 40]
			});
			var marker = L.marker([data.coordinates.lat, data.coordinates.lon], {
				opacity : data.opacity,
				icon : icon
			});
			marker.addTo(map).on('click', data.onClick);
			markers.push(marker);
		};
		
		this.addPolyline = function(data){
			var latlngs = [];
			for(var i in data.coordinates){
				latlngs.push(new L.LatLng(data.coordinates[i].lat, data.coordinates[i].lon));
			}
			L.polyline(latlngs, {
				color: data.color,
				opacity : data.opacity
			}).addTo(map).on('click', data.onClick);
		};
		
		this.addPolygon = function(data){
			var latlngs = [];
			for(var i in data.coordinates){
				latlngs.push(new L.LatLng(data.coordinates[i].lat, data.coordinates[i].lon));
			}
			L.polygon(latlngs, {
				color: data.color,
				opacity : data.opacity
			}).addTo(map).on('click', data.onClick);
		};
		
		this.clearMap = function(){
			for(var i in markers){
				map.removeLayer(markers[i]);
			}
			markers = [];
			for(i in map._layers) {
		        if(map._layers[i]._path != undefined) {
		        	map.removeLayer(map._layers[i]);
		        }
		    }
		};
	}
});