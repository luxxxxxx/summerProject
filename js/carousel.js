// 绑定事件
function addEvent (ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder);
    } else if (ele.attachEvent) {
        ele.attachEvent("on" + event, hanlder);
    } else {
        ele["on" + event] = hanlder;
    }
}

function removeEvent (ele, event, hanlder) {
    if (ele.removeEventListener) {
        ele.removeEventListener(event, hanlder);
    } else if (ele.detachEvent) {
        ele.detachEvent('on' + event, hanlder);
    } else {
        ele["on" + event] = null;
    }
} 
// 导航
function navCheckout (ele, item, itemCN, activeCN, event) {
    addEvent(ele, event, function (e) {
        if (e.target && e.target.tagName.toUpperCase() === 'LI') {
            if (!hasClass(e.target, activeCN)) {
                clearClassName(item, itemCN);
                e.target.className += ' ' + activeCN;
            }
        }
    })
}
// 循环恢复类名
function clearClassName (ele, classN) {
    for (var i = 0; i < ele.length; i ++) {
        ele[i].className = classN;
    }
}
// 轮播图
function Carousel (container, imgBox, leftBtn, rightBtn, picNum, offsets, time) {
        var index = 1,
            timer = 0;
    function switchPics (offset) {
        var newPos = parseInt(imgBox.style.left) + offset;
        imgBox.style.left = newPos + 'px';
        if (newPos < -offsets * (picNum - 1)) {
            imgBox.style.left = '0px';
        }
        if (newPos > 0) {
            imgBox.style.left = (picNum - 1) * -offsets + 'px';
        }
    }
    
    function playCarousel () {
        function click () {
            index += 1;
            if (index > picNum) {
                index = 1;
            }
            if (index < 1) {
                index = picNum;
            }
            var imgSrc = imgBox.children[index - 1].alt;
            if (imgSrc) {
                imgBox.children[index - 1].src = imgSrc;
            }
            switchPics(-offsets);
        }
        timer = setInterval(click, time);
    }
    playCarousel();
    function stopCarousel () {
        clearInterval(timer);
    }
    leftBtn.addEventListener('mouseover', function () {
        stopCarousel();
    })
    rightBtn.addEventListener('mouseover', function () {
        stopCarousel();
    })
    leftBtn.addEventListener('mouseout', function () {
        playCarousel();
    })
    rightBtn.addEventListener('mouseout', function () {
        playCarousel();
    })
    leftBtn.addEventListener('click', function () {
        index -= 1;
        if (index > picNum) {
            index = 1;
        }
        if (index < 1) {
            index = picNum;
        }
        // console.log(index);
        var imgSrc = imgBox.children[index - 1].alt;
        if (imgSrc) {
            imgBox.children[index - 1].src = imgSrc;
        }
        // console.log(imgBox.children[index - 1].src);
        switchPics(offsets);
    })
    rightBtn.addEventListener('click', function () {
        index += 1;
        if (index > picNum) {
            index = 1;
        }
        if (index < 1) {
            index = picNum;
        }
        var imgSrc = imgBox.children[index - 1].alt;
        if (imgSrc) {
            imgBox.children[index - 1].src = imgSrc;
        }
        // console.log(index);
        // console.log(imgBox.children[index - 1].src);
        switchPics(-offsets);
    })
    container.addEventListener('mouseover', stopCarousel);
    container.addEventListener('mouseout', playCarousel);
}
// 绑定轮播
(function () {
    var zbCon    = $('.zb-life-img');
    var rcImgBox = $('.rc-img-box');
        msImgBox = $('.ms-img-box');
        mjImgBox = $('.mj-img-box');
    var zbLbtn   = $('.life-lbtn');
    var zbRbtn   = $('.life-rbtn');

    Carousel($('.img-container')[0], $('.img-box')[0], $('.img-left')[0], $('.img-right')[0], 4, 428, 2000);
    Carousel(zbCon[0], rcImgBox[0], zbLbtn[0], zbRbtn[0], 19, 664, 2300);
    Carousel(zbCon[1], msImgBox[0], zbLbtn[1], zbRbtn[1], 63, 664, 2300);
    Carousel(zbCon[2], mjImgBox[0], zbLbtn[2], zbRbtn[2], 8, 664, 2300);
})()

