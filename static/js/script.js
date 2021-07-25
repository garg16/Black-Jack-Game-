// Challenge 1 : Age in Days
function ageInDays() {
    var birthYear = prompt('What year you were born?')
    var ageInDays = (2021 - birthYear) * 365
    var h1 = document.createElement('h1')
    h1.setAttribute('id', 'ageInDays')
    var textAnswer = document.createTextNode('You are ' + ageInDays + ' days old')
    h1.appendChild(textAnswer)
    document.getElementById('flex-box-result').appendChild(h1)

}
function reset() {
    document.getElementById('ageInDays').remove()

}
// Challenge 2 : Cat generator
function generateCat() {
    var image = document.createElement('img')
    var div = document.getElementById('flex-cat-gen')
    image.src = "https://media.tenor.com/images/2221d8381f316e52cd8d3e4cf3601a89/tenor.gif"


    div.appendChild(image)
}


// Challenge 3: Rock, Paper, Scissor
function rpsGame(yourChoice) {
    console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;

    botChoice = numberToChoice(randToRpsInt())
    console.log('Computer Choice', botChoice)

    results = decideWinner(humanChoice, botChoice)
    console.log(results)

    message = finalMessage(results)
    console.log(message)

    rpsFrontEnd(humanChoice, botChoice, message)


}


function randToRpsInt() {
    return Math.floor(Math.random() * 3)
}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissor'][number];
}

function decideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
        'rock': { 'scissor': 1, 'rock': 0.5, 'paper': 0 },
        'paper': { 'scissor': 0, 'rock': 1, 'paper': 0.5 },
        'scissor': { 'scissor': 0.5, 'rock': 0, 'paper': 1 }
    };

    var yourScore = rpsDatabase[yourChoice][computerChoice]
    var computerScore = rpsDatabase[computerChoice][yourChoice]

    return [yourScore, computerScore]

}

function finalMessage([yourScore, computerScore]) {
    if (yourScore === 1) {
        return { 'message': 'You Won', 'color': 'green' } //object
    }
    else if (yourScore === 0) {
        return { 'message': 'You lost ', 'color': 'red' }
    }
    else {
        return { 'message': 'You Tied', 'color': 'yellow' }
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    var imageDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor': document.getElementById('scissor').src
    };

    document.getElementById('rock').remove()
    document.getElementById('paper').remove()
    document.getElementById('scissor').remove()

    humanDiv = document.createElement('div')
    botDiv = document.createElement('div')
    messageDiv = document.createElement('div')


    humanDiv.innerHTML = "<img src='" + imageDatabase[humanImageChoice] + "' height =150 width = 150px style='box-shadow: 0px 10px 50px rgba(37 ,50, 233,1);'>"

    messageDiv.innerHTML = "<h1 style='color:" + finalMessage['color'] + "; font-size: 60px; padding:30px' '>" + finalMessage['message'] + "</h1>"

    botDiv.innerHTML = "<img src='" + imageDatabase[botImageChoice] + "' height =150 width = 150px style='box-shadow: 0px 10px 50px rgba(243,38,24,1);'>"


    document.getElementById('flex-box-div').appendChild(humanDiv)
    document.getElementById('flex-box-div').appendChild(messageDiv)
    document.getElementById('flex-box-div').appendChild(botDiv)


}

// Challenge 4: Change colors of all Buttons
var allButtons = document.getElementsByTagName('button')
let copyAllButtons = [];
for (let i = 0; i < allButtons.length; i++) {
    copyAllButtons.push(allButtons[i].classList[1])
}

function btnColorChange(buttonThingy) {
    if (buttonThingy.value === 'red') {
        redButton();
    }
    else if (buttonThingy.value === 'green') {
        greenButton();

    }
    else if (buttonThingy.value === 'random') {
        randomButton();
    }
    else if (buttonThingy.value === 'reset') {
        resetButton();
    }
}

function redButton() {

    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1])
        allButtons[i].classList.add('btn-danger')
    }
}
function greenButton() {

    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1])
        allButtons[i].classList.add('btn-success')
    }

}

