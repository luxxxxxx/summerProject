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

	}
		leftPlane.style.display = 'block'
		rightPlane.style.display = 'block'
		leftPlane.style.left = x + 'px';
		rightPlane.style.right = x + 'px';
	window.onresize = function () {
		var ww = winWidth();
		  //神奇的算法
		if (ww > 1425) {
			var x = (ww - 1425)/2;
		} else if (ww < 1425 && ww >= 980) {
				x = 0;
				leftPlane.style.display = 'block'
				rightPlane.style.display = 'block'
		} else if (ww < 980) {
			rightPlane.style.display = 'none'
			leftPlane.style.display = 'none'
		}
		leftPlane.style.left = x + 'px';
		rightPlane.style.right = x + 'px';

	}

//叶子动画 
var leavesArry = $('.leaves');
for (var i = 0; i < leavesArry.length; i++) {
	leavesArry[i].style.left = Math.random()*winWidth() + 'px';
	var n = Math.ceil(Math.random()*3);
	addClass(leavesArry[i],'dur' + n);
	addClass(leavesArry[i],'delay' +n)
}