function checkout () {
    var nav = $('.guidance-nav'),
        glNav = $('.guidance-nav-item');
        zbNav = $('.zb-nav-item');
    var warp = $('.guidance-content-wrap');
    var btn = $('.guid-btn');
    var glContain = $('.cqupt-gonglue');
    // var sidebar = $('.guidance-side-bar'),
        // sidebarItem = $('.side-bar-item');
    // 导航一
    navCheckout(nav[0], glNav, 'guidance-nav-item', 'gl-nav-active', 'click');
    for (var i = 0; i < glNav.length; i++) {
        glNav[i].addEventListener('click', (function (n) {
            return function () {
                warp[0].style.left = -n * 961 + 'px';
            }
        })(i), false);
    }
    // 导航二
    navCheckout(nav[1], zbNav, 'zb-nav-item', 'zb-nav-active', 'click');
    for (var i = 0; i < zbNav.length; i++) {
        zbNav[i].addEventListener('click', (function (n) {
            return function () {
                warp[1].style.left = -n * 961 + 'px';
            }
        })(i), false);
    }
    // 二级导航
    btn[0].addEventListener('click', function () {
        btn[0].className += ' guid-btn-active';
        btn[1].className = 'zb-btn guid-btn';
        glContain[1].style.top = '-858px';
        glContain[1].style.right = '-961px';
        glContain[0].style.top = '116px';
        glContain[0].style.left = '0px';
    })
    btn[1].addEventListener('click', function () {
        btn[1].className += ' guid-btn-active';
        btn[0].className = 'zb-btn guid-btn';
        glContain[0].style.top = '-858px';
        glContain[0].style.left = '-961px';
        glContain[1].style.top = '116px';
        glContain[1].style.right = '0px';
    })
    //sidebar
    // navCheckout(sidebar[0], sidebarItem, 'side-bar-item', 'side-bar-active', 'click');
}
checkout();

(function () {
    // var scroll = $('.side-need-kown')[0];
    // var sidebarItem = $('.side-bar-item');
    // var flag = 0;
    // sidebar(sidebarItem[0], 0, scroll);
    // sidebar(sidebarItem[1], 638, scroll);
    // sidebar(sidebarItem[2], 5932, scroll);
    // sidebar(sidebarItem[3], 7750, scroll);

    // 声明flag变量来控制滚动条还没结束时再次点击触发滚动条发生的冲突bug
    // function sidebar (ele, pos, scrollContainer, time) {
    //     addEvent(ele, 'click', function () {
    //         if (flag === 0) {
    //             flag = 1;
    //             function  changePos () {
    //                 var y = scrollContainer.scrollTop,
    //                     dis = pos - y,
    //                     speed = dis / 7;
    //                 scrollContainer.scrollTop += speed;
    //                 if (Math.abs(dis) < 10) {
    //                     clearInterval(time);
    //                     flag = 0;
    //                 }
    //             }
    //             time = setInterval(changePos, 20);
    //         }
    //     })
    // }
    // 滚动条滚动对应sidebar按钮样式改变
    // addEvent(scroll, 'scroll', function () {
    //     var pos = scroll.scrollTop;
    //     if (pos <= 484) {
    //         clearClassName(sidebarItem, 'side-bar-item');
    //         addClass(sidebarItem[0], 'side-bar-active');
    //     } else if (pos < 5800 && pos > 484) {
    //         clearClassName(sidebarItem, 'side-bar-item');
    //         addClass(sidebarItem[1], 'side-bar-active');
    //     } else if (pos >= 5800 && pos < 7527) {
    //         clearClassName(sidebarItem, 'side-bar-item');
    //         addClass(sidebarItem[2], 'side-bar-active');
    //     } else {
    //         clearClassName(sidebarItem, 'side-bar-item');
    //         addClass(sidebarItem[3], 'side-bar-active');
    //     }
    // })

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