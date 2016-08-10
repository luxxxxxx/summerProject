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

var map = $('#resizeMap');
var mapScreen = $('#mapScreen');
var rate = 1;
var fixRate;
var plus = $('#plus');
var minus = $('#minus');
var positionDesc = $('#positionDesc');
var originDescL = positionDesc.offsetLeft;
var originDescT = positionDesc.offsetTop;
var positionArrowScreen = $('#positionArrowCon');
var seneryT = $('#seneryTitle');
var seneryDesc = $('#seneryDesc');


var positionDescArry = $('.positionArrow');     //所有 箭头
var originW = parseInt(getStyle(map,'width'));
var originH = parseInt(getStyle(map,'height'));

// seneryT.innerHTML = positionArrow[0].getAttribute('name');
// seneryDesc.innerHTML = positionArrow[0].getAttribute('desc');
var positionDescArryL = positionDescArry.length;   //箭头数量
for (var i = 0; i < positionDescArryL; i++) {      //初始化 箭头数据  箭头 原本 left，top（方便计算位置）增添鼠标移入事件
	var This = positionDescArry[i];
	This.index = i;
	This.originLeft = parseInt(getStyle(This,'left'));
	This.oringinTop = parseInt(getStyle(This,'top'));
	This.onmouseenter = function () {
		for (var i = 0; i < positionDescArryL; i++) {
			removeClass(positionDescArry[i],'currentArrow')
		}
		addClass(this,'currentArrow');
		var l = this.offsetLeft - 22;
		var t = this.offsetTop + 54;
		var name = this.getAttribute('name');
		move(positionDesc,{left:l+'px',top:t+'px'},100,'linear');
		positionDesc.innerHTML = name;
	};
	This.onclick = function () {                      //增添  点击  弹出简介弹框事件
		lunbo.style.display = 'block';
		lunboCon.index = this.index;
		lunboCon.style.left = this.index * lunboW * -1 + 'px';
		if (lunboCon.index == 0) {
			descPrevA.style.display = 'none';
			descnextA.style.display = 'block';
		} else if ( lunboCon.index == positionDescArryL) {
			descNextA.style.display = 'none'
			descPrevA.style.display = 'block';
		} else {
			descNextA.style.display = 'block';
			descPrevA.style.display = 'block'
		}
		seneryT.innerHTML = this.getAttribute('name');
		seneryDesc.innerHTML = this.getAttribute('desc');
		mapScreen.onmousedown = null;
	}
}

var lunbo = $('#description');    
var lunboCon = $('#lunbo-con');   //轮播部分
lunboCon.style.width = 100 * positionDescArryL + '%';    //初始化 容器  宽度
var descPrevA = $('#descPrevA');    //向前箭头
var descnextA = $('#descNextA');    //向后箭头
var lunboW = 466;    //每张图片 的 宽度
var originMapL = map.offsetLeft;
var originMapT = map.offsetTop;
var originMapR = parseInt(getStyle(map,'right'));
var originMapB = map.offsetBottom;
var closeBtn = $('.close')[0];
closeBtn.onclick = function () {
	lunbo.style.display = 'none';
	mapScreen.onmousedown = function (e) {    
	var ev = e || window.event; 
	var startL = map.offsetLeft;  // map 的left
	var startT = map.offsetTop;    // map 的 top
	var startX = ev.clientX;
	var startY = ev.clientY;
	var maxDistance = 50; 
	mapScreenW = this.offsetWidth;
	mapScreenH = this.offsetHeight;
	var minLeft = -(map.offsetWidth - mapScreenW);
	var minTop = -(map.offsetHeight - mapScreenH);
		document.onmousemove = function (e) {
			var ev = e || window.event;
			var x_ = ev.clientX - startX;
			var y_ = ev.clientY - startY;
			var mapLeft = map.offsetLeft;
			var mapTop = map.offsetTop;
			if (mapLeft >= 0 && x_ > 0) {
				map.style.left =  '0px';
			}else if (mapLeft <= minLeft && x_<0 ) {
				map.style.left = minLeft + 'px';
			}else {
				var xMove = startL + x_;
				positionArrowScreen.style.left = xMove + 'px';
				map.style.left = xMove + 'px';
			};
			if (mapTop >= 0 && y_ > 0 ) {
				map.style.top = '0px';			
			}else if (mapTop <= minTop && y_ < 0) {
				map.style.top = minTop + 'px';	
			}else {
				var yMove = startT + y_ 
				map.style.top = yMove + 'px';
				positionArrowScreen.style.top = yMove + 'px';	
			}
		};
		document.onmouseup = function () {
			this.onmousemove = null;
		};
	}

}
lunboCon.index = 0;
for (var i = 1; i < positionDescArryL + 1 ; i++) {    //自动加载图片 
	var oLi = document.createElement('li');
	oLi.style.background = 'url("./img/position'+ positionDescArry[i - 1].getAttribute('number') +'.jpg") no-repeat center center';
	lunboCon.appendChild(oLi);
}


