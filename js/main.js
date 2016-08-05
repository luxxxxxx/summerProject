var originP = parseInt(getStyle($('#d1'),'top')); //数字原本top值
var d1 = $('#d1');
var d2 = $('#d2');
var h1 = $('#h1');
var h2 = $('#h2');
var m1 = $('#m1');
var m2 = $('#m2');
var s1 = $('#s1');
var s2 = $('#s2');
var positionArr = ['5px','-30px','-66px','-102px','-137px','-173','-209','-244','-280','-316'];

var timer = setInterval(function(){
	var targetTime = new Date(2016,9,1,0,0);
	var time = targetTime - new Date();
	var s = parseInt(time/1000 %60);
	var m = parseInt(time/1000/60 %60);
	var h = parseInt(time/1000/60/60 %60);
	var d = parseInt(time/1000/60/60/24);
	move(s2,{'top':positionArr[num(s)[1]]},200,'easeIn',function(){
	})
	move(s1,{'top':positionArr[num(s)[0]]},200,'easeIn',function(){
	})
	move(m2,{'top':positionArr[num(m)[1]]},200,'easeIn',function(){
	})
	move(m1,{'top':positionArr[num(m)[0]]},200,'easeIn',function(){
	})
	move(h2,{'top':positionArr[num(h)[1]]},200,'easeIn',function(){
	})
	move(h1,{'top':positionArr[num(h)[0]]},200,'easeIn',function(){
	})
	move(d2,{'top':positionArr[num(d)[1]]},200,'easeIn',function(){
	})
	move(d1,{'top':positionArr[num(d)[0]]},200,'easeIn',function(){
	})
},1000);

function num (num) {
	if (num < 10) {
		return '0' + num;
	}else {
		return num + ''; //自动变为字符串先
	}
}

var BtnArray = $('.moreBtn');
for (var i = 0; i < BtnArray.length; i++) {
	BtnArray[i].firstChild.onmouseenter = function () {
		addClass(this.parentNode,'shake');
		this.onmouseleave = function () {
			removeClass(this.parentNode,'shake');
		}
	}
}

// var map = $('#map');    //地图   放大缩小  以及   拖拽 功能
// var rate = 1;
// var plus = $('#plus');
// var minus = $('#minus');
// var mapScreen = $('.mapFrame')[0];
// var positionDescArry = $('.positionBox');
// var originW = parseInt(getStyle(map,'width'));
// var originH = parseInt(getStyle(map,'height'));
// for (var i = 0; i < positionDescArry.length; i++) {
// 	var This = positionDescArry[i];
// 	This.originLeft = parseInt(getStyle(This,'left'));
// 	This.oringinTop = parseInt(getStyle(This,'top'));
// }
// plus.onclick = function () {
// 	if  (rate <= 1.1 && rate >= 1) {
// 		rate += 0.1;
// 	}
// 	move(map,{ width: originW * rate + 'px', height: originH * rate + 'px' }, 250 , 'easeOut');
// 	for (var i = 0; i < positionDescArry.length; i++) {
// 		var This = positionDescArry[i];
// 		move(This,{left:This.originLeft*rate +'px',top:This.oringinTop*rate + 'px'},250 , 'easeOut');
// 	}
// };
// minus.onclick = function () {
// 	if  (rate >= 1 && rate != 1) {
// 		rate -= 0.1;
// 	}
// 	move(map,{ width: originW * rate + 'px', height: originH * rate + 'px' }, 250 , 'easeOut');
// 	for (var i = 0; i < positionDescArry.length; i++) {
// 		var This = positionDescArry[i];
// 		move(This,{left:This.originLeft*rate +'px',top:This.oringinTop*rate + 'px'},250 , 'easeOut');
// 	}
// };

