var navLi = $('.navLi');
var slideBar = $('.slideBar')[0];
var currentPage = $('.currentPage')[0];
var navUl = $('.navUl')[0];
// slideBar.style.left = currentPage.offsetLeft + (currentPage.offsetWidth - slideBar.offsetWidth)/2 + 'px'; 
slideBarSlide(currentPage);   //初始化  slideBar  的left  指向当前页面  （存在 currentPage  的class 的li顶部导航）    //这里没用js写 是为了 实现更加流畅
for (var i = 0; i < navLi.length; i++) {
	navLi[i].onmouseenter = function () {slideBarSlide(this)};
};

function slideBarSlide (obj) {
		slideBar.style.left = obj.offsetLeft + (obj.offsetWidth - slideBar.offsetWidth)/2 + 'px';
}
navUl.onmouseleave = function () {
	slideBarSlide(currentPage);
}