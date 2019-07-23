var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var choose = false;
var check = false;
var question = [];
var questionList = [];
var answerList = [];
var answer = [];
var incorrectCounter = 0;
var loseTime = 5;
var maxTime = 15;
var time = maxTime;
var timer;
var win = false;
Help();
function Help(){
    window.alert('This is an educational game, generally meant for a younger audience to teach them about synonyms. To play all you have to do is click on the synonym (a word with a similar meaning) of the word that is shown at the top. If it is too hard or too easy just use the dropdown box to change the difficulty and then press "restart". If you need more help just click the help button in the bottom-left hand corner! Have Fun!');
}
canvas.addEventListener("click", mousePos);



var easyList = ["Near", "Big", "Glad", "Little", "Sick", "Leap", "Start", "Angry", "Alike"];
var easyList2 = ["Close", "Large", "Happy", "Small", "Ill", "Jump", "Begin", "Mad", "Same"];

var mediumList = ["Come", "Move", 'Run', "Hurry", "Hide", "Do", "Have", "Use", "Get"];
var mediumList2 = ["Approach", "Go", "Dash", "Rush", "Conceal", "Execute", "Possess", "Employ", "Acquire"];

var hardList = ["Artificial", "Forever", "Lawyer", "Exceptional", "Improbable", "Sinister", "Fascinating", "Portray"];
var hardList2 = ["Fake", "Always", "Attourney", "Amazing", "Unlikely", "Wicked", "Interesting", "Show"]

function chooseDiff(){
    var selectedValue = document.getElementById("Difficulty").value;
    switch(selectedValue){
        case "Easy":
            wordlist = easyList
            wordlist2 = easyList2
        break;
        case "Medium":
            wordlist = mediumList
            wordlist2 = mediumList2
        break;
        case "Hard":
            wordlist = hardList
            wordlist2 = hardList2
        break;
    }
    console.log(wordlist, wordlist2);
}

wordlist = easyList;
wordlist2 = easyList2;

class Word {
    constructor(string, x, y) {
        this.string = string;
        this.height = 40;
        this.x = x;
        this.y = y;
        this.dx = 1;
        this.dy = 1;
    }

    draw() {
        ctx.beginPath();
        ctx.font = "40px sans-serif";
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText(this.string, this.x, this.y);
        ctx.closePath();
    }
    animate() {
        this.width = ctx.measureText(this.string).width;
        ctx.clearRect(this.x, this.y, (this.width + 1), (this.height + 1));

        this.x += this.dx;
        this.y += this.dy;

        this.draw();

        if (this.x <= 0 || this.x + this.width >= canvas.width) {
            this.dx = -this.dx;
        }
        if (this.y <= 90 || this.y + this.height >= canvas.height) {
            this.dy = -this.dy;
        }
    }
    startAnimation() {
        let thisWord = this;
        let rand3 = Math.random();
        if (rand3 > 0.5) {
            if (rand3 > 0.75) {
                this.dx = -this.dx;
                this.dy = -this.dy;
            } else {
                this.dx = -this.dx;
            }
        } else {
            if (rand3 < 0.25) {
                this.dx = this.dx;
                this.dy = -this.dy;
            }
        }
        this.interval = setInterval(function() {
            thisWord.animate();
        }, 10);
        
    }
    stopAnimation() {
        ctx.clearRect(this.x, this.y, this.width, this.height);
        clearInterval(this.interval);
    }
}


chooseList();
setup();
createTimer();
var answerWord = answerList[0];
console.log(answerList);
var correctCounter = 0;

let word = [];
for (let i = 0; i < 5; i++) {
    let rand1 = Math.floor(Math.random() * 300);
    let rand2 = (Math.floor(Math.random() * 300)+100);
    word.push(new Word(answerList[i], rand1, rand2));
    word[i].startAnimation();
}
console.log(questionList,answerList);

createQuestion(correctCounter);
createIncorrect();


function mousePos(event) {
    let pos = {
        x: event.pageX - this.offsetLeft,
        y: event.pageY - this.offsetTop
    }
    console.log(this.offsetLeft, this.offsetTop);
    chosenWord = wordClick(pos);
    check = checkWord(chosenWord);
    if (check) {
        chosenWord.stopAnimation();
    }
}