descNextA.onclick = function () {         // 向右箭头   
	var x_ = 0;
	lunboCon.index ++;
	if (lunboCon.index >= positionDescArryL - 1) {
		lunboCon.index = positionDescArryL -1;
		descNextA.style.display = 'none';
	};
	if (lunboCon.index > 0) {
		descPrevA.style.display = 'block';  //aaaaaaaaaaaa
	}
	x_ = lunboCon.index * lunboW * -1;
	move(lunboCon,{left: x_ + 'px'},300,'easeOut');
	seneryT.innerHTML = positionDescArry[lunboCon.index].getAttribute('name');
	seneryDesc.innerHTML = positionDescArry[lunboCon.index].getAttribute('desc');
	for (var i = 0; i < positionDescArryL; i++) {
		removeClass(positionDescArry[i],'currentArrow')
	}
	addClass(positionDescArry[lunboCon.index],'currentArrow');
	descfix(targetArrow().offsetLeft,targetArrow().offsetTop);
}
descPrevA.onclick = function () {      // 向左箭头
	var x_ = 0;
	lunboCon.index --;
	if (lunboCon.index <= 0) {
		lunboCon.index = 0;
		descPrevA.style.display = 'none';     //a  aaaaaa 
	}else {
		descNextA.style.display = 'block'
	}
	x_ = lunboCon.index * lunboW * -1;
	move(lunboCon,{left: x_ + 'px'},300,'easeOut');
	seneryT.innerHTML = positionDescArry[lunboCon.index].getAttribute('name');
	seneryDesc.innerHTML = positionDescArry[lunboCon.index].getAttribute('desc');
	for (var i = 0; i < positionDescArryL; i++) {
		removeClass(positionDescArry[i],'currentArrow')
	}
	addClass(positionDescArry[lunboCon.index],'currentArrow');
	descfix(targetArrow().offsetLeft,targetArrow().offsetTop);
}





plus.onclick = function () {
	var fixL = 0;
	var fixR = 0;     //用来修正地图放大缩小后可能产生的误差

	if  (rate <= 1.9 && rate >= 1) {
		rate += 0.3;
		fixRate = rate.toFixed(1);
	}
	if ( fixRate == 1.3 ) {
		fixL = 6;
		fixR =12;
	} else if ( fixRate == 1.6 ) {
		fixL = 15;
		fixR = 20;
	} else if ( fixRate == 1.9 ) {
		fixL = 20;
		fixR = 30;
	}

	move( map,{ width: originW * rate + 'px', height: originH * rate + 'px' }, 200 , 'easeOut' );
	for (var i = 0; i < positionDescArry.length; i++) {
		var This = positionDescArry[i];
		move(This,{left:This.originLeft*rate + fixL +'px',top:This.oringinTop*rate + fixR + 'px'},200 , 'easeOut');
	};
	var l = targetArrow().originLeft*rate + fixL;
	var t = targetArrow().oringinTop*rate + fixR;
	descfix(l,t);
};
minus.onclick = function () {
	var fixL = 0;
	var fixR = 0; 
	if  ( rate >= 1 && rate != 1 ) {
		rate -= 0.3;
		fixRate = rate.toFixed(1);
	}
	if ( fixRate == 1.3 ) {
		fixL = 6;
		fixR =12;
	} else if ( fixRate == 1.6 ) {
		fixL = 15;
		fixR = 20;
	} else if ( fixRate == 1.9 ) {
		fixL = 20;
		fixR = 30;
	}
	move(map,{ width: originW * rate + fixL + 'px', height: originH * rate + fixR + 'px' }, 200 , 'easeOut');

	for ( var i = 0; i < positionDescArry.length; i++ ) {
		var This = positionDescArry[i];
		move(This,{left:This.originLeft * rate + fixL +'px',top:This.oringinTop*rate + fixR + 'px'},200 , 'easeOut');
	}
	var l = targetArrow().originLeft*rate;
	var t = targetArrow().oringinTop*rate;
	descfix(l,t);
};
 

