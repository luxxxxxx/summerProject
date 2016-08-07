function addEvent (ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else {
        ele["on" + event] = hanlder;
    }
}

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

function clearClassName (ele, classN) {
    for (var i = 0; i < ele.length; i ++) {
        ele[i].className = classN;
    }
}

function Carousel (container, imgBox, leftBtn, rightBtn, offsets, time) {
        var index = 0,
            timer = 0;
    function switchPics (offset) {
        var newPos = parseInt(imgBox.style.left) + offset;
        imgBox.style.left = newPos + 'px';
        if (newPos < -offsets * 2) {
            imgBox.style.left = '0px';
        }
        if (newPos > 0) {
            imgBox.style.left = '0px';
        }
    }
    
    function playCarousel () {
        function click () {
            index += 1;
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
        switchPics(offsets);
    })
    rightBtn.addEventListener('click', function () {
        index += 1;
        switchPics(-offsets);
    })
    container.addEventListener('mouseover', stopCarousel);
    container.addEventListener('mouseout', playCarousel);
}
// 绑定轮播
(function () {
    var zbCon    = $('.zb-life-img');
    var zbImgBox = $('.life-img-box');
    var zbLbtn   = $('.life-lbtn');
    var zbRbtn   = $('.life-rbtn');

    Carousel($('.img-container')[0], $('.img-box')[0], $('.img-left')[0], $('.img-right')[0], 428, 3000);
    for (var i = 0; i < zbCon.length; i++) {
        Carousel(zbCon[i], zbImgBox[i], zbLbtn[i], zbRbtn[i], 664, 3000);
    }
})()

function checkout () {
    var nav = $('.guidance-nav'),
        glNav = $('.guidance-nav-item');
        zbNav = $('.zb-nav-item');
    var warp = $('.guidance-content-wrap');
    var btn = $('.guid-btn');
    var glContain = $('.cqupt-gonglue');
    var sidebar = $('.guidance-side-bar'),
        sidebarItem = $('.side-bar-item');
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
    console.log(sidebarItem);
    navCheckout(sidebar[0], sidebarItem, 'side-bar-item', 'side-bar-active', 'click');
}
checkout();



// function scrollbar () {
//     var barCon = $('.scrollbar');
//     var bar = $('.scrollbar-btn');
//     for (var i = 0; i < bar.length; i++) {
//         addEvent(bar[i], 'click', (function (n) {
//             addEvent(bar[i], 'mousemove', function () {
//                 console.log(barCon[i].layerY);
//             })
//         })(i))
//     }
// }
// scrollbar();