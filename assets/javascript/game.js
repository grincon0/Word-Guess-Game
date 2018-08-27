var guessBank = ["Mega Man X", "Star Fox", "Earthbound", "Metroid"];



function startGame() {
    game.start();
}

var game = {
    wordBank: ["mario", "Snake", "Ness", "Megaman", "Zero", "Skull Kid"],
    id: ['a', 'b', 'c', 'd', 'e', 'f'],
    indexx: 0,
    stage: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    currentStage: 0,
    wins: 0,
    chances: 10,
    guessCorrect: true,
    howManyCorrect: 0,
    start: function () {
        document.getElementById("pressAny").innerHTML = "Press any button to begin!";
        document.getElementById('chancesLeft').innerHTML = "Guesses left : " + this.chances;
        setInterval(this.updateStats, 60);
    },

    run: function () {
        document.onkeyup = function (event) {
            var checker = 0;
            var correct;
            var stageFinish;
            var elemId = game.id[game.indexx];
            var compare = game.wordBank[game.currentStage];
            var comLetters = compare.split('');
            console.log(comLetters);
            for (var z = 0; z < compare.length; z++) {
                // console.log(compare.charAt([z]));
                if (event.key === compare.charAt([z])) {
                    correct = true;
                    var letter = event.key;
                    document.getElementById(elemId).innerHTML = letter;
                    checker = true;
                } else {
                    correct = false;
                }
            }
            if (checker) {
                game.indexx++;
                checker = false;
            }
            

            if (correct) {
                game.howManyCorrect++;
                game.chances--;
            } else {
                game.chances--;
            }

            if (((game.indexx) === (compare.length - 1)) && (game.howManyCorrect === compare.length)) {
                game.indexx = 0;
                game.currentStage++;
            } else if (game.chances === 0) {
                alert("GAMEOVER");
            }
        }

    },
    updateStats: function () {
        document.getElementById('chancesLeft').innerHTML = "Guesses left : " + game.chances;
        document.getElementById('zhowManyCorrect').innerHTML = "How many correct : " + game.howManyCorrect;
        document.getElementById('indexcheck').innerHTML = "Current index : " + game.indexx;

    }

}
game.run();


