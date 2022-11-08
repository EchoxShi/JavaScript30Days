const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const progress = player.querySelector('.progress');
const progress__filled = player.querySelector('.progress__filled');

function togglePlay() {
    console.dir(video.paused);
    // if (video.paused) {
    //     video.play();
    // } else {
    //     video.pause();
    // }
    const methond = video.paused ? 'play' : 'pause';
    video[methond]();
}
function uodateToggle() {
    const icon = video.paused ? '►' : '暂停';
    toggle.textContent = icon;
}

function skip() {
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
    
}
function handleRange() {
    // console.log(this.name,this.value);
    video[this.name] = this.value;
}
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progress__filled.style.flexBasis = `${percent}%`;
}
function screb (e) {
    console.log(e);
    const screbTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = screbTime;
}

toggle.addEventListener('click',togglePlay);
video.addEventListener('click',togglePlay);
video.addEventListener('pause',uodateToggle);
video.addEventListener('play',uodateToggle);

//视频的播放时间自动更新时会自动触发一个事件，即 timeupdate
video.addEventListener('timeupdate',handleProgress);

skipButtons.forEach(skipButton => skipButton.addEventListener('click',skip));
ranges.forEach(range => range.addEventListener('change',handleRange));
//move的时候由于进度条的value值没有改变，所以,调用时间处理函数也没有什么影响。
ranges.forEach(range => range.addEventListener('mousemove',handleRange));

progress.addEventListener('click',screb);
let mousedown = false;//看鼠标有没有按下去
progress.addEventListener('mousedown',() => mousedown = true);
progress.addEventListener('mouseup',() => mousedown = false);

// progress.addEventListener('mousemove',(e) => {
//     if (mousedown) {
//         screb(e);
//     }
// });

//前面条件为真 才执行后边的代码，可以这样简写
progress.addEventListener('mousemove', (e) => {mousedown && screb(e)})