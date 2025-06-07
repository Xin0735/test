// reurn false 禁止函数内部执行其他的事件或者方法
var vol = 0.1; // 1代表100%音量，每次增减0.1
var time = 10; // 单位秒，每次增减10秒
var videoElement = document.getElementById('videoPlay')
document.onkeyup = function (event) { // 键盘事件
  console.log('keyCode:' + event.keyCode)
  var e = event || window.event || arguments.callee.caller.arguments[0]
  // 鼠标上下键控制视频音量
  if (e && e.keyCode === 38) {
    // 按 向上键
    videoElement.volume !== 1 ? videoElement.volume += vol : 1
    return false
  } else if (e && e.keyCode === 40) {
    // 按 向下键
    videoElement.volume !== 0 ? videoElement.volume -= vol : 1
    return false
  } else if (e && e.keyCode === 37) {
    // 按 向左键
    videoElement.currentTime !== 0 ? videoElement.currentTime -= time : 1
    return false
  } else if (e && e.keyCode === 39) {
    // 按 向右键
    videoElement.volume !== videoElement.duration ? videoElement.currentTime += time : 1
    return false
  } else if (e && e.keyCode === 32) {
    // 按空格键 判断当前是否暂停
    videoElement.paused === true ? videoElement.play() : videoElement.pause()
    return false
  }
}
