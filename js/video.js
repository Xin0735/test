// 这些方法、属性和事件允许您使用 JavaScript 来操作 <audio> 和 <video> 元素
// 这些api 是原生js dom的操作 我们如果使用jquery 千万别忘了转换

// 6.6.4	计算视频播放的总时长
var video = $("video").get(0); // 获取元素：把jquery 对象转换为 dom对象
// 计算时分秒函数
function formatTime(time) {
    // 计算小时
    // 我们有总的秒 数  计算 小时
    // 1小时 60 * 60  ==  3600 
    // 4000 / 3600  = 1
    var h = Math.floor(time / 3600);
    // 计算 分数
    // 我们有总的秒 数  计算 分数
    // 
    // 4000 % 3600   = 400 / 60 
    var m = Math.floor(time % 3600 / 60);
    var s = Math.floor(time % 60);
    // 00:00:00
    return (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);

}
// 1. 当我们浏览器可以播放视频的时候，就让video 显示出来  让我们的时间显示出来
video.oncanplay = function () { // oncanplay 是 video 原生事件 所以用 video dom对象
    // oncanplay浏览器可以播放视频
    $("video").show(); // show 是jquery 方法 所以要用 jquery对象调用

    // 我们怎么得到视频的长度呢时间
    // duration 是视频属性 H5  返回视频的长度 要用原生的dom对象调用
    //console.log(video.duration);  164.815238 有小数

    var totalTime = formatTime(video.duration);
    // console.log(totalTime);
    // 让我们总的时长的盒字放入 总时长
    $(".total").html(totalTime);
}

// 6.6.5	实现视频播放和暂停效果
// 当我们点击按钮，如果有 fa-play  这个 我们就切换为 fa-pause   并且播放
$(".switch").on("click", function () {
    // 
    if ($(this).hasClass("fa-play")) { // 播放
        video.play(); // play视频的方法  需要用dom  播放视频

        $(this).addClass('fa-pause').removeClass("fa-play"); // 切换图标
    } else { // 暂停
        video.pause(); // pause 视频的方法  需要用dom  播放视频

        $(this).addClass("fa-play").removeClass('fa-pause'); // 切换图标

    }
})


// 6.6.11	使用按键控制视频的播放和暂停
// 监听键盘按键事件 13==Enter  32 ==	Spacebar
$(document).keypress(function (event) {
    var code = (event.keyCode ? event.keyCode : event.which);
    if (video != "" && (code == 13 || code == 32)) {
        if (video.paused) {
            video.play();
            $('.switch').addClass('fa-pause').removeClass("fa-play");
        } else {
            video.pause();
            $('.switch').addClass('fa-play').removeClass("fa-pause");
        }
    }
});


// 6.6.6    实现进度条显示效果时
//  除了自己进行之外， 只要我们修改了 video.currentTime  就会执行 ontimeupdate
video.ontimeupdate = function () {
    // console.log(11);
    // 我们需要知道当前的时间
    // console.log(video.currentTime); 得到是秒数
    // line 这个白色的盒子 宽度 =  当前的时间 / 总的时间  * 100 + % 
    var w = video.currentTime / video.duration * 100 + "%";
    // console.log(w)
    $(".line").css("width", w);
    // 4.显示我们的当前时间 
    $(".current").html(formatTime(video.currentTime));
}
//  6.6.7	实现视频全屏显示效果
$(".expand").on("click", function () {
    // 
    if ($(this).hasClass("fa-arrows-alt")) {

        $(".player").get(0).requestFullscreen(); // 让视频全屏显示   
        $(this).addClass('fa-compress').removeClass("fa-arrows-alt");

    } else {
        // 取消 全屏显示  跟元素无关 跟document有关系 
        document.exitFullscreen();
        // 切换图标
        $(this).addClass("fa-arrows-alt").removeClass('fa-compress');
    }
})

// 6.6.10	使用Esc键退出全屏
function checkFull() {
    var isFull = document.webkitIsFullScreen;
    if (isFull === undefined) {
        isFull = false;
    }
    return isFull;
}
$(window).resize(function () {
    if (!checkFull()) { // 退出全屏
        $('.expand').addClass("fa-arrows-alt").removeClass('fa-compress')
    }
});

// 6.6.8	实现视频播放完成后的重置操作
// 视频播放完毕 用 onended 事件
video.onended = function () {
    // 当前的视频时间清零 
    video.currentTime = 0;
    // 同时还要把 播放按钮改为 play
    $(".switch").addClass("fa-play").removeClass('fa-pause');
}

// 6.6.9	实现单击进度条视频跳转效果 
$(".bar").on("click", function (event) {
    // 当前视频的播放位置=单击的位置 / .bar盒子的长度 * 视频总的时长  =  当前视频的播放位置
    // 1. 获取单击的位置
    var offset = event.offsetX;
    // console.log(offset);
    // 2. 根据单击视频的播放位置计算要切换的时间
    var current = offset / $(this).width() * video.duration;
    // console.log(current);
    // 3. 把计算后的时间赋值给currentTime 
    video.currentTime = current;
})