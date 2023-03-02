// Dados Iniciais

// Exibir primeiro as questões
let currentQuestion = 0
let correctAnswers = 0
showQuestion()

// Eventos
document.querySelector('.scoreArea button').addEventListener('click', resetEvent)

// Funções
function showQuestion() {
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion] // para ficar menor o comando

        let pct = Math.floor((currentQuestion / questions.length) * 100)

        document.querySelector('.progress--bar').style.width = `${pct}%` // mover a barra pela porcentagem
        
        document.querySelector('.scoreArea').style.display = 'none'
        document.querySelector('.questionArea').style.display = 'block'

        document.querySelector('.question').innerHTML = q.question
        document.querySelector('.options').innerHTML = ''
        
        let optionsHtml = ''
        for (let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span> ${q.options[i]}</div>`
        }
        document.querySelector('.options').innerHTML = optionsHtml // vai inserir na tela

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent)
        })
    } else {
        finishQuiz()
    }
}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'))
    if (questions[currentQuestion].answer === clickedOption) { // Para ver c acertou
        correctAnswers++   
    }

    currentQuestion++
    showQuestion()
}

function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100)
    if (points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Ta ruin hein?!'
        document.querySelector('.scorePct').style.color = '#ff0000'
    } else if (points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito bom!'
        document.querySelector('.scorePct').style.color = '#ffff00'
    } else if (points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns!'
        document.querySelector('.scorePct').style.color = '#0d630d'
    }
    
    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`

    document.querySelector('.scoreArea').style.display = 'block'
    document.querySelector('.questionArea').style.display = 'none'
    document.querySelector('.progress--bar').style.width = `100%`


}

function resetEvent() {
    correctAnswers = 0
    currentQuestion = 0
    showQuestion()
}