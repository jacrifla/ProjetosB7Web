// Dados iniciais
let currentColor = 'black'

let screen = document.querySelector('#tela')
let contexto = screen.getContext('2d')

let canDraw = false

let mouseX = 0
let mouseY = 0

//  Eventos
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent)
})

/*
    - click abaixar, ativar modo desenho
    - mouse mover, se tiver ativo,  desenhe
    - mouse soltar, desativar modo desenho
*/

screen.addEventListener('mousedown', mouseDownEvent)
screen.addEventListener('mousemove', mouseMoveEvent)
screen.addEventListener('mouseup', mouseUpEvent)

document.querySelector('.clear').addEventListener('click', clearScreen)
// Funções
function colorClickEvent(e) {
    let color = e.target.getAttribute('data-color')
    currentColor = color

    document.querySelector('.color.active').classList.remove('active')
    e.target.classList.add('active')
}

function mouseDownEvent(e) {
    canDraw = true
    mouseX = e.pageX - screen.offsetLeft
    mouseY = e.pageY - screen.offsetTop
}

function mouseMoveEvent(e) {
    if (canDraw) {
        
        draw(e.pageX, e.pageY)

    }
}

function mouseUpEvent() {
    canDraw = false
}

function draw(x, y) {
    let pointX = x - screen.offsetLeft
    let pointY = y - screen.offsetTop

    // desenhar
    contexto.beginPath()
    contexto.lineWidth = 5
    contexto.lineJoin = 'round'
    contexto.moveTo(mouseX, mouseY)
    contexto.lineTo(pointX, pointY)
    contexto.closePath()
    contexto.strokeStyle = currentColor
    contexto.stroke()

    mouseX = pointX
    mouseY = pointY

}

function clearScreen() {
    contexto.setTransform(1, 0, 0, 1, 0, 0)
    contexto.clearRect(0, 0, contexto.canvas.width, contexto.canvas.height)
}