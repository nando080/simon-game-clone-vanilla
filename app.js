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
const movementSpeedLimits = [1000, 800, 600]
const maxSpeedLevel = 3
const maxGameLevel = 4
const minSpeedAndGameLevel = 1

const CPUMoves = []
const playerMoves = [1, 2, 3]

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

const offColorsNames = Object.entries(offColors).map(item => item[0])

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

const renderValueOnToDisplay = (display, value) => {
    display.innerText = value
}

const getMaxNumberOfMoves = () => numberOfMoves[gameLevel - 1]

const getSpeedLimit = () => movementSpeedLimts[speedLevel - 1]

const generateRandomColorValue = () => Math.floor(Math.random() * 4)

const getFullCPUSequence = () => {
    for (let i = 0; i < getMaxNumberOfMoves(); i++) {
        CPUMoves.push(generateRandomColorValue())
    }
}

const clearArrayMoves = () => {
    while (CPUMoves.length > 0) {
        CPUMoves.pop()
    }
    while (playerMoves.length > 0) {
        CPUMoves.pop()
    }
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

const turnOnLight = colorName => {
    offColors[colorName].classList.add('hidde-button')
    buttonSounds[colorName].play()
    setTimeout(() => {
        offColors[colorName].classList.remove('hidde-button')
    }, 500)
}

//! fix this function

const showCPUMoves = () => {

    let actualIndex = 0
    
    const intervalLight = () => {
        const colorName = offColorsNames[CPUMoves[actualIndex]]
        if (actualIndex < playerMoves.length) {
            turnOnLight(colorName)
            actualIndex++
        } else {
            return
        }
        setInterval(intervalLight, movementSpeedLimits[speedLevel])
    }

    setInterval(intervalLight, movementSpeedLimits[speedLevel])
}

//! to validate / timer function
/* 
const updateSpeedRate = Math.floor(1000 / 60)
const initialPosition = 100

const percentageDecreaseRate = Math.round((updateSpeedRate * initialPosition) / movementSpeedLimts[speedLevel - 1])

let actualPosition = initialPosition */


const gamePlay = () => {
    getFullCPUSequence()
    showCPUMoves()
}

const startGame = () => {
    //clearArrayMoves()
    gamePlay()
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

console.log()