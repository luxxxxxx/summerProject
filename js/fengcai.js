(function(){
	var aTitle = $('.h2'); //0 团委 1学生会 2科技 3社团联合 4青协 5艺术团
	var innerSlideCon = $('.right-con-wrp')[0];
	var aTop = [0,1123,2255,3335,4140,5383];  
	var aLSlt = $(".slt6");    //团委直属部门 校学生会 科技联合会。。。。。。按钮
	for (var i = 0; i < aTitle.length; i++) {
		aTitle[i].index = i;
		aTitle[i].top = aTop[i];
	}
	innerSlideCon.onscroll = function () {
		var top = this.scrollTop;
		if (top < aTop[1]) {
			if (!hasClass(aLSlt[0],'select')) {
				toggleClass(0);
			}
		} else if (top < aTop[2] && top >= aTop[1] ) {
			if (!hasClass(aLSlt[1],'select')) {
				toggleClass(1);
			}
		} else if ( top < aTop[3] && top >= aTop[2] ) {
			if (!hasClass(aLSlt[2],'select')) {
				toggleClass(2);
			}
		} else if ( top < aTop[4] && top >= aTop[3] ) {
			if (!hasClass(aLSlt[3],'select')) {
				toggleClass(3);
			}
		} else if ( top < aTop[5] && top >= aTop[4] ) {
			if (!hasClass(aLSlt[4],'select')) {
				toggleClass(4);
			}
		} else if ( top >= aTop[5] ) {
			if (!hasClass(aLSlt[5],'select')) {
				toggleClass(5);
			}
		}
	};
	function slide (target) {
		var nowTop = innerSlideCon.scrollTop;
		var distancePiece = (nowTop - target)/15;
		var timer = setInterval(function () {
			if (Math.abs(innerSlideCon.scrollTop - target) <= Math.abs(distancePiece)) {
				innerSlideCon.scrollTop = target;
				clearInterval(timer);
				innerSlideCon.onscroll = function () {
					var top = this.scrollTop;
					if (top < aTop[1]) {
						if (!hasClass(aLSlt[0],'select')) {
							toggleClass(0);
						}
					} else if (top < aTop[2] && top >= aTop[1] ) {
						if (!hasClass(aLSlt[1],'select')) {
							toggleClass(1);
						}
					} else if ( top < aTop[3] && top >= aTop[2] ) {
						if (!hasClass(aLSlt[2],'select')) {
							toggleClass(2);
						}
					} else if ( top < aTop[4] && top >= aTop[3] ) {
						if (!hasClass(aLSlt[3],'select')) {
							toggleClass(3);
						}
					} else if ( top < aTop[5] && top >= aTop[4] ) {
						if (!hasClass(aLSlt[4],'select')) {
							toggleClass(4);
						}
					} else if ( top >= aTop[5] ) {
						if (!hasClass(aLSlt[5],'select')) {
							toggleClass(5);
						}
					}
				};
			}else {
				innerSlideCon.scrollTop -= distancePiece;
			}
		},13)
	}
	var contentW = $('#organization').offsetWidth;
	var slideCon = $('.slide-con')[1];
	var zswSltArr = $('.z-s-w-slt');   //校级组织 学生社团 红岩网校 按钮
	var aLSltL = aLSlt.length;
	for (var i = 0; i < zswSltArr.length; i++) {
		zswSltArr[i].index = i;
		zswSltArr[i].onclick = function () {    //点击这些 按钮 添加 class select  移除掉 sibling 的 class select
			for (var i = 0; i < zswSltArr.length; i++) {
				removeClass(zswSltArr[i],'select');
			}
			addClass(this,'select');
			move(slideCon,{left:-this.index*contentW + 'px'},450,'easeOut');
		}
	}
	for (var i = 0; i < aLSltL; i++) {
		aLSlt[i].index = i;
		aLSlt[i].onclick = function () {
			innerSlideCon.onscroll = null;
			toggleClass(this.index);
			slide(aTop[this.index]);
		}
	}
	function toggleClass (index) {
		for (var i = 0; i < aLSltL; i++) {
				removeClass(aLSlt[i],'select');
			};
		addClass(aLSlt[index],'select');
	}

	var aVideoArrow = $('.video-arrow');
	var aTeacherArrow = $('.teacher-arrow');
	var aXueziArrow = $('.xuezi-arrow');
	var aSlideDownCon = $('.slideDownCon');
	var videoSlideCon = $('#videoSlideCon');
	var teacherSlideCon = $('#teacherSlideCon');
	var videoSlideCon = $('#videoSlideCon');
	var xueziSlideCon = $('#xueziSlideCon');
	var aBtn = $('.btn');
	for (var i = 0; i < aBtn.length; i++) {
		aBtn[i].index = i;             
		aBtn[i].onclick = function () {
			for (var i = 0; i < aBtn.length; i++) {
				removeClass(aBtn[i],'select');
				removeClass(aSlideDownCon[i],'current');
			};
			addClass(this,'select');
			addClass(aSlideDownCon[this.index],'current');
		}
	}















	for ( var i = aVideoArrow.length - 1; i >= 0; i-- ) {
		aVideoArrow[i].index = i;
		aVideoArrow[i].onclick = function () {
			if (this.index === 0) {
				move(videoSlideCon,{left:'0px'},350,'easeOut')
			}else if (this.index === 1) {
				move(videoSlideCon,{left:'0px'},350,'easeOut')
			}
		}
	}
	var currentTeacherCon = 0;
	for ( var i = aTeacherArrow.length - 1; i >= 0; i-- ) {
		aTeacherArrow[i].index = i;
		aTeacherArrow[i].onclick = function () {
			if (this.index === 0) {
				if (currentTeacherCon != 0) {
					currentTeacherCon --;
				}else {
					currentTeacherCon = 2;
				}
			}else if (this.index === 1) {
				if (currentTeacherCon < 2) {
					currentTeacherCon ++;
				}else {
					currentTeacherCon = 0;
				}
			}
			move(teacherSlideCon,{left: -825*currentTeacherCon + 'px'},350,'easeOut')
		}
	}
	for ( var i = aXueziArrow.length - 1; i >= 0; i-- ) {
		aXueziArrow[i].index = i;
		aXueziArrow[i].onclick = function () {
			if (this.index === 0) {
				move(xueziSlideCon,{left:'0px'},350,'easeOut')
			}else if (this.index === 1) {
				move(xueziSlideCon,{left:'-825px'},350,'easeOut')
			}
		}
	}

	// 回到顶部
    $('#goTop').onclick = function () {
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

})()