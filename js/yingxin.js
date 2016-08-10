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
})()