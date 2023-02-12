// puxando os elementos do html
let digitalElement = document.querySelector('.digital');
let sElement = document.querySelector('.p_s');
let mElement = document.querySelector('.p_m');
let hElement = document.querySelector('.p_h');

// funcao pra o funcionamento dos relogios
function updateClock() {
    // pegando a hora, minutos e segundos
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    // relogio digital
    digitalElement.innerHTML = `${fixZero(hour)}:${fixZero(minute)}:${fixZero(second)}`

    // calculo dos graus
    let sDeg = ((360 / 60) * second) - 90;
    let mDeg = ((360 / 60) * minute) - 90;
    let hDeg = ((360 / 12) * hour) - 90;

    // pra fazer o ponteiro mexer
    sElement.style.transform = `rotate(${sDeg}deg)`;
    mElement.style.transform = `rotate(${mDeg}deg)`;
    hElement.style.transform = `rotate(${hDeg}deg)`;
};

// Função para ter um zero se o numero for menor que 10
function fixZero(time) {
    return time < 10 ? `0${time}` : time;
}
setInterval(updateClock, 1000);
updateClock();