mapScreen.onmousedown = function (e) {    
	var ev = e || window.event; 
	var startL = map.offsetLeft;  // map 的left
	var startT = map.offsetTop;    // map 的 top
	var startX = ev.clientX;
	var startY = ev.clientY;
	var maxDistance = 50; 
	mapScreenW = this.offsetWidth;
	mapScreenH = this.offsetHeight;
	var minLeft = -(map.offsetWidth - mapScreenW);
	var minTop = -(map.offsetHeight - mapScreenH);
	document.onmousemove = function (e) {
		var ev = e || window.event;
		var x_ = ev.clientX - startX;
		var y_ = ev.clientY - startY;
		var mapLeft = map.offsetLeft;
		var mapTop = map.offsetTop;
		if (mapLeft >= 0 && x_ > 0) {
			map.style.left =  '0px';
		}else if (mapLeft <= minLeft && x_<0 ) {
			map.style.left = minLeft + 'px';
		}else {
			var xMove = startL + x_;
			positionArrowScreen.style.left = xMove + 'px';
			map.style.left = xMove + 'px';
		};
		if (mapTop >= 0 && y_ > 0 ) {
			map.style.top = '0px';			
		}else if (mapTop <= minTop && y_ < 0) {
			map.style.top = minTop + 'px';	
		}else {
			var yMove = startT + y_ 
			map.style.top = yMove + 'px';
			positionArrowScreen.style.top = yMove + 'px';	
		}
	};
	document.onmouseup = function () {
		this.onmousemove = null;
	}
}


function descfix (l,t) {    //移动说明文字   l: 目标箭头left t：目标箭头top
	var targetL = l -22;
	var targetT = t +54;
	move(positionDesc,{left:targetL + 'px',top:targetT + 'px'},200,'easeOut');
}
function targetArrow() {    //获取 目标箭头
	var target;
	for (var i = 0; i < positionDescArry.length; i++) {
		if (hasClass(positionDescArry[i],'currentArrow')) {
			target = positionDescArry[i];
		}
	}
	return target;
}








	var goTopBtn = $('#goTop');   //回到顶部按钮
	var leftPlane = $('#leftBox');    //给飞机定位 左边的 飞机
	var rightPlane = $('#rightBox'); //右边的飞机
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


goTopBtn.onclick = function () {
	if (document.body.scrollTop != 0) {    
			var body = document.body;
		}else {
			var body = document.documentElement;   //ie8获取距离页面顶端方式不一样
		}
	if ( body.scrollTop != 0) {
		var distancePiece = body.scrollTop/25;
		var timer = setInterval(function () {
		if ( body.scrollTop <= distancePiece ) {
			body.scrollTop = 0;
			clearInterval(timer);
		}else {
			body.scrollTop -= distancePiece;
		}
	},20)
	}
}

var onOff = true;
window.onscroll = function () {
	var top = document.body.scrollTop || document.documentElement.scrollTop;
	if (top > 1000) {
		if (onOff) {
			onOff = false;
			goTopBtn.style.display = 'block';
			setTimeout(function(){
				goTopBtn.style.opacity = 1;
			},10)
			
		}
	}else if (top < 1000) {
		if (!onOff) {
			onOff = true;
			goTopBtn.style.opacity = 0;
			setTimeout(function(){
			goTopBtn.style.display = 'none';
			},600);
		}
	}
}


// function slideIn () {
// 	var startTop = goTopBtn.offsetTop;
// 	var pieceTop = 100/25;
// 	var pieceOpacity = 1/25;
// 	var targetTop = startTop - 100;
// 	var startOpacity = parseFloat(goTopBtn.style.opacity);
// 	var goTopTimer = setInterval(function(){
// 		startTop += pieceTop;
// 		startOpacity -= pieceOpacity;
// 		if (startOpacity <= 0) {
// 			startOpacity = 0;
// 		}
// 		goTopBtn.style.top = startTop + 'px';
// 		goTopBtn.style.opacity = startOpacity;
// 		if (targetTop <= startTop) {
// 			clearInterval(goTopTimer);
// 			goTopBtn.style.display = 'block';
// 		}
// 	},13)
// }
// function slideOut () {
// 	goTopBtn.style.display = 'block';
// 	var startTop = goTopBtn.offsetTop;
// 	console.log(startTop);
// 	var startOpacity = parseFloat(goTopBtn.style.opacity) ;
// 	var pieceTop = 70/25;
// 	var pieceOpacity = 1/10;
// 	var targetTop = startTop - 70;
// 	var goTopTimer = setInterval (function(){
// 		startTop -= pieceTop;
// 		startOpacity += pieceOpacity;
// 		if (startOpacity >= 1) {
// 			startOpacity = 1;
// 		}
// 		console.log(typeof startOpacity)
// 		goTopBtn.style.top = startTop + 'px';
// 		goTopBtn.style.opacity = startOpacity;
// 		if (targetTop >= startTop) {
// 			clearInterval(goTopTimer);
// 		}
// 	},13)
// }

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

//叶子动画   叶子的初始 left随机  动画延迟随机 动画持续时间随机 
var leavesArry = $('.leaves');  
for (var i = 0; i < leavesArry.length; i++) {
	leavesArry[i].style.left = Math.random()*winWidth() + 'px';
	var n = Math.ceil(Math.random()*3);
	addClass(leavesArry[i],'dur' + n);
	addClass(leavesArry[i],'delay' +n)
}