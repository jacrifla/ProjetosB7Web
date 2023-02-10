let clickArray = document.querySelectorAll('.key')
// Identificar as teclas
document.body.addEventListener('keyup', (event) => {
    playSound(event.code.toLowerCase());
});


document.querySelector('.composer button').addEventListener('click', () => {
    let song = document.querySelector('#input').value;

    if (song !== '') {
        // separar as letras no input
        let songArray = song.split('');
       playComposition(songArray);
    }
})

clickArray.forEach(function(element){
    element.addEventListener('click', ()=>{
        let clickKey = element.getAttribute('data-key')
        playSound(clickKey);
    })
});

// criar função para tocar os audios
function playSound(sound) {
    let audioElement = document.querySelector(`#s_${sound}`);

    let keyElement = document.querySelector(`div[data-key="${sound}"]`);

    if (audioElement) {
        audioElement.currentTime = 0; // para o audio comecar do zero
        audioElement.play();
    }

    if(keyElement) {
        keyElement.classList.add('active');

        // remover a classe do elemento
        setTimeout(() => {
            keyElement.classList.remove('active');
        }, 300);
    }
}

function playComposition(songArray) {
    let wait = 0
    for(let songItem of songArray) {
        setTimeout(() => {
            playSound(`key${songItem}`);
        }, wait)

        wait += 250
    }
}