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

canvas.addEventListener("click", mousePos);

wordlist = ["Come", "Move", 'Run', "Hurry", "Hide", "Do", "Have", "Use", "Get"];
wordlist2 = ["Approach", "Go", "Dash", "Rush", "Conceal", "Execute", "Possess", "Employ", "Acquire"];

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
        ctx.clearRect(this.x, this.y, (this.width + 0.5), (this.height + 0.5));

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

createQuestion(correctCounter);


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
    console.log(questionList, answerList)
}

function shuffle(o) { //v1.0
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function permutation(length) {
    var p = [],
        i;
    for (i = 0; i < length; ++i) p[i] = i;
    return shuffle(p);
}

function permute(a, p) {
    var r = [];
    for (var i = 0; i < a.length; ++i)
        r.push(a[p[i]]);
    for (i = 0; i < a.length; ++i)
        a[i] = r[i];
}

function setup() {
    var p = permutation(questionList.length);
    permute(questionList, p);
    permute(answerList, p);
}

function checkWord() {
    console.log(chosenWord);
    if (chosenWord.string == answerWord) {
        correctCounter = correctCounter + 1;
        console.log(questionList[correctCounter]);
        ctx.clearRect(100, 10, 250, 80);
        answerWord = answerList[correctCounter];
        createQuestion(correctCounter);
        return true; 
    } else {
        console.log('Wrong Word')
    }
}


function createQuestion(){
    ctx.font = "40px sans-serif";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "center";
    ctx.fillText(questionList[correctCounter], 250, 45);
}
