var alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j','k', 'l', 'm', 'n', 'o','p', 'q', 'r', 's', 't','u', 'v', 'w', 'x', 'y', 'z'];
var wordDiv = document.getElementById("pldiv");
var chancesDiv = document.getElementById("chancesLeft");


function startGame() {
    game.start();
}

document.onkeyup = function (event) {
    var input = event.key;
    var isValid = false;
    for (var i = 0; i < alpha.length; i++){
        if(event.key == alpha[i]){
            isValid = true;
        }
    }
    if (isValid){
        game.lettersGuessed.push(input);
        game.checkerUserInput(input);
    }else{
        game.lettersGuessed.push(input);
        game.errorsMade++;
        game.chances += -1;
    }
}

var game = {
    wordBank: ["margarita", "beer", "tequila"],
    word : [],
    placeholder : [],
    lettersGuessed : [],
    chances : 0,
    errorsMade : 0,
    start: function () {
        game.word = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
        this.calculateChances();
        this.initPlaceholder(this.word);
        this.interval = setInterval(this.updateInts, 100);
        
    },
    calculateChances : function () {
        game.chances = Math.abs(this.word.length + (this.word.length - (this.word.length - 3)));
    },
    initPlaceholder: function (word) {
        for (var i = 0; i < this.word.length; i++){
            this.placeholder[i] = (false);
        }
    },
    checkUserInput : function (input) {
        var inWord;
        for( var i = 0; i < this.word.length; i++){
            if(input === this.word.charAt([i])) {
                this.placeholder[i] = true;
                inWord = true;
            } else {
                inWord = false;
            }
        }
        if(!inWord){
            this.chances--;
            this.errorsMade;
        }else{
            this.chances--;
        }
        this.updateDOM();
    },
    updateDOM: function (){
        var stringTrans="";
        for (var i = 0; i < this.placeholder.length; i++){
            if(this.placeholder[i]){
                stringTrans += this.word.charAt([i]);
            }else{
                stringTrans += "_";
            }
        }
        console.log(stringTrans);
        document.getElementById('a').innerHTML = stringTrans;
    },


   updateInts: function () {
        document.getElementById('chancesLeft').innerHTML = "Guesses left : " +  game.chances;
        document.getElementById('errors').innerHTML = "Errors made : " + game.errorsMade;
       // document.getElementById('indexcheck').innerHTML = "Current index : " + game.indexx;
        

    }

}

