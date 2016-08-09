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