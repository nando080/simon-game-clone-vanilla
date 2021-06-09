const colorButtons = document.querySelectorAll('map')
const startButton = document.querySelector('.btn-start')
const controlButtons = document.querySelectorAll('.control-btn')
const speedValue = document.querySelector('.speed-value')
const levelValue = document.querySelector('.level-value')
const timeBar = document.querySelector('.time-bar')
const errorLights = document.querySelector('.lights-container-off')

let isGameStarted = false
let isPlayerTime = false
let speedLevel = 1
let gameLevel = 1
let howManyMovesToShowNow = 1

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
    increaseSpeed() {
        if (speedLevel < maxSpeedLevel) {
            speedLevel++
            renderValueOnToDisplay(speedValue, speedLevel)
        }
    },
    decreaseSpeed() {
        if (speedLevel > minSpeedAndGameLevel) {
            speedLevel--
            renderValueOnToDisplay(speedValue, speedLevel)
        }
    },
    increaseLevel() {
        if (gameLevel < maxGameLevel) {
            gameLevel++
            renderValueOnToDisplay(levelValue, gameLevel)
        }
    },
    decreaseLevel() {
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

const getSpeedLimit = () => movementSpeedLimits[speedLevel - 1]

const generateRandomColorValue = () => Math.floor(Math.random() * 4)

const setFullCPUSequence = () => {
    if (!isGameStarted) {
        for (let i = 0; i < getMaxNumberOfMoves(); i++) {
            CPUMoves.push(generateRandomColorValue())
        }
    }
}

const updateHowManyMovesToShowNow = () => {
    if (!isGameStarted) {
        howManyMovesToShowNow = 1
        return
    }
    if (howManyMovesToShowNow < CPUMoves.length) {
        howManyMovesToShowNow++
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

const showCPUMoves = () => {
    if (isGameStarted) {
        let actualColorIndex = 0
        let getActualColorName = () => offColorsNames[CPUMoves[actualColorIndex]]
        const actualColorIsNotTheLast = () => {
            const isLast = (actualColorIndex < howManyMovesToShowNow) ? true : false
            return isLast
        }
        const showMovesInterval = setInterval(() => {
            if (actualColorIsNotTheLast()) {
                turnOnLight(getActualColorName())
                actualColorIndex++
            } else {
                isPlayerTime = true
                updateHowManyMovesToShowNow()
                clearInterval(showMovesInterval)
            }
        }, getSpeedLimit())
    }
}

const initializeGame = () => {
    if (!isGameStarted) {
        setFullCPUSequence()
        howManyMovesToShowNow = 1
        isGameStarted = true
        console.log(CPUMoves)
        showCPUMoves()
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
        buttonSounds['control'].play()
    }
})

startButton.addEventListener('mouseup', () => {
    startButton.querySelector('.btn-start-img').src = './img/btn-start-off.svg'
})

startButton.addEventListener('click', initializeGame)