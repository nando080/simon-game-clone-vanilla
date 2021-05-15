const colorButtons = document.querySelectorAll('map')
const startButton = document.querySelector('.btn-start')
const controlButtons = document.querySelectorAll('.control-btn')

const offColors = {
    green: document.querySelector('[data-js="green-light-off"]'),
    red: document.querySelector('[data-js="red-light-off"]'),
    yellow: document.querySelector('[data-js="yellow-light-off"]'),
    blue: document.querySelector('[data-js="blue-light-off"]')
}

const buttonSounds = {
    green: new Audio('./sound/green.mp3'),
    red: new Audio('./sound/red.mp3'),
    yellow: new Audio('./sound/yellow.mp3'),
    blue: new Audio('./sound/blue.mp3'),
    error: new Audio('./sound/error.wav'),
    control: new Audio('./sound/control.mp3')
}

let isGameStarted = false;

startButton.addEventListener('mousedown', () => {
    startButton.querySelector('.btn-start-img').src = './img/btn-start-on.svg'
})

startButton.addEventListener('mouseup', () => {
    startButton.querySelector('.btn-start-img').src = './img/btn-start-off.svg'
})

startButton.addEventListener('click', () => {
    buttonSounds['control'].play()
})

colorButtons.forEach(item => {
    item.addEventListener('click', () => {
        const buttonColor = `${item.dataset.color}`
        offColors[buttonColor].classList.add('hidde-button')
        buttonSounds[buttonColor].play()
        setTimeout(() => {
            offColors[buttonColor].classList.remove('hidde-button')
        }, 500)
    })
})

controlButtons.forEach(item => {
    item.addEventListener('click', () => {
        buttonSounds['control'].play()
    })
})

console.log(controlButtons)