function wordClick(pos) {
    for (let j = 0; j < word.length; j++) {
        if (pos.x > word[j].x && pos.x < (word[j].x + word[j].width)) {
            if (pos.y > word[j].y && pos.y < (word[j].y + word[j].height)) {
                return (word[j]);
            }
        }
    }
}

function chooseList() {
    let random = Math.random();
    if (random > 0.5) {
        choose = true;
    }

    if (choose) {
        questionList = wordlist;
        answerList = wordlist2;
    } else {
        questionList = wordlist2;
        answerList = wordlist;
    }
}

function shuffle(obj1, obj2) {
    var index = obj1.length;
    var rnd, tmp1, tmp2;
  
    while (index) {
      rnd = Math.floor(Math.random() * index);
      index -= 1;
      tmp1 = obj1[index];
      tmp2 = obj2[index];
      obj1[index] = obj1[rnd];
      obj2[index] = obj2[rnd];
      obj1[rnd] = tmp1;
      obj2[rnd] = tmp2;
    }
  }

function setup() {
    shuffle(questionList,answerList);
    console.log(questionList, answerList)
}

function checkWord() {
    if(incorrectCounter == (loseTime-1)){
        incorrectCounter = incorrectCounter + 1;
        lose();
        //reset();
        console.log(questionList,answerList)
        //reset(); //reset program
    }
    else {
        if (chosenWord.string == answerWord) {
            correctCounter = correctCounter + 1;
            console.log(questionList[correctCounter]);
            ctx.clearRect(100, 10, 250, 80);
            answerWord = answerList[correctCounter];
            createQuestion(correctCounter);
            if(correctCounter == 5){
                correctCounter = correctCounter + 1;
                win = true;
                ctx.clearRect(350, 10, 150, 80); 
                createIncorrect();
                for(let i = 0; i < 5; i++){
                    word[i].stopAnimation();
                }
                ctx.clearRect(0,0,500,590);
                ctx.font = "80px sans-serif";
                ctx.fillStyle = "green";
                ctx.textAlign = "center";
                ctx.textBaseline = "center";
                ctx.fillText('Good Job!', 250, 245);
                ctx.font = "20px sans-serif";
                ctx.fillText('Press "restart" to try again!', 250, 325);
            }
            else{
                return true; 
            }
        }
        else {
            if(chosenWord.string != answerWord){
                incorrectCounter = incorrectCounter + 1; 
                ctx.clearRect(350, 10, 150, 80); 
                createIncorrect();      
            }
        }
    }
}
        
        



function createQuestion(){
    ctx.font = "40px sans-serif";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "center";
    ctx.fillText(questionList[correctCounter], 250, 45);
}


function createIncorrect(){
    ctx.font = "20px sans-serif";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.textBaseline = "center";
    ctx.fillText('Incorrect: ' + incorrectCounter, 425, 70);  
}

function reset(){
    for(let i = 0; i < 5; i++){
        word[i].stopAnimation();
    }
    ctx.clearRect(0,0,500,590);
    chooseList();
    setup();
    clearInterval(timer);
    time = 15;
    document.querySelector("#timer-text").textContent = "Time: "
    createTimer();
    win = false;
    answerWord = answerList[0];
    correctCounter = 0;
    incorrectCounter = 0;
    word = [];
    for (i = 0; i < 5; i++) {
        rand1 = Math.floor(Math.random() * 300);
        rand2 = (Math.floor(Math.random() * 300)+100);
        word.push(new Word(answerList[i], rand1, rand2));
        console.log(i);
        console.log(word[i]);
        word[i].startAnimation();
    }
    createQuestion(correctCounter);
    createIncorrect();
}

function lose(){
    ctx.clearRect(350, 10, 150, 80); 
    createIncorrect();
    for(let i = 0; i < 5; i++){
        word[i].stopAnimation();
    }
    ctx.clearRect(0,0,500,590);
    ctx.font = "80px sans-serif";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.textBaseline = "center";
    ctx.fillText('You Lose', 250, 245); 
    ctx.font = "20px sans-serif";
    ctx.fillText('Press "restart" to try again!', 250, 325);
}
function createTimer(){
    timer = setInterval(function(){
        time--;
        document.querySelector(".timer").textContent = time;
        if(win){
            time = 100000;
        }
        if(time <= 0){
            document.querySelector("#timer-text").textContent = "Time's Up!";
            document.querySelector(".timer").textContent = "";
            clearInterval(timer);
            lose();
        }
    },1000);  
}  




