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