function Carousel (doc, containerCN, imgBoxCN, Lbtn, Rbtn, offsets, time) {
    var container = doc.querySelector('.' + containerCN),
        imgBox    = doc.querySelector('.' + imgBoxCN),
        leftBtn   = doc.querySelector('.' + Lbtn),
        rightBtn  = doc.querySelector('.' + Rbtn),
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
Carousel(document, 'img-container', 'img-box', 'img-left', 'img-right', 428, 3000);
function checkout () {
    var nav = $('.guidance-nav-item');
    var warp = $('.guidance-content-wrap')[0];
    for (var i = 0; i < nav.length; i++) {
        nav[i].addEventListener('click', (function (n) {
            return function () {
                warp.style.left = -n * 961 + 'px';
            }
        })(i), false);
    }
}
checkout();