{
	"theme" : {
		"name" : "Co2",
		"description" : "I am the Co2 theme description.",
		"legend" : {
			"img" : "http://www.whiterockscience.com/moritz/images/clegwin.jpg"
		},
		"style" : {
			"color" : "red"
		}
	},
	"geometries" : [{
		"class" : "marker",
		"range" : {
			"min" : 0,
			"max" : 7
		},
		"opacity" : 1,
		"coordinate" : {
			"lat" : 43,
			"lon" : 0
		}
	},{
		"class" : "marker",
		"range" : {
			"min" : 3,
			"max" : 8
		},
		"opacity" : 0.5,
		"coordinate" : {
			"lat" : 42,
			"lon" : -100
		}
	},{
		"class" : "polyline",
		"range" : {
			"min" : 1,
			"max" : 9
		},
		"opacity" : 0.2,
		"coordinates" : [{
			"lat" : 0,
			"lon" : 0
	     },
	     {
			"lat" : 50,
			"lon" : 50
	     }]
	},{
		"class" : "polyline",
		"range" : {
			"min" : 5,
			"max" : 9
		},
		"opacity" : 0.8,
		"coordinates" : [{
			"lat" : 70,
			"lon" : -110
	     },
	     {
			"lat" : -10,
			"lon" : -100
	     }]
	},{
		"class" : "polygon",
		"range" : {
			"min" : 2,
			"max" : 4
		},
		"opacity" : 0.3,
		"coordinates" : [{
			"lat" : 40,
			"lon" : -80
	     },
	     {
			"lat" : 50,
			"lon" : -85
	     },
	     {
			"lat" : 60,
			"lon" : -70
	     }]
	},{
		"class" : "polygon",
		"range" : {
			"min" : 6,
			"max" : 9
		},
		"opacity" : 0.7,
		"coordinates" : [{
			"lat" : 0,
			"lon" : 40
	     },
	     {
			"lat" : 10,
			"lon" : 60
	     },
	     {
			"lat" : 30,
			"lon" : 60
	     },
	     {
			"lat" : 40,
			"lon" : 50
	     }]
	}]
}