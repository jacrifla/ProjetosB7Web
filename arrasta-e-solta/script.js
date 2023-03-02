document.querySelector('.neutralArea').addEventListener('click', (e) => {
    // currentTarget é pra quem leva o evento
    
    e.currentTarget.style.border = '1px solid #ff0000'
    console.log('Current Target',  e.currentTarget);
})