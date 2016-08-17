(function () {

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

    function ajax (obj) {
        var request = new XMLHttpRequest();
        request.open(obj.type, obj.url, true);
        request.send();
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                var data = JSON.parse(request.responseText);
                obj.success(data);
            }
        }
    }

    function ajaxPost (obj) {
        var request = new XMLHttpRequest();
        request.open(obj.type, obj.url, true);
        request.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
        request.send(obj.postStr);
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                var data = JSON.parse(request.responseText);
                obj.success(data);
            }
        }
    }


    var quesStudy = $('.ques-study')[0],
        quesLife = $('.ques-life')[0],
        quesActi = $('.ques-acti')[0],
        quesOrg = $('.ques-org')[0];

    // 学习类
    ajax({
        'type'   : 'GET',
        'url'    : 'http://hongyan.cqupt.edu.cn/XZBBM/index.php/api/search/tag/%E5%AD%A6%E4%B9%A0',
        'success': function (data) {
            getdata(data, 'ques-study', 'title-study', 'author-study', 'time-study');
            showBox(data, '.title-study');
        }
    })

    // 生活类
    ajax({
        'type'   : 'GET',
        'url'    : 'http://hongyan.cqupt.edu.cn/XZBBM/index.php/api/search/tag/%E7%94%9F%E6%B4%BB',
        'success': function (data) {
            getdata(data, 'ques-life', 'title-life', 'author-life', 'time-life');
            showBox(data, '.title-life');
        }
    })

    // 活动类
    ajax({
        'type'   : 'GET',
        'url'    : 'http://hongyan.cqupt.edu.cn/XZBBM/index.php/api/search/tag/%E9%80%9A%E4%BF%A1',
        'success': function (data) {
            getdata(data, 'ques-acti','title-acti', 'author-acti', 'time-acti');
            showBox(data, '.title-acti');
        }
    })


    // 组织类  该类随机选择
    var urlArr = ['http://hongyan.cqupt.edu.cn/XZBBM/index.php/api/search/tag/%E9%80%9A%E4%BF%A1', 'http://hongyan.cqupt.edu.cn/XZBBM/index.php/api/search/tag/%E8%AE%A1%E7%AE%97%E6%9C%BA', 'http://hongyan.cqupt.edu.cn/XZBBM/index.php/api/search/tag/%E8%87%AA%E5%8A%A8%E5%8C%96', 'http://hongyan.cqupt.edu.cn/XZBBM/index.php/api/search/tag/%E5%85%89%E7%94%B5', 'http://hongyan.cqupt.edu.cn/XZBBM/index.php/api/search/tag/%E7%94%9F%E7%89%A9', 'http://hongyan.cqupt.edu.cn/XZBBM/index.php/api/search/tag/%E6%95%B0%E7%90%86', 'http://hongyan.cqupt.edu.cn/XZBBM/index.php/api/search/tag/%E6%B3%95%E5%AD%A6%E9%99%A2', 'http://hongyan.cqupt.edu.cn/XZBBM/index.php/api/search/tag/%E4%BC%A0%E5%AA%92', 'http://hongyan.cqupt.edu.cn/XZBBM/index.php/api/search/tag/%E4%BD%93%E8%82%B2', 'http://hongyan.cqupt.edu.cn/XZBBM/index.php/api/search/tag/%E8%BD%AF%E4%BB%B6', 'http://hongyan.cqupt.edu.cn/XZBBM/index.php/api/search/tag/%E5%A4%96%E5%9B%BD%E8%AF%AD', 'http://hongyan.cqupt.edu.cn/XZBBM/index.php/api/search/tag/%E5%9B%BD%E9%99%85', 'http://hongyan.cqupt.edu.cn/XZBBM/index.php/api/search/tag/%E5%85%88%E8%BF%9B%E5%88%B6%E9%80%A0'];
    ajax({
        'type'   : 'GET',
        'url'    : urlArr[Math.floor(Math.random() * 15)],
        'success': function (data) {
            getdata(data, 'ques-org','title-org', 'author-org', 'time-org');
            showBox(data, '.title-org');
        }
    })

    // 获取问题并输出
    function getdata (data, itemName, titleName, autorName, timeName) {
        var title = $('.' + titleName);
        var autor = $('.' + autorName);
        var time = $('.' + timeName);
        var answerItem = $('.' + itemName)[0];

        for (var i = 0; i < data.length; i++) {
            var titleS= '',
                autorS = '',
                timeS = '',
                str = '';
            titleS = data[i]['title'];
            autorS = data[i]['name'];
            var s = data[i]['create_time'].split(' ')[0].split('-');
            for(var j = 0; j < s.length; j++) {
                if (j !== s.length - 1) {
                    timeS += s[j] + '\\';
                } else {
                    timeS += s[j];
                }
            }
            titleS = '<p class="ques-title ' + titleName + '">' + titleS + '</p>';
            autorS = '<p class="ques-author ' + autorName + '">' + autorS + '</p>';
            timeS = '<p class="ques-time ' + timeName + '">' + timeS + '</p>';
            str += '<div class="ques-content">' + titleS + timeS + autorS + '</div>'
            answerItem.innerHTML += str;
        }
    }

    // 获取对应问题的回答和评论
    addEvent($('.answer-close')[0], 'click', function () {
        $('.answer-box')[0].style.display = 'none';
    })

    function showBox (data, titleName) {
        var box = $('.answer-box')[0],
            asker = $('.answer-asker')[0],
            answerBox = $('.answer-main')[0];
        var title = $(titleName);
        // 为每个问题设置弹框
        for (var i = 0; i < data.length; i++) {
            addEvent(title[i], 'click', (function (n) {
                return function () {
                    box.style.display = 'block';
                    asker.innerHTML =  '提问者：' + data[n]['name'];
                    
                    ajax({
                        'type'   : 'GET',
                        'url'    : 'http://hongyan.cqupt.edu.cn/XZBBM/index.php/api/question/' + data[n]['Id'],
                        // 'url'    : 'http://hongyan.cqupt.edu.cn/XZBBM/index.php/api/question/59',
                        'success': function (newData) {
                            var s = '';
                            var nowTime = new Date();
                            // 获取该问题的所有回复评论
                            for (var j = 0; j < newData['comment'].length; j++) {
                                var timeStr = newData['comment'][j]['create_time'].split(' ');
                                var timeSec = new Date(timeStr[0]);
                                var len = newData['comment'][j]['pic_name'].length,
                                    imgStr = '';

                                // 获取每个评论的时间
                                if (nowTime.getDate() !== timeSec.getDate()) {
                                    timeStr = timeStr[0].split('-')[1] + '月' + timeStr[0].split('-')[2] + '日';
                                } else {
                                    timeStr = timeStr[1].split(':')[0] + '点' + timeStr[1].split(':')[1] + '分';
                                }

                                // 对每个评论进行判断是否含有图片
                                if (len === 0) {
                                    s += '<div class="answer-item"><div class="answer-user">' + newData['comment'][j]['name'] + '：' + '</div>' + '<p class="answer-content">' + newData['comment'][j]['content'] + '</p>' + '<div class="answer-time">' + timeStr + '</div></div>';
                                } else {
                                    for (var k = 0; k < len; k++) {
                                        imgStr += '<img src="' + 'http://hongyan.cqupt.edu.cn/XZBBM/index.php/api/showImg/' + newData['comment'][j]['pic_name'][k] + '">';
                                    }
                                    console.log(imgStr);
                                    s += '<div class="answer-item"><div class="answer-user">' + newData['comment'][j]['name'] + '：' + '</div>' + '<p class="answer-content">' + newData['comment'][j]['content'] + imgStr + '</p>' + '<div class="answer-time">' + timeStr + '</div></div>';
                                }
                            }
                            // 将所有评论输出到弹框中
                            answerBox.innerHTML = s;
                            var AnserBox = $('.answer-box')[0];
                            var answerImg = answerBox.querySelectorAll('img');
                            if (answerImg) {  //判断答案栏里面是否有图片  点击放大到原始比例（设置过最大宽高 防止意外情况）
                                for (var i = 0; i < answerImg.length; i++) {
                                    answerImg[i].isFixed = false;
                                    addEvent(answerImg[i],'click',function(){
                                        if (!this.isFixed) {
                                            this.isFixed = true;
                                            this.style.width = "100%";
                                            this.style.height = "100%";
                                        } else {
                                            this.isFixed = false;
                                            this.style.width = '90px';
                                            this.style.height = '90px';
                                        }
                                        
                                    })
                                }
                            }
                        }
                    })
                }
            })(i))
        }
    }


    // var xz = $('.people-item'),
    //     xzBox = $('.xz-box')[0],
    //     xzInfo = $('.xz-info')[0],
    //     xzClose = $('.xz-close')[0];

    // addEvent(xzClose, 'click', function () {
    //     xzBox.style.display = 'none';
    // })

    // ajax({
    //     'type'   : 'GET',
    //     'url'    : 'http://hongyan.cqupt.edu.cn/XZBBM/index.php/api/userRandom/5',
    //     'success': function (data) {
    //         var peopleContent = $('.content-people')[0];
    //         var s = '';
    //         for (var i = 0; i < 5; i++) {
    //             var imgStr = '',
    //                 nameStr = '',
    //                 collegeStr = '';
    //             // data[i]['photo']
    //             if (data[i]['photo'] === null) {
    //                 imgStr += '<div class="people-avatar"><img src="img/gonglue/mr.jpg" alt=""></div>'
    //             } else {
    //                 imgStr += '<div class="people-avatar"><img src="' + data[i]['photo'] +'" alt=""></div>'
    //             }
    //             nameStr += '<div class="pelple-name">' + data[i]['name'] + '</div>';
    //             collegeStr = '<div class="people-academy">' + data[i]['college'] + '</div>'
    //             s += '<div class="people-item people-fir">' + imgStr + nameStr + collegeStr + '</div>';
    //             console.log(data[i]['photo']);
    //         }

    //         peopleContent.innerHTML = s;

    //         for (var j = 0; j < 5; j++) {
    //             addEvent(xz[j], 'click', (function (n) {
    //                 return function () {
    //                     var str = '';
    //                     var imgStr = '';
    //                     if (data[n]['photo'] === null) {
    //                         imgStr = '<img src="img/gonglue/mr.jpg" alt="">';
    //                     } else {
    //                         imgStr = '<img src="' + data[n]['photo'] + '" alt="">';
    //                     }
    //                     xzBox.style.display = 'block';
    //                     str = '<div class="xz-info-avatar">' + imgStr + '</div><div class="xz-name">' + data[n]['name'] + '</div><p class="xz-intr">' + data[n]['biography'] + '</p>'
    //                     xzInfo.innerHTML = str;
    //                 }
    //             })(j))
    //         }
    //     }
    // })

})();