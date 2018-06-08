/////////////// VARS AND FUNCTION
var scores, roundScore, activePlayer, isPlaying, winScore;

function init() {
    //Setting Globals
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    winScore = 100;
    isPlaying = true;

    //Initialise
    
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('name-0').textContent = 'PLAYER 1';
    document.getElementById('name-1').textContent = 'PLAYER 2';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');

}

function nextPlayer() {
    //Reset LocalScore
    roundScore = 0;
    //Reset the DOM data
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //Change the Player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

}

function winner() {
    //Remove Active attribute
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    //Chicken Dinner to the Winner
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
    document.getElementById('current-' + activePlayer).textContent = '0';
    //The Dice needs to go
    document.querySelector('.dice').style.display = 'none';
    //Prevent changes until reinit
    isPlaying = false;
}

///////////////////////// MAIN CODE

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    //Check if Playing
    if (isPlaying) {
        
        //Dice Roll
        var dice = Math.floor(Math.random() * 6) + 1;
        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice').src = 'dice-' + dice + '.png';
        
        //Win Condition
        if (dice !== 1) {
            //Change LocalScore
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Call nextPlayer
            nextPlayer();
        }
    }
})

document.querySelector('.btn-hold').addEventListener('click', function () {
    //Check if Playing
    if (isPlaying) {
        //Add LocalScore to Global
        scores[activePlayer] += roundScore;
        //Update data in DOM
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        //Win Condition
        if (scores[activePlayer] >= winScore) {
            winner();
        } else {
            nextPlayer();
        }
    }
})

//For reinit
document.querySelector('.btn-new').addEventListener('click', init);
