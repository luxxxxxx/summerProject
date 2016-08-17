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
	var targetTime = new Date(2016,8,7,0,0);
	var time = targetTime - new Date();
	var s = parseInt(time/1000 %60);
	var m = parseInt(time/1000/60 %60);
	var h = parseInt(time/1000/60/60 %24);
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

var map = $('#resizeMap');    //地图外面的 div
var mapScreen = $('#mapScreen');  //鼠标在地图上面点击滑动时候的屏幕
var rate = 1;  //地图放大缩小的b比例
var fixRate; //精确比例到小数点后一位 *避免了 小数相加减带来的误差
var plus = $('#plus');   //地图放大按钮
var minus = $('#minus');  //缩小按钮
var positionDesc = $('#positionDesc');   // 坐标下面的文字介绍
var originDescL = positionDesc.offsetLeft;  //  最开始坐标距离地图左侧
var originDescT = positionDesc.offsetTop;   //  最开始坐标距离地图右侧
var positionArrowScreen = $('#positionArrowCon'); //盛放地图标记 的div
var seneryT = $('#seneryTitle');  // 地图弹窗 里面地图名字
var seneryDesc = $('#seneryDesc');  // 地图弹窗里面 地图介绍


var positionDescArry = $('.positionArrow');     //所有 箭头
var originW = parseInt(getStyle(map,'width')); //地图Box宽
var originH = parseInt(getStyle(map,'height'));  //地图box高

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
		} else if ( lunboCon.index == positionDescArryL - 1) {
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
var closeBtn = $('.close')[0];
closeBtn.onclick = function () {
	lunbo.style.display = 'none';
	mapScreen.onmousedown = function (e) {    
	var ev = e || window.event; 
	var startL = map.offsetLeft;  // map 的left
	var startT = map.offsetTop;    // map 的 top
	var startX = ev.clientX;
	var startY = ev.clientY;
	mapScreenW = this.offsetWidth;
	mapScreenH = this.offsetHeight;
	var minLeft = -(map.offsetWidth - mapScreenW);    //地图往左滑动的最大距离
	var minTop = -(map.offsetHeight - mapScreenH);	  //地图往右滑动的最大距离
	var targetL;
	var targetT;
		document.onmousemove = function (e) {
			var ev = e || window.event;
			var x_ = ev.clientX - startX;   //
			var y_ = ev.clientY - startY;
			targetL = startL + x_;
			targetT = startT + y_;
			if (targetL >= 0 ) {
				targetL = 0;
			}else if (targetL <= minLeft ) {
				targetL = minLeft
			}
			if (targetT >= 0) {
				targetT = 0
			}else if (targetT <= minTop) {
				targetT = minTop;
			}
			map.style.top = targetT + 'px';
			positionArrowScreen.style.top = targetT + 'px';
			map.style.left = targetL + 'px';
			positionArrowScreen.style.left = targetL + 'px';
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
	positionDesc.innerHTML = targetArrow().getAttribute('name');
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
	positionDesc.innerHTML = targetArrow().getAttribute('name');
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
		fixR =20;
	} else if ( fixRate == 1.6 ) {
		fixL = 15;
		fixR = 35;
	} else if ( fixRate == 1.9 ) {
		fixL = 20;
		fixR = 50;
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
	var fixRate;
	if  ( rate >= 1 && rate != 1 ) {
		rate -= 0.3;
		fixRate = rate.toFixed(1);
	};
	if ( fixRate == 1.3 ) {
		fixL = 15;
		fixR = 35;
	} else if ( fixRate == 1.6 ) {
		fixL = 20;
		fixR = 50;
	} else if ( fixRate == 1.9 ) {
		fixL = 20;
		fixR = 50;
	}

	move(map,{ width: originW * rate + fixL + 'px', height: originH * rate + fixR + 'px' }, 200 , 'easeOut');


	var minLeft = -( originW * rate + fixL - originW);
	var minTop = -( originH * rate + fixR - originH);
	if (map.offsetLeft <= minLeft) {
		map.style.left = minLeft + 'px';
		positionArrowScreen.style.left = minLeft + 'px';
	}; //修正地图缩小后 地图未能铺满屏幕的bug；
	if (map.offsetTop <= minTop) { 
		map.style.top = minTop + 'px';
		positionArrowScreen.style.top = minTop + 'px';
	}


	for ( var i = 0; i < positionDescArry.length; i++ ) {
		var This = positionDescArry[i];
		move(This,{left:This.originLeft * rate + fixL +'px',top:This.oringinTop*rate + fixR + 'px'}, 200 , 'easeOut');
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
	mapScreenW = this.offsetWidth;
	mapScreenH = this.offsetHeight;
	var minLeft = -(map.offsetWidth - mapScreenW);    //地图往左滑动的最大距离
	var minTop = -(map.offsetHeight - mapScreenH);	  //地图往右滑动的最大距离
	var targetL;
	var targetT;
		document.onmousemove = function (e) {
			var ev = e || window.event;
			var x_ = ev.clientX - startX;   
			var y_ = ev.clientY - startY;
			targetL = startL + x_;
			targetT = startT + y_;
			if (targetL >= 0 ) {
				targetL = 0;
			}else if (targetL <= minLeft ) {
				targetL = minLeft
			}
			if (targetT >= 0) {
				targetT = 0
			}else if (targetT <= minTop) {
				targetT = minTop;
			}
			map.style.top = targetT + 'px';
			positionArrowScreen.style.top = targetT + 'px';
			map.style.left = targetL + 'px';
			positionArrowScreen.style.left = targetL + 'px';
		};
		document.onmouseup = function () {
			this.onmousemove = null;
		};
}


var winHeight; //目前窗口高度 
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
	var originGotopBtnTop = goTopBtn.offsetTop;  //页面加载后回到顶部按钮距离顶部的距离

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
		if (window.innerHeight)
			winHeight = window.innerHeight;
		else if ((document.body) && (document.body.clientHeight))
			winHeight = document.body.clientHeight;
	}


goTopBtn.onclick = slideToTop;

function slideToTop () {
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
if (window.innerHeight)
	winHeight = window.innerHeight;
else if ((document.body) && (document.body.clientHeight))
	winHeight = document.body.clientHeight;

originGotopBtnBottom = parseInt(getStyle(goTopBtn,'bottom'));
window.onscroll = function () {
	var top = document.body.scrollTop || document.documentElement.scrollTop;
	top = top + winHeight;
	if (top > 1400) {
		if(onOff) {
			onOff = false;
			goTopBtn.style.display = 'block';
			setTimeout(function(){
				goTopBtn.style.opacity = 1;
				goTopBtn.style.bottom = originGotopBtnBottom + 40 + 'px';
			},1)
		}
	}else if (top <= 1400) {
		if (!onOff) {
			onOff = true;
			var nTop = goTopBtn.offsetTop;
			goTopBtn.style.bottom = originGotopBtnBottom - 40 + 'px';
			goTopBtn.style.opacity = 0;
			setTimeout(function(){
				goTopBtn.style.display = 'none'
			},300)
		}
	}
	if (top > 3160) {
		goTopBtn.style.bottom = originGotopBtnBottom + (top - 3160)*(7/9) + 'px'; //神秘算法
	}
}


//叶子动画   叶子的初始 left随机  动画延迟随机 动画持续时间随机 
var leavesArry = $('.leaves');  
for (var i = 0; i < leavesArry.length; i++) {
	leavesArry[i].style.left = Math.random()*winWidth() + 'px';
	var n = Math.ceil(Math.random()*3);
	addClass(leavesArry[i],'dur' + n);
	addClass(leavesArry[i],'delay' + n)
}

console.log('红岩网校2016新生专题网前端项目组成员：刘竣豪、刘荣博、赵晏')  //神秘console