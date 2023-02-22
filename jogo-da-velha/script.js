//  Dados iniciais
let board = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};

let playing = false;
let turn = 'x';
let warning = '';

reset();

// Eventos
document.querySelector('.reset').addEventListener('click', reset);

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick)
})

// Funções
function itemClick(evento) {
    let item = evento.target.getAttribute('data-item');

    if (playing && board[item] == '') {
        board[item] = turn;
        renderBoard();
        togglePlayer();
    }
};

function reset() {
    warning = '';

    let random = Math.floor(Math.random() * 2);
    turn = (random === 0) ? 'x' : 'o';

    for (let i in board) {
        board[i] = '';
    }

    
    renderBoard();
    renderInfo();

    playing = true;
}

function renderBoard() {
    for(let i in board) {
        let item = document.querySelector(`div[data-item=${i}]`);
        if(board[i] !== '') {
            item.innerHTML = board[i];
        } else {
            item.innerHTML = '';
        }
    }
    checkGame();
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = turn;
    document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer() {
    turn = turn === 'x' ? 'o' : 'x';
    renderInfo();
}

function checkGame() {
    if (checkWinnerFor('x')){
        warning = 'O "x" venceu';
        playing = false;
    } else if (checkWinnerFor('o')) {
        warning = 'O "o" venceu';
        playing = false;
    } else if (isFull()){
        warning = 'Deu empate';
        playing = false;
    }
}

function checkWinnerFor(player) {
    let possibilities = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',
        
        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for (let w in possibilities) {
        let pArray = possibilities[w].split(',');
        let hasWon = pArray.every(option => board[option] === player);
        if (hasWon) {
            return true;
        }
    }
    return false;
}

function isFull() {
    for (let i in board){
        if(board[i] === ''){
            return false;
        }
    }
    return true;
}