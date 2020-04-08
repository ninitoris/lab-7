var field;
var message;
var counter = 0;
var missedCounter;
var missedCounterDiv;
var counterDiv;
var countDown;
var countDownDiv;
var sturtupDiv;
var sturtupField;
var playField;
var gameHasStarted = false;



let bgMusic = new Audio('snd/bgmusic.mp3');
bgMusic.volume = 0.1;

let endMusic = new Audio('snd/putin.mp3');
endMusic.volume = 0.1;


window.onload = function () {
    field = this.document.getElementById('field');
    playField = this.document.getElementById('playField');
    counterDiv = this.document.getElementById('counterdiv');
    countDownDiv = this.document.getElementById('countDownDiv');
    missedCounterDiv = this.document.getElementById('missedCounterDiv');

    sturtupField = document.getElementById('sturtup');

    document.getElementById('osuVid').style.display = 'none';
    document.getElementById('osuVid').pause;

    //видео-заставка
    setInterval(function() {
        if(!gameHasStarted){
            document.getElementById('osuVid').style.display = 'inline';
            document.getElementById('sturtupVid').style.display = 'none';
            document.getElementById('osuVid').play();
        }
    },2000);

    //начало игры 
    sturtupField.onclick = function beginCountdown(){
        console.log('starting game');
        gameHasStarted = true;
        document.getElementById('osuVid').remove();
        document.getElementById('sturtupVid').remove();
        document.getElementById('sturtup').remove();
        bgMusic.play();

        playField.style.visibility = 'visible';
        countDown = 2;
        countDownDiv.style.position = 'absolute';
        countDownDiv.style.top = '0px';
        countDownDiv.style.margin = '20% 0 0 0';
        countDownDiv.style.width = '100%';
        countDownDiv.style.fontSize = '10em';
        let startingTimer = setInterval(function() {
            countDownDiv.innerHTML = countDown;
            countDown--;
            if (countDown==0){
                setTimeout(function() {
                    startGame();
                },999);
                countDown = 59;
                clearInterval(startingTimer);
            }
        },1000);
        
    };

};


function startGame(){
    counter = 0;
    missedCounter = 0;
    console.log('the actual start of the game');
    countDownDiv.style.display = 'inline-block';
    countDownDiv.style.position = 'relative';
    countDownDiv.style.margin = '1% 0 0 0';
    countDownDiv.style.width = '33%';
    countDownDiv.style.fontSize = '2em';
    countDownDiv.innerHTML = 'Time left: 60';

    counterDiv.style.display = 'inline-block';
    counterDiv.style.position = 'relative';
    counterDiv.style.margin = '1% 0 0 0';
    counterDiv.style.width = '33%';
    counterDiv.style.fontSize = '2em';
    counterDiv.innerHTML = 'Score: 0';

    missedCounterDiv.style.display = 'inline-block';
    missedCounterDiv.style.position = 'relative';
    missedCounterDiv.style.margin = '1% 0 0 0';
    missedCounterDiv.style.width = '33%';
    missedCounterDiv.style.fontSize = '2em';
    missedCounterDiv.innerHTML = 'Missed: 0';

    let startingTimer = setInterval(function() {
        countDownDiv.innerHTML = 'Time left: ' + countDown;
        countDown--;
        
        let circlePosX = Math.floor(Math.random()*document.documentElement.clientWidth*0.95);
        let circlePosY = Math.floor(Math.random()*document.documentElement.clientHeight*0.8);
        let rotationDeg = Math.random()*360*Math.PI/180;
        
        console.log('x: ' + circlePosX + ' y: ' + circlePosY + ' deg: ' + rotationDeg);

        let circleHitBox = document.createElement('circleHitBox');
        circleHitBox.id = 'circleHitBox';
        circleHitBox.style.position = 'absolute';
        circleHitBox.style.border = '0px solid red';
        
        circleHitBox.innerHTML = `<img src="img/Osu_new_logo.png" width="100px" id="circleImg">`;
        //document.getElementById('circleImg').style.transform = "rotate(rotationDeg)";
        document.getElementById('playField').append(circleHitBox);

        let wasClicked = false;

        circleHitBox.style.top = circlePosY;
        circleHitBox.style.left = circlePosX;

        circleHitBox.addEventListener('click', function() {
            wasClicked = true;
            circleHitBox.style.visibility = 'hidden';
            counter++;
            counterDiv.innerHTML = 'Score: ' + counter;

            
        });
        setTimeout(function() {
           if (!wasClicked){
            missedCounter++;
            circleHitBox.style.visibility = 'hidden';
            missedCounterDiv.innerHTML = 'Missed: ' + missedCounter;
           }
        },999);
        

        if (countDown<0){
            setTimeout(function() {
                console.log('end of the game');
                bgMusic.pause();
                endMusic.play();
                let gameOverDiv = document.createElement('gameOverDiv');
                gameOverDiv.style.position = 'absolute';
                gameOverDiv.style.border = '0px solid red';
                gameOverDiv.innerHTML = 'Game Over <br/> Try again';
                gameOverDiv.style.width = '50%';
                gameOverDiv.style.fontSize = '10em';
                gameOverDiv.style.color = 'white';
                gameOverDiv.style.margin = '15% 0 0 25%';
                gameOverDiv.style.textAlign = 'center';
                document.getElementById('playField').append(gameOverDiv);
                gameOverDiv.addEventListener('click', function() {
                    endMusic.pause();
                    document.location.reload();
                });
            },999);
            clearInterval(startingTimer);
        }
    },1000);
    
}