// mapScreen.onmousedown = function (e) {
// 	var ev = e || window.event; 
// 	var startL = parseInt(getStyle(map,'left'));  // map 的left
// 	var startT = parseInt(getStyle(map,'top'));    // map 的 top
// 	var startX = ev.clientX;
// 	var startY = ev.clientY;
// 	for (var i = 0; i < positionDescArry.length; i++) {
// 		var This = positionDescArry[i];
// 		This.startTop = parseInt(getStyle(This,'top'));
// 		This.startLeft = parseInt(getStyle(This,'left'));
// 	}
// 	this.onmousemove = function (e) {
// 		var ev = e || window.event;
// 		var x_ = ev.clientX - startX;
// 		var y_ = ev.clientY - startY;
// 		map.style.left = startL + x_ + 'px';
// 		map.style.top = startT + y_ + 'px';
// 		console.log(positionDescArry[0].startLeft);
// 		positionDescArry[0].style.left = positionDescArry[0].startLeft + x_ + 'px';
// 		positionDescArry[0].style.top = positionDescArry[0].startTop + y_ + 'px';
// 		positionDescArry[1].style.left = positionDescArry[1].startLeft + x_ + 'px';
// 		positionDescArry[1].style.top = positionDescArry[1].startTop + y_ + 'px';
// 	};
// 	this.onmouseup = function () {
// 		this.onmousemove = null;
// 	}
// }



console.log('// ---------------------部分bug还在抢修中----------------------敬请期待')





// var returnTop = $('#returnTop');  //能够兼容IE8 的 return to top
// returnTop.onclick = function () {
// 	if (document.body.scrollTop != 0) {    
// 			var body = document.body;
// 		}else {
// 			var body = document.documentElement;   //ie8获取距离页面顶端方式不一样
// 		}
// 	if ( body.scrollTop != 0) {
// 		var distancePiece = body.scrollTop/25;
// 		var timer = setInterval(function () {
// 		if ( body.scrollTop <= distancePiece ) {
// 			body.scrollTop = 0;
// 			clearInterval(timer);
// 		}else {
// 			body.scrollTop -= distancePiece;
// 		}
// 	},20)
// 	}
// }
	var goTopBtn = $('#goTop');
	var leftPlane = $('#leftBox');    //给飞机定位 
	var rightPlane = $('#rightBox');
	var oWindow = window;
	function winWidth () {                                   //这个函数能够返回  window 的 宽度   兼容IE8
		if (oWindow.innerWidth)
		var winWidth = oWindow.innerWidth;
		else if ((document.body) && (document.body.clientWidth))
		var winWidth = document.body.clientWidth;
		return winWidth;
	} 
	var winW = winWidth();

	var x = (winW - 1425)/3;
	if (winW < 1425 && winW >= 980) {
		x = 0;
	}else if (winW <= 980) {
		leftPlane.style.display = 'none';
		rightPlane.style.display = 'none';
		goTopBtn.style.display = 'none';

	}
		leftPlane.style.display = 'block'
		rightPlane.style.display = 'block'
		leftPlane.style.left = x + 'px';
		rightPlane.style.right = x + 'px';
		goTopBtn.style.right = x + 'px';
	window.onresize = function () {
		var ww = winWidth();
		  //神奇的算法
		if (ww > 1425) {
			var x = (ww - 1425)/2;
		} else if (ww < 1425 && ww >= 980) {
				x = 0;
				leftPlane.style.display = 'block'
				rightPlane.style.display = 'block'
				goTopBtn.style.display = 'block';
		} else if (ww < 980) {
			rightPlane.style.display = 'none'
			leftPlane.style.display = 'none'
			goTopBtn.style.display = 'none';
		}
		leftPlane.style.left = x + 'px';
		rightPlane.style.right = x + 'px';
		goTopBtn.style.right = x + 'px';
	}





window.onscroll = function () {
	var top = document.body.scrollTop || document.documentElement.scrollTop;
}

// var main = $('#main');
// var leafTimer = setInterval (function () {
// 	var l = winWidth()*Math.random();
// 	console.log(l);
// 	var ax = 20*Math.random();
// 	console.log(ax);
// 	var speedY = 20;
// 	createLeaves (speedY)
// },1000)


// function createLeaves (speedY) {
// 	var leaf = document.createElement('div');
// 	leaf.className = 'leaves';
// 	leaf.style.backgroundImage = 'url(../1.png)';
// 	move(leaf,{top:'500px'},500,'linear');
// }

//叶子动画 
var leavesArry = $('.leaves');
for (var i = 0; i < leavesArry.length; i++) {
	leavesArry[i].style.left = Math.random()*winWidth() + 'px';
	var n = Math.ceil(Math.random()*3);
	addClass(leavesArry[i],'dur' + n);
	addClass(leavesArry[i],'delay' +n)
}