var diceImg = document.querySelector('.dice')
var btnRoll = document.querySelector('.btn-roll')
var btnHold = document.querySelector('.btn-hold')
var btnNew = document.querySelector('.btn-new')

//state variable to begin game
init();

function rollDice() {
    if (gamePlaying) {
        var number = Math.floor(Math.random() * 6) + 1;
        
        //Displaying dice img
        diceImg.style.display = 'block';
        diceImg.src = `src/dice-${number}.png`;

        if (number !== 1) {
            //Add score
            roundScore += number;
            console.log(roundScore)
            document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }
    }
}

function holdPoints() {
    if (gamePlaying) {
        var winner = document.querySelector(`.player-${activePlayer}-panel`)
        // add the current score to the active player
        scores[activePlayer] += roundScore;

        // update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            diceImg.style.display = 'none';
            winner.classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    diceImg.style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdPoints);
btnNew.addEventListener('click', init);


