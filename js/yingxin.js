(function (){

function addEvent (ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder);
    } else if (ele.attachEvent) {
        ele.attachEvent("on" + event, hanlder);
    } else {
        ele["on" + event] = hanlder;
    }
}
    var container = $('.content-main')[0],
        leftBtn = $('.content-btn-item')[0],
        rightBtn = $('.content-btn-item')[1];
    addEvent(leftBtn, 'click', function () {
        rightBtn.className = 'content-btn-item right-btn';
        if (leftBtn.className.indexOf('active') === -1) {
            leftBtn.className += ' btn-active';
        }
        container.style.left = '0px';
    })
    addEvent(rightBtn, 'click', function () {
        leftBtn.className = 'content-btn-item'
        if (rightBtn.className.indexOf('active') === -1) {
            rightBtn.className += ' btn-active';
        }
        container.style.left = '-961px';
    })


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
})()