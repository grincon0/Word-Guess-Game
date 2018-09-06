var alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var getTrophy = new Audio('assets/sound/heal 1.wav');
var lose = new Audio('assets/sound/ABadDream.mp3');
var runtime = new Audio('assets/sound/OrangeCoast.mp3');

function startGame() {
    game.start();
    document.getElementById("starter").innerText = "Press any key to start the game";
    
}

document.onkeyup = function (event) {
    var input = event.key;
    var isValid = false;
    if(!game.isPlaying){
        runtime.play();
        game.isPlaying = true;
    }
    if(game.isStart){
        document.getElementById("starter").innerText = "";
        game.isStart = false;
    }
    // add a boolen hat chechsk to see if a word has been compeltered if so stop, then press a specific button to keep going, which set that boolean to false
    if (!game.isGameOver && game.freeKeyReg) {
        for (var i = 0; i < alpha.length; i++) {
            if (event.key == alpha[i]) {
                isValid = true;
            }
        }
        if (isValid && !game.lettersGuessed.includes(input)) {
            game.isStart = false;
            game.lettersGuessed.push(input);
            game.checkUserInput(input);
            game.checkWordComplete();
            game.checkRewards();
            console.log(game.word);
        } else {
            return;
        }
    } else {
        return;
    }

}


