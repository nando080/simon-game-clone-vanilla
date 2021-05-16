const colorButtons = document.querySelectorAll('map')
const startButton = document.querySelector('.btn-start')
const controlButtons = document.querySelectorAll('.control-btn')
const speedValue = document.querySelector('.speed-value')
const levelValue = document.querySelector('.level-value')
const timeBar = document.querySelector('.time-bar')
const errorLights = document.querySelector('.lights-container-off')

let isGameStarted = false
let speedLevel = 1
let gameLevel = 1

const numberOfMoves = [8, 14, 20, 31]
const movementSpeedLimts = [700, 600, 500]
const maxSpeedLevel = 3
const maxGameLevel = 4
const minSpeedAndGameLevel = 1

const CPUMoves = []
const playerMoves = []

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

const controlValues = {
    increaseSpeed () {
        if (speedLevel < maxSpeedLevel) {
            speedLevel++
            renderValueOnToDisplay(speedValue, speedLevel)
        }
    },
    decreaseSpeed () {
        if (speedLevel > minSpeedAndGameLevel) {
            speedLevel--
            renderValueOnToDisplay(speedValue, speedLevel)
        }
    },
    increaseLevel () {
        if (gameLevel < maxGameLevel) {
            gameLevel++
            renderValueOnToDisplay(levelValue, gameLevel)
        }
    },
    decreaseLevel () {
        if (gameLevel > minSpeedAndGameLevel) {
            gameLevel--
            renderValueOnToDisplay(levelValue, gameLevel)
        }
    }
}

const increaseSpeed = () => {
    if (speedLevel < maxSpeedLevel) {
        speedLevel++
    }
}

const renderValueOnToDisplay = (display, value) => {
    display.innerText = value
}

const getMaxNumberOfMoves = () => numberOfMoves[gameLevel - 1]

const getSpeedLimit = () => movementSpeedLimts[speedLevel - 1]

const generateRandomColorValue = () => Math.floor(Math.random() * 4) + 1

const setNewCPUMove = () => {
    if (CPUMoves.length < getMaxNumberOfMoves()) {
        CPUMoves.push(generateRandomColorValue())
    }
}

const receivePlayerMove = move => {
    if (playerMoves.length < CPUMoves.length && isGameStarted){
        playerMoves.push(move)
    }
}

const compareMoves = () => {
    CPUMoves.forEach((item, index) => {

    })
}

const clearArrayMoves = () => {
    const actualCPUMoves = CPUMoves.length
    const actualPlayerMoves = playerMoves.length
    for (let i = actualCPUMoves; i < 0; i--) {
        CPUMoves.pop()
    }
    for (let i = actualPlayerMoves; i < 0; i--) {
        playerMoves.pop()
    }
    console.log(CPUMoves, playerMoves)
}

const showError = () => {
    errorLights.classList.add('hidde-button')
    buttonSounds['error'].play()
    setTimeout(() => {
        errorLights.classList.remove('hidde-button')
    }, 500)
    isGameStarted = false
    clearArrayMoves()
}

const startGame = () => {
    setNewCPUMove()
    console.log(getMaxNumberOfMoves())
    console.log(getSpeedLimit())
}

const initializeNewGame = () => {
    if (!isGameStarted) {
        buttonSounds['control'].play()
        isGameStarted = !isGameStarted
        startGame()
    }
}

controlButtons.forEach(item => {
    const buttonStringName = `${item.dataset.js}`
    item.addEventListener('click', () => {
        if (!isGameStarted) {
            controlValues[buttonStringName]()
            buttonSounds['control'].play()
        }
    })
})

startButton.addEventListener('mousedown', () => {
    if (!isGameStarted) {
        startButton.querySelector('.btn-start-img').src = './img/btn-start-on.svg'
    }
})

startButton.addEventListener('mouseup', () => {
    startButton.querySelector('.btn-start-img').src = './img/btn-start-off.svg'
})

startButton.addEventListener('click', initializeNewGame)

colorButtons.forEach(item => {
    item.addEventListener('click', () => {
       if (isGameStarted) {
        const buttonColor = `${item.dataset.color}`
        const colorPosition = Number(offColors[buttonColor].dataset.position)
        offColors[buttonColor].classList.add('hidde-button')
        receivePlayerMove(colorPosition)
        buttonSounds[buttonColor].play()
        setTimeout(() => {
            offColors[buttonColor].classList.remove('hidde-button')
        }, 500)}
    })
})

console.log(errorLights)