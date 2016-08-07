function addEvent (ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else {
        ele["on" + event] = hanlder;
    }
}

function Carousel (container, imgBox, leftBtn, rightBtn, offsets, time, num) {
        var index = 0,
            timer = 0;
    function switchPics (offset) {
        var newPos = parseInt(imgBox.style.left) + offset;
        imgBox.style.left = newPos + 'px';
        if (newPos < -offsets * (num - 1)) {
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
Carousel($('.img-container')[0], $('.img-box')[0], $('.img-left')[0], $('.img-right')[0], 428, 2300, 4);
var zbCon    = $('.zb-life-img');
var zbImgBox = $('.life-img-box');
var zbLbtn   = $('.life-lbtn');
var zbRbtn   = $('.life-rbtn');
for (var i = 0; i < zbCon.length; i++) {
    Carousel(zbCon[i], zbImgBox[i], zbLbtn[i], zbRbtn[i], 664, 2300, 3);
};

function checkout () {
    var glNav = $('.guidance-nav-item'),
        zbNav = $('.zb-nav-item');
    var warp = $('.guidance-content-wrap');
    var btn = $('.guid-btn');
    var glContain = $('.cqupt-gonglue');
    for (var i = 0; i < glNav.length; i++) {
        glNav[i].addEventListener('click', (function (n) {
            return function () {
                for (var j = 0; j < glNav.length; j++) {
                    glNav[j].className = 'guidance-nav-item';
                }
                glNav[n].className += ' gl-nav-active';
                warp[0].style.left = -n * 961 + 'px';
            }
        })(i), false);
    }
    for (var i = 0; i < zbNav.length; i++) {
        zbNav[i].addEventListener('click', (function (n) {
            return function () {
                for (var j = 0; j < zbNav.length; j++) {
                    zbNav[j].className = 'zb-nav-item';
                }
                zbNav[n].className += ' zb-nav-active';
                warp[1].style.left = -n * 961 + 'px';
            }
        })(i), false);
    }
    btn[0].addEventListener('click', function () {
        btn[0].className += ' guid-btn-active';
        btn[1].className = 'zb-btn guid-btn';
        glContain[1].style.top = '-858px';
        glContain[1].style.right = '-1061px';
        glContain[0].style.top = '116px';
        glContain[0].style.left = '0px';
    })
    btn[1].addEventListener('click', function () {
        btn[1].className += ' guid-btn-active';
        btn[0].className = 'zb-btn guid-btn';
        glContain[0].style.top = '-858px';
        glContain[0].style.left = '-1061px';
        glContain[1].style.top = '116px';
        glContain[1].style.right = '0px';
    })
}
// var nav = $('.guidance-nav'),
//     glNav = $('.guidance-nav-item');
//     zbNav = $('.zb-nav-item');
// var warp = $('.guidance-content-wrap');
// var btn = $('.guid-btn');
// var glContain = $('.cqupt-gonglue');
// navCheckout(nav[0], glNav, 'guidance-nav-item', 'gl-nav-active', 'click');
// function navCheckout (ele, item, itemCN, activeCN, event) {
//     addEvent(ele, event, function (e) {
//         if (e.target && e.target.tagName.toUpperCase() === 'LI') {
//             if (!hasClass(e.target, activeCN)) {
//                 for (var i = 0; i < item.length; i ++) {
//                     console.log(item);
//                 }
//                 e.target.className += ' ' + activeCN;
//             }
//         }
//     })
// }

// function clearClassName (ele, classN) {
//     for (var i = 0; i < ele.length; i ++) {
//         ele.className = classN;
//     }
// }

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