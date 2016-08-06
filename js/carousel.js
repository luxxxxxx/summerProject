function Carousel (container, imgBox, leftBtn, rightBtn, offsets, time) {
        index     = 0,
        timer;
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
Carousel($('.img-container')[0], $('.img-box')[0], $('.img-left')[0], $('.img-right')[0], 428, 3000);
var zbCon    = $('.zb-life-img');
var zbImgBox = $('.life-img-box');
var zbLbtn   = $('.life-lbtn');
var zbRbtn   = $('.life-rbtn');
for (var i = 0; i < zbCon.length; i++) {
    Carousel(zbCon[i], zbImgBox[i], zbLbtn[i], zbRbtn[i], 664, 3000);
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
        glContain[0].style.top = '116px';
    })
    btn[1].addEventListener('click', function () {
        btn[1].className += ' guid-btn-active';
        btn[0].className = 'zb-btn guid-btn';
        glContain[0].style.top = '-858px';
        glContain[1].style.top = '116px';
    })
}
checkout();