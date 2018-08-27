var guessBank = ["Mega Man X", "Star Fox", "Earthbound", "Metroid"];



function startGame() {
    game.start();
}

var game = {
    wordBank: ["mario", "snake", "ness", "megaman", "zero", "Skull Kid"],
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
            var correct = false;
            var stageFinish;
            var elemId = game.id[game.indexx];
            var compare = game.wordBank[game.currentStage];
            var comLetters = compare.split('');
            console.log(comLetters);
            for (var z = 0; z < comLetters.length; z++) {
                // console.log(compare.charAt([z]));
                if (event.key === comLetters[z]) {
                    correct = true;
                    var letter = event.key;
                    //if word is more than 6 character, will throw a error bc they are only 6 spaces(ids) for the characters in the html doc
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

            if ((game.indexx) === (compare.length)) {
                game.currentStage++;
                game.indexx = 0;
                game.chances = 10;
                game.id.forEach((element, i) => {
                    document.getElementById(element).innerHTML = '';
                });
                
            } else if (game.chances === 0) {
                alert("GAMEOVER");
            }
            console.log(game.currentStage);
        }

    },
    updateStats: function () {
        document.getElementById('chancesLeft').innerHTML = "Guesses left : " + game.chances;
        document.getElementById('zhowManyCorrect').innerHTML = "How many correct : " + game.howManyCorrect;
        document.getElementById('indexcheck').innerHTML = "Current index : " + game.indexx;
        

    }

}
game.run();


