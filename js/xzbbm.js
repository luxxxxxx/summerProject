function addEvent (ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder);
    } else if (ele.attachEvent) {
        ele.attachEvent("on" + event, hanlder);
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

(function (){
    var contentNavItem = $('.content-nav-item');
    var quesContent = $('.ques');
    navCheckout($('.content-nav')[0], contentNavItem, 'content-nav-item', 'content-nav-active', 'click');
    for (var i = 0; i < contentNavItem.length; i++) {
        addEvent(contentNavItem[i], 'click', (function (n) {
            return function () {
                quesContent[0].style.left = -n * 914 + 'px';
            }
        })(i))
    }
})()

// 回到顶部
function backToTop () {
    var viewHeight = document.documentElement.clientHeight;
    var btn = $('.to-top-btn')[0],
        body = document.querySelector('body');
    function hanlder () {
        function decrease () {
            var pHeight = document.documentElement.scrollTop || document.body.scrollTop;
            var speed = pHeight / 9;
            document.documentElement.scrollTop -= speed;
            body.scrollTop -= speed;
            if (pHeight === 0) {
                clearInterval(timer);
            }
        }
        var timer = setInterval(decrease, 20);
        addEvent(window, 'mousewheel', function () {
            clearInterval(timer);
        })
        addEvent(window, 'DOMMouseScroll', function () {
            clearInterval(timer);
        })
    }
    // 按钮显示隐藏
    var flag = 0;
    function disp () {
        var pHeight = document.documentElement.scrollTop || document.body.scrollTop;
        if (pHeight > 500) {
            btn.style.opacity = '1';
        }
        if (pHeight <= 500) {
            btn.style.opacity = '0';
        }
    }
    addEvent(btn, 'click', hanlder);
    body.onscroll = disp;
}

backToTop();