function resetButton() {


    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1])
        allButtons[i].classList.add(copyAllButtons[i])

    }

}

function randomButton() {
    let choices = ['btn-primary', 'btn-success', 'btn-warning', 'btn-danger']


    for (let i = 0; i < allButtons.length; i++) {
        let number = Math.floor(Math.random() * 4)
        allButtons[i].classList.remove(allButtons[i].classList[1])
        allButtons[i].classList.add(choices[number])
    }

}

// Challenge 5: Blackjack 
let blackjackGame = {
    'you': { 'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
    'dealer': { 'scoreSpan': ' #dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'K', 'Q', 'J'],
    'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'Q': 10, 'J': 10, 'A': [1, 11] },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,


};
const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('/Users/vaibhavgarg/Documents/JS project/static/sounds/swish.m4a');
const winSound = new Audio('/Users/vaibhavgarg/Documents/JS project/static/sounds/cash.mp3');
const lossSound = new Audio('/Users/vaibhavgarg/Documents/JS project/static/sounds/aww.mp3');
document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackdeal)
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerlogic)

function blackjackHit() {
    if (blackjackGame['isStand'] === false) {
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU)
        showScore(YOU);
    }

}
function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}
function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {

        let cardImage = document.createElement('img');
        cardImage.src = `/Users/vaibhavgarg/Documents/JS project/static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}
function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve,ms));
}
async function blackjackdeal() {
    if (blackjackGame['turnsOver'] === true) 
    {
        blackjackGame['isStand'] = false;
       
       
        let yourImages = document.querySelector('#your-box').querySelectorAll('img')
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img')
        for (i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
        for (i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }
        YOU['score'] = 0;
        DEALER['score'] = 0;
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;
        document.querySelector('#your-blackjack-result').style.color = 'white'
        document.querySelector('#dealer-blackjack-result').style.color = 'white'
        document.querySelector('#black-jack-result').textContent="Let's play"
        document.querySelector('#black-jack-result').style.color='black'
        blackjackGame['turnsOver'] = false;
    }
    else{
        blackjackGame['isStand'] = false;
       
        showResult(computeWinner());
        let yourImages = document.querySelector('#your-box').querySelectorAll('img')
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img')
        for (i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
        for (i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }
        YOU['score'] = 0;
        DEALER['score'] = 0;
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;
        document.querySelector('#your-blackjack-result').style.color = 'white'
        document.querySelector('#dealer-blackjack-result').style.color = 'white'
        await sleep(3000)
        document.querySelector('#black-jack-result').textContent="Let's play"
        document.querySelector('#black-jack-result').style.color='black'

        blackjackGame['turnsOver'] = false;
    }

}
function updateScore(card, activePlayer) {
    if (card === 'A') {
        // if adding 11 keeps me below 21 then add 11 otherwise add 1.
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }
        else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }

    }

    else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];

    }



}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!'
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red'
    }
    else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

async function dealerlogic() {
    blackjackGame['isStand'] = true;
  while(DEALER['score']<16 && blackjackGame['isStand']===true)
  {
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER)
    showScore(DEALER);
    await sleep(1000)
  }
   
        blackjackGame['turnsOver'] = true;
        let winner = computeWinner();
        showResult(winner);
    
}

function computeWinner() {
    let winner;
    if (YOU['score'] <= 21) {
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            blackjackGame['wins']++;
            winner = YOU;
        }
        else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            winner = DEALER;
        }
        else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
        }


    }
    else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        winner = DEALER
    }

    else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;
    }
    console.log(winner);
    return winner;
}

function showResult(winner) {
    let message, messageColor;
  
        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You Won!'
            messageColor = 'green'
            winSound.play();

        }
        else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You Lost!'
            messageColor = 'red'
            lossSound.play();

        }

        else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You drew!'
            messageColor = 'black'
        }

        document.querySelector('#black-jack-result').textContent = message;
        document.querySelector('#black-jack-result').style.color = messageColor;


    

}
