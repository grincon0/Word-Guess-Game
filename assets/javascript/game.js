var guessBank = ["Mega Man X", "Star Fox", "Earthbound", "Metroid"];



function startGame() {
    game.start();
}

var game = {
    wordBank : ["mario", "Snake", "Ness", "Megaman", "Zero", "Skull Kid"],
    stage : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    currentStage : 0,
    wins : 0,
    start : function () {
        document.getElementById("pressAny").innerHTML = "Press any button to begin!";
        this.interval = setInterval(this.updateGame2, 60);
    },
    updateGame : function(){
        document.onkeyup = function (event) {
            game.wordBank.forEach((word, i) => {
                var compare = game.wordBank[game.currentStage];
                for(var z = 0; z < compare.length; z++){
                    console.log(compare.charAt([z]));
                }


            });
        }
    },
    updateGame2: function() {
        document.onkeyup = function (event) {
    
            var compare = game.wordBank[game.currentStage];
            for (var z = 0; z < compare.length; z++) {
                console.log(compare.charAt([z]));
                if(event.key === compare.charAt([z])){
                    var letter = event.key;
                    document.getElementById('test').innerHTML = letter;
                }
            }
    
    
    
        }
    }

}


