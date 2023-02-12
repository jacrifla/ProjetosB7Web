let digitalElement = document.querySelector('.digital');
let psElement = document.querySelector('.p_s');
let pmElement = document.querySelector('.p_m');
let phElement = document.querySelector('.p_h');

function updateClock() {
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    digitalElement.innerHTML = `${fixZero(hour)}:${fixZero(minute)}:${fixZero(second)}`

    // calculo dos graus
    let sDeg = ((360 / 60) * second) - 90;
    let mDeg = ((360 / 60) * minute) - 90;
    let hDeg = ((360 / 12) * hour) - 90;

    // pra fazer o ponteiro mexer
    psElement.style.transform = `rotate(${sDeg}deg)`;
    pmElement.style.transform = `rotate(${mDeg}deg)`;
    phElement.style.transform = `rotate(${hDeg}deg)`;
};

function fixZero(time) {
    return time < 10 ? `0${time}` : time;
}
setInterval(updateClock, 1000);
updateClock();