var game = {
    wordBank: ["margarita", "daiquiri", "martini", "screwdriver", "cider",
        "sweetwater", "beer", "tequila", "rum", "captainmorgan",
        "longisland", "whiskey", "mimosa", "mojito", "hurricane", "bluehawaii", "zombie", "champagne"],
    word: [],
    placeholder: [],
    lettersGuessed: [],
    wins: 0,
    chances: 0,
    errorsMade: 0,
    stageCounter: 0,
    contBoolean: false,
    isGameOver: false,
    isWordComplete: false,
    freeKeyReg: true,
    isNextStageReady: false,
    isChecked: false,
    isStart : true,
    isPlaying : false,
    start: function () {
        game.word = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
        this.calculateChances();
        this.initPlaceholder(this.word);
        this.interval = setInterval(this.updateInts, 100);
        runtime.play();

    },
    startScreen : function () {
        if(isStart){
            document.getElementById("start").innerHTML = "Press Space to being";
        }else{
            document.getElementById("start").innerHTML = "";
        }
        
    },
    continue: function () {
        game.word = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
        this.calculateChances();
        this.initPlaceholder(this.word);
    },
    calculateChances: function () {
        game.chances = Math.abs(this.word.length + (this.word.length - (this.word.length - 3)));
    },
    initPlaceholder: function (word) {
        for (var i = 0; i < this.word.length; i++) {
            this.placeholder[i] = (false);
        }
    },
    checkUserInput: function (input) {
        var inWord;
        for (var i = 0; i < this.word.length; i++) {
            if (input === this.word.charAt([i])) {
                this.placeholder[i] = true;
                inWord = true;
            } else {
                inWord = false;
            }
        }
        if (!inWord) {
            this.chances--;
        } else {
            this.chances--;
        }
        this.updateDOM();
        this.printGuess();
        this.checkGameOver();
    },
    updateDOM: function () {
        var stringTrans = "";
        for (var i = 0; i < this.placeholder.length; i++) {
            if (this.placeholder[i]) {
                stringTrans += this.word.charAt([i]);
            } else {
                stringTrans += "_";
            }
        }
        console.log(stringTrans);
        document.getElementById('a').innerHTML = stringTrans;
    },
    printGuess: function () {
        var string = "";
        for (var i = 0; i < this.lettersGuessed.length; i++) {
            string += ` ${this.lettersGuessed[i]} `;

        }
        document.getElementById("alreadyGuessed").innerHTML = "Guessed : " + string;
    },
    nextStage: function () {
        console.log("works");
        this.stageCounter = 0;
        for (var i = 0; i < this.placeholder.length; i++) {
            if (this.placeholder[i] === true) {
                this.stageCounter++;
            }
        }
        if (this.stageCounter >= this.placeholder.length) {
            for (var i = 0; i < this.wordBank.length; i++) {
                if (this.wordBank[i] === this.word) {
                    var index = this.wordBank.indexOf[i];
                    this.wordBank.splice(index, 1);
                    this.contBoolean = true;
                }
            }
        }
        if (this.contBoolean === true) {
            //choose another word to guess
            //add one point to win var
            this.wins++;
            this.lettersGuessed = [];
            this.stageCounter = 0;
            this.contBoolean = false;
            this.continue();
            setTimeout(function () {
                game.freeKeyReg = true;
            }, 100);

        }

    },
    checkGameOver: function () {
        if (this.chances < 0) {
            this.isGameOver = true;
        }
        if (this.isGameOver) {
            
            clearInterval(this.start);
            runtime.pause();
            alert("GAMEOVER");
            lose.play();
            this.retry();
        }
    },
    checkWordComplete: function () {
        var counter = 0;
        for (var i = 0; i < this.placeholder.length; i++) {
            if (this.placeholder[i] === true) {
                counter++;
            }
        }
        if (counter >= this.placeholder.length) {
            this.isWordComplete = true;
            this.freeKeyReg = false;
            game.nextWordKeyDown();
        }
    },
    nextWordKeyDown: function () {
        
        var counter = 0;
        document.onkeydown = function (event) {

            if (event.key) {
                counter++;
            }
            if (counter = 1) {
                game.nextStage();
            } else if (counter = 2) {
                game.freeKeyReg = true;
            } else {
                return;
            }
        }
    },
    checkRewards: function () {
        if (this.wins === 1 && !this.isChecked) {
            var img = document.createElement("img");
            img.src = "assets/images/lblue1.png";
            img.alt = "For the first win!";
            document.getElementById("holder").appendChild(img);
            getTrophy.play();
            this.isChecked = true;
        } else if (this.wins === 2 && this.isChecked) {
            var img = document.createElement("img");
            img.src = "assets/images/pro1.png";
            img.alt = "Two wins, too good.";
            document.getElementById("holder").appendChild(img);
            getTrophy.play();
            this.isChecked = false;
        } else if (this.wins === 3 && !this.isChecked){
            var img = document.createElement("img");
            img.src = "assets/images/lred1.png";
            img.alt = "Three's a company";
            document.getElementById("holder").appendChild(img);
            getTrophy.play();
            this.isChecked = true;
        } else if (this.wins === 4 && this.isChecked){
            var img = document.createElement("img");
            img.src = "assets/images/lseagreen1.png";
            img.alt = "Three's a company";
            document.getElementById("holder").appendChild(img);
            getTrophy.play();
            this.isChecked = false;
        } else if (this.wins === 5 && !this.isChecked){
            var img = document.createElement("img");
            img.src = "assets/images/lgreen1.png";
            img.alt = "Three's a company";
            document.getElementById("holder").appendChild(img);
            getTrophy.play();
            this.isChecked = true;
        } else if (this.wins === 6 && this.isChecked){
            var img = document.createElement("img");
            img.src = "assets/images/dblue1.png";
            img.alt = "Three's a company";
            document.getElementById("holder").appendChild(img);
            getTrophy.play();
            this.isChecked = false;
        } else if (this.wins === 7 && !this.isChecked){
            var img = document.createElement("img");
            img.src = "assets/images/bird1.png";
            img.alt = "Three's a company";
            document.getElementById("holder").appendChild(img);
            getTrophy.play();
            this.isChecked = true;
        } else if (this.wins === 8 && this.isChecked){
            var img = document.createElement("img");
            img.src = "assets/images/pro2.png";
            img.alt = "Three's a company";
            document.getElementById("holder").appendChild(img);
            getTrophy.play();
            this.isChecked = false;
        }else if (this.wins === 9 && !this.isChecked){
            var img = document.createElement("img");
            img.src = "assets/images/pro3.png";
            img.alt = "Three's a company";
            document.getElementById("holder").appendChild(img);
            getTrophy.play();
            this.isChecked = true;
        }  else if (this.wins === 10 && this.isChecked){
            var img = document.createElement("img");
            img.src = "assets/images/pro4.png";
            img.alt = "Three's a company";
            document.getElementById("holder").appendChild(img);
            getTrophy.play();
            this.isChecked = false;
        } else if (this.wins === 11 && !this.isChecked){
            var img = document.createElement("img");
            img.src = "assets/images/pro5.png";
            img.alt = "Three's a company";
            document.getElementById("holder").appendChild(img);
            getTrophy.play();
            this.isChecked = true;
        } else if (this.wins === 12 && this.isChecked){
            var img = document.createElement("img");
            img.src = "assets/images/pro6.png";
            img.alt = "Three's a company";
            document.getElementById("holder").appendChild(img);
            getTrophy.play();
            this.isChecked = false;
        } else if (this.wins === 13 && !this.isChecked){
            var img = document.createElement("img");
            img.src = "assets/images/supertrop1.png";
            img.alt = "Three's a company";
            document.getElementById("holder").appendChild(img);
            getTrophy.play();
            this.isChecked = true;
        } else if (this.wins === 14 && this.isChecked){
            var img = document.createElement("img");
            img.src = "assets/images/be1.png";
            img.alt = "Three's a company";
            document.getElementById("holder").appendChild(img);
            getTrophy.play();
            this.isChecked = false;
        } else if (this.wins === 15 && !this.isChecked){
            var img = document.createElement("img");
            img.src = "assets/images/be2.png";
            img.alt = "Three's a company";
            document.getElementById("holder").appendChild(img);
            getTrophy.play();
            this.isChecked = true;
        }  else if (this.wins === 16 && this.isChecked){
            var img = document.createElement("img");
            img.src = "assets/images/be3.png";
            img.alt = "Three's a company";
            document.getElementById("holder").appendChild(img);
            getTrophy.play();
            this.isChecked = false;
        } else if (this.wins === 17 && !this.isChecked){
            var img = document.createElement("img");
            img.src = "assets/images/palm1.png";
            img.alt = "Three's a company";
            document.getElementById("holder").appendChild(img);
            getTrophy.play();
            this.isChecked = true;
        } else if (this.wins === 18 && this.isChecked){
            var img = document.createElement("img");
            img.src = "assets/images/wave.png";
            img.alt = "Three's a company";
            document.getElementById("holder").appendChild(img);
            getTrophy.play();
            this.isChecked = false;
        } else{
            return;
        }
    },

    retry: function () {
        document.getElementById('starter').innerHTML = 'Press SPACE bar to try again';
        document.onkeyup = function (event) {
            if (event.which === 32) {
                location.reload();
            }
        }
    },
    updateInts: function () {
        document.getElementById('chancesLeft').innerHTML = "Guesses left : " + game.chances;
        document.getElementById('wins').innerHTML = "Wins : " + game.wins;
    }

}

