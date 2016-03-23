'use strict';
$(function() {
	var canvas = $("#c");
	var canvasHeight;
	var canvasWidth;
	var ctx;

	var pointCollection;

	function brownColor(y){
		if(y <= 13)
			return '#A6610C';
		if(y > 13 && y <= 20)
			return '#9F6123';
		if(y > 20 && y <= 50)
			return '#946031';
		if(y > 50 && y <= 70)
			return '#795237';
		if(y > 70 && y <= 82)
			return '#644129';
		if(y > 82)
			return '#543019';
	}

	function greenColor(y){
		if(y <= 13)
			return '#8DC63F';
		if(y > 13 && y <= 20)
			return '#89C159';
		if(y > 20 && y <= 50)
			return '#80B963';
		if(y > 50 && y <= 70)
			return '#6CAB5D';
		if(y > 70 && y <= 82)
			return '#4D9A42';
		if(y > 82)
			return '#419639';
	}

	function init() {
		updateCanvasDimensions();

		var g = [ new Point(73, 13, 0.0, 8, brownColor(13)), new Point(59, 5, 0.0, 6, brownColor(5)), new Point(42, 4, 0.0, 6, brownColor(4)), new Point(27, 9, 0.0, 6, brownColor(9)), new Point(17, 17, 0.0, 5, brownColor(17)), new Point(10, 27, 0.0, 6, brownColor(27)), new Point(6, 38, 0.0, 6, brownColor(38)), new Point(6, 49, 0.0, 6, brownColor(49)), new Point(8, 60, 0.0, 8, brownColor(60)), new Point(14, 71, 0.0, 8, brownColor(71)), new Point(25, 82, 0.0, 8, brownColor(82)), new Point(45, 88, 0.0, 9, brownColor(88)), new Point(73, 83, 0.0, 9, brownColor(83)), new Point(78, 67, 0.0, 8, brownColor(67)), new Point(63, 62, 0.0, 6, brownColor(62)) ];
		var o = [ new Point(108, 36, 0.0, 6, brownColor(36)), new Point(101, 46, 0.0, 5, brownColor(46)), new Point(97, 56, 0.0, 6, brownColor(56)), new Point(100, 65, 0.0, 6, brownColor(65)), new Point(105, 75, 0.0, 6, brownColor(75)), new Point(117, 83, 0.0, 8, brownColor(83)), new Point(137, 80, 0.0, 8, brownColor(80)), new Point(146, 65, 0.0, 8, brownColor(65)), new Point(145, 49, 0.0, 8, brownColor(49)), new Point(137, 37, 0.0, 6, brownColor(37)), new Point(123, 32, 0.0, 6, brownColor(32)) ];
		var dash = [ new Point(170, 59, 0.0, 9, greenColor(59)), new Point(190, 59, 0.0, 8, greenColor(59))	];
		var l = [ new Point(214, 6, 0.0, 9, greenColor(6)), new Point(214, 23, 0.0, 8, greenColor(23)), new Point(214, 41, 0.0, 8, greenColor(41)), new Point(214, 59, 0.0, 9, greenColor(59)), new Point(224, 78, 0.0, 9, greenColor(78)), new Point(244, 78, 0.0, 7, greenColor(78)), new Point(259, 78, 0.0, 7, greenColor(78)) ];
		var a = [	new Point(284, 36, 0.0, 6, greenColor(36)), new Point(277, 46, 0.0, 5, greenColor(46)), new Point(273, 56, 0.0, 6, greenColor(56)), new Point(276, 65, 0.0, 6, greenColor(65)), new Point(281, 75, 0.0, 6, greenColor(75)), new Point(293, 83, 0.0, 8, greenColor(83)), new Point(313, 80, 0.0, 8, greenColor(80)), new Point(322, 65, 0.0, 8, greenColor(65)), new Point(321, 49, 0.0, 8, greenColor(49)), new Point(313, 37, 0.0, 6, greenColor(37)), new Point(299, 32, 0.0, 6, greenColor(32)), new Point(330, 83, 0.0, 7, greenColor(83)) ];
		var b = [ new Point(354, 36, 0.0, 6, brownColor(36)), new Point(347, 46, 0.0, 5, brownColor(46)), new Point(343, 56, 0.0, 6, brownColor(56)), new Point(346, 65, 0.0, 6, brownColor(65)), new Point(351, 75, 0.0, 6, brownColor(75)), new Point(363, 83, 0.0, 8, brownColor(83)), new Point(383, 80, 0.0, 8, brownColor(80)), new Point(392, 65, 0.0, 8, brownColor(65)), new Point(391, 49, 0.0, 8, brownColor(49)), new Point(383, 37, 0.0, 6, brownColor(37)), new Point(369, 32, 0.0, 6, brownColor(32)), new Point(341, 35, 0.0, 6, brownColor(35)), new Point(341, 20, 0.0, 6, brownColor(20)), new Point(341, 6, 0.0, 7, brownColor(6)) ];
		var s = [ new Point(435, 33, 0.0, 8, greenColor(33)), new Point(420, 36, 0.0, 7, greenColor(36)), new Point(412, 45, 0.0, 7, greenColor(45)), new Point(420, 56, 0.0, 6, greenColor(56)), new Point(433, 63, 0.0, 6, greenColor(63)), new Point(438, 75, 0.0, 6, greenColor(75)), new Point(425, 80, 0.0, 7, greenColor(80)), new Point(410, 80, 0.0, 8, greenColor(80)) ];
		var word = g.concat(o).concat(dash).concat(l).concat(a).concat(b).concat(s);

		var gLength = word.length;
		for (var i = 0; i < gLength; i++) {
			word[i].curPos.x = (canvasWidth/2 - 180) + word[i].curPos.x;
			word[i].curPos.y = (800/2 - 65) + word[i].curPos.y;

			word[i].homePos.x = (canvasWidth/2 - 180) + word[i].originalPos.x;
			word[i].homePos.y = (800/2 - 65) + word[i].originalPos.y;
		}

		pointCollection = new PointCollection();
		pointCollection.points = word;

		initEventListeners();
		timeout();
	}

	function initEventListeners() {
		$(window).bind('resize', updateCanvasDimensions).bind('mousemove', onMove);

		canvas.get(0).ontouchmove = function(e) {
			e.preventDefault();
			onTouchMove(e);
		};

		canvas.get(0).ontouchstart = function(e) {
			e.preventDefault();
		};
	}

	function updateCanvasDimensions() {
		var height = ($(window).height() < 800) ? 800 : $(window).height();
		canvas.attr({height: height, width: $(window).width()});
		canvasWidth = canvas.width();
		canvasHeight = canvas.height();

		if (pointCollection) {
			var points = pointCollection.points;
			var pointsLength = points.length;
			for (var i = 0; i < pointsLength; i++) {
				points[i].homePos.x = (canvasWidth/2 - 180) + points[i].originalPos.x;
			}
		}

		draw();
	}

	function onMove(e) {
		var offset = canvas.offset();
		if (pointCollection)
			pointCollection.mousePos.set(e.pageX-offset.left, e.pageY-offset.top);
	}

	function onTouchMove(e) {
		var offset = canvas.offset();
		if (pointCollection)
			pointCollection.mousePos.set(e.targetTouches[0].pageX-offset.left, e.targetTouches[0].pageY-offset.top);
	}

	function timeout() {
		draw();
		update();

		setTimeout(function() { timeout(); }, 30);
	}

	function draw() {
		var tmpCanvas = canvas.get(0);

		if (tmpCanvas.getContext === null) {
			return;
		}

		ctx = tmpCanvas.getContext('2d');
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		if (pointCollection)
			pointCollection.draw();
	}

	function update() {
		if (pointCollection)
			pointCollection.update();
	}

	function Vector(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;

		this.addX = function(x) {
			this.x += x;
		};

		this.addY = function(y) {
			this.y += y;
		};

		this.addZ = function(z) {
			this.z += z;
		};

		this.set = function(x, y, z) {
			this.x = x;
			this.y = y;
			this.z = z;
		};
	}

	function PointCollection() {
		this.mousePos = new Vector(0, 0);
		this.points = [];

		this.newPoint = function(x, y, z) {
			var point = new Point(x, y, z);
			this.points.push(point);
			return point;
		};

		this.update = function() {
			var pointsLength = this.points.length;

			for (var i = 0; i < pointsLength; i++) {
				var point = this.points[i];

				if (point === null)
					continue;

				var dx = this.mousePos.x - point.curPos.x;
				var dy = this.mousePos.y - point.curPos.y;
				var dd = (dx * dx) + (dy * dy);
				var d = Math.sqrt(dd);

				if (d < 150) {
					point.targetPos.x = (this.mousePos.x < point.curPos.x) ? point.curPos.x - dx : point.curPos.x - dx;
					point.targetPos.y = (this.mousePos.y < point.curPos.y) ? point.curPos.y - dy : point.curPos.y - dy;
				} else {
					point.targetPos.x = point.homePos.x;
					point.targetPos.y = point.homePos.y;
				}

				point.update();
			}
		};

		this.draw = function() {
			var pointsLength = this.points.length;
			for (var i = 0; i < pointsLength; i++) {
				var point = this.points[i];

				if (point === null)
					continue;

				point.draw();
			}
		};
	}

	function Point(x, y, z, size, colour) {
		this.colour = colour;
		this.curPos = new Vector(x, y, z);
		this.friction = 0.8;
		this.homePos = new Vector(x, y, z);
		this.originalPos = new Vector(x, y, z);
		this.radius = size;
		this.size = size;
		this.springStrength = 0.1;
		this.targetPos = new Vector(x, y, z);
		this.velocity = new Vector(0.0, 0.0, 0.0);

		this.update = function() {
			var dx = this.targetPos.x - this.curPos.x;
			var ax = dx * this.springStrength;
			this.velocity.x += ax;
			this.velocity.x *= this.friction;
			this.curPos.x += this.velocity.x;

			var dy = this.targetPos.y - this.curPos.y;
			var ay = dy * this.springStrength;
			this.velocity.y += ay;
			this.velocity.y *= this.friction;
			this.curPos.y += this.velocity.y;

			var dox = this.homePos.x - this.curPos.x;
			var doy = this.homePos.y - this.curPos.y;
			var dd  = (dox * dox) + (doy * doy);
			var d   = Math.sqrt(dd);

			this.targetPos.z = d/100 + 1;
			var dz = this.targetPos.z - this.curPos.z;
			var az = dz * this.springStrength;
			this.velocity.z += az;
			this.velocity.z *= this.friction;
			this.curPos.z += this.velocity.z;

			this.radius = this.size*this.curPos.z;
			if (this.radius < 1) this.radius = 1;
		};

		this.draw = function() {
			ctx.fillStyle = this.colour;
			ctx.beginPath();
			ctx.arc(this.curPos.x, this.curPos.y, this.radius, 0, Math.PI*2, true);
			ctx.fill();
		};
	}

	init();
});
