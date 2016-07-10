window.onload = function () {
    slide();
    //var slideUl = document.querySelector('#slide').querySelector('ul');

    search()
    downTime()
}


function downTime() {
    var time = 5 * 60 * 60;
    var spans = document.querySelector('.seckill-time').children
    var timer = setInterval(function () {
        time--;
        var h=time/3600;
        var min=time%3600/60;
        var miao=time%60;
        spans[0].innerHTML=Math.floor(h/10);
        spans[1].innerHTML=Math.floor(h%10);
        spans[3].innerHTML=Math.floor(min/10);
        spans[4].innerHTML=Math.floor(min%10);
        spans[6].innerHTML=Math.floor(miao/10);
        spans[7].innerHTML=Math.floor(miao%10);

    },1000)

}

function slide() {
    //获取页面元素
    var slideUl = document.querySelector('#slide').querySelector('ul');
    var slidelis = document.querySelector('#slide').querySelectorAll('ul')[1].children;
    var index = 1;
    var liWidth = document.querySelector('#slide').offsetWidth;
    document.querySelector('#slide').querySelector('ul').style.transform = 'translateX(-10%)';
    var timer = setInterval(function () {

        index++;
        //改变UL的位置让他向左走一个图片的距离
        ulTranslateX()
        ulTransition()
        //console.log(index);
    }, 1000);
    //当index走完第八个后然图片抽回第一个
    slideUl.addEventListener('transitionend', function () {
        if (index >= 9) {
            index = 1;
            ulTranslateX()
            removeTransition()
        } else if (index <= 0) {
            index = 8
            ulTranslateX()
            removeTransition()
        }
        //让下面的小圆点也跟着走
        for (var i = 0; i < slidelis.length; i++) {
            slidelis[i].className = "";
        }
        slidelis[index - 1].className = "current";
        //console.log(slidelis);
    });

    //当我们用手向滑动的时候向左滑动让index++向右滑动让index--
    slideUl.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
        clearInterval(timer);
        //console.log(1)
        //当滑动的时候定时切也在走，我们先清除了定时器
    });

    //现在我们来解决滑动过程中的问题

    slideUl.addEventListener('touchmove', function (e) {
        //如果我们只滑动了这个图片3/1的距离说明我们不想切换图片，保持现在这张，反之

        moveX = e.touches[0].clientX;
        moveDistanceX = moveX - startX;
        //console.log(moveDistanceX);
        //这个是移动的像素
        var x = moveDistanceX + -index * liWidth
        slideUl.style.transform = 'translateX(' + x + 'px)'
        //这是每个li的宽度
        removeTransition()


    })

    slideUl.addEventListener('touchend', function (e) {
        endX = e.changedTouches[0].clientX;
        changeX = endX - startX
        //我们要判断用户滑了多少距离,如果滑动的距离超过3/1就让他换图，没有的话就保持本图
        if (Math.abs(changeX) > liWidth * 1 / 3) {
            if (changeX < 0) {
                index++;
                ulTranslateX()
                ulTransition()
            } else if (changeX > 0) {
                index--;
                ulTranslateX()
                ulTransition()
            }
        }
        else {
            index = index
            ulTranslateX()
            ulTransition()
        }


//当滑动完成在把定时器开开，注意这里一定不能 再次var timer这样就相当于在开了一个定时器
        timer = setInterval(function () {
            index++;
            ulTranslateX()
            ulTransition()
            //console.log(index);
        }, 2000);
    });


    function ulTranslateX() {
        slideUl.style.transform = 'translateX(' + -index * 10 + '%)'
    }

    function ulTransition() {
        slideUl.style.transition = 'all 0.2s'
    }

    function removeTransition() {
        slideUl.style.transition = 'none'
    }

}


//顶部下滑由透明边红色
function search() {
    var topbar = document.querySelector('.topbar');
    var slideHigth = document.querySelector('#slide').offsetHeight;
    window.onscroll = function () {
        var scrollTop = document.body.scrollTop;
        var opacity = scrollTop / slideHigth
        topbar.style.background = "rgba(201,21,25," + opacity + ")";
    }
}