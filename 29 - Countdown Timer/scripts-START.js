const timeDisplay = document.querySelector('.display__time-left');
const endtimeDisplay = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

let countdown;
function timer(secondes) {
    //清楚上一次的
    clearInterval(countdown);
    const now = Date.now(); //毫秒
    const then = now + secondes * 1000;
    
    showEndTine(then);
    showTimeLeft(secondes);

    countdown = setInterval(() => {
        //用最后的时间减去 date.now
        const secondesLeft = Math.round((then - Date.now()) / 1000);
        console.log(secondesLeft);
        if (secondesLeft < 0) {
            clearInterval(countdown);
            return;
        }
        showTimeLeft(secondesLeft);
    },1000)
}

function showTimeLeft (secondes) {
    const mins = Math.floor(secondes / 60);
    const remainSeconds = secondes % 60;
    console.log(mins,remainSeconds)
    const display = `${mins}:${remainSeconds < 10 ? '0':''}${remainSeconds}`
    timeDisplay.textContent = display;
}

function showEndTine(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const mins = end.getMinutes();
    const endDisplay = `在${hour}:${mins < 10 ? '0':''}${mins}停止`;
    endtimeDisplay.textContent = endDisplay;

}

function startTimer () {
    const seconds = this.dataset.time;
    
    timer(seconds);
}
buttons.forEach(button => button.addEventListener('click',startTimer))

document.customForm.addEventListener('submit',function (e) {
    console.log('dddddddddddd')
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
})
