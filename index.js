function clearDisplay() {
    document.querySelector(".codeDisplay").value = "";
}

function insertCode(code) {
    var codeLen = document.querySelector(".codeDisplay").value;
    codeLen = String(codeLen).length;
    if (codeLen > 2) {
        code = "";
    }
    document.querySelector(".codeDisplay").value += code;
}

var maxLevel = 5;
function generateRandomCodeA(level) {
    randomCodeA = Math.round(Math.random() * (maxLevel - level) + 1);
    return randomCodeA;
}

function generateRandomCodeB(level) {
    randomCodeB = Math.round(Math.random() * (maxLevel - level) + 1);
    return randomCodeB;
}

function generateRandomCodeC(level) {
    randomCodeC = Math.round(Math.random() * (maxLevel - level) + 1);
    return randomCodeC;
}

var level = 2;
var life = 3;

var updateRandomSum = 0;
var updateRandomProduct = 0;

function gamePlay() {

    var randomCodeA = generateRandomCodeA(level);
    var randomCodeB = generateRandomCodeB(level);
    var randomCodeC = generateRandomCodeC(level);

    randomSum = parseInt(randomCodeA) + parseInt(randomCodeB) + parseInt(randomCodeC);
    randomProduct = randomCodeA * randomCodeB * randomCodeC;

    document.querySelector(".randomSum").innerHTML = randomSum;
    document.querySelector(".randomProduct").innerHTML = randomProduct;

    updateRandomProduct = randomProduct;
    updateRandomSum = randomSum;

    console.log(randomCodeA);
    console.log(randomCodeB);
    console.log(randomCodeC);

    document.querySelector(".life").innerHTML = life;
    maxLevel = maxLevel + 2;
}


function main() {
    var code = document.querySelector(".codeDisplay").value;

    var codeSum = 0;
    var codeProduct = 1;

    for (var i = 0; i < code.length; i++) {
        codeSum += parseInt(code[i]);
        codeProduct *= parseInt(code[i]);
    }

    if (codeSum == randomSum && codeProduct == randomProduct) {
        clearDisplay();
        gamePlay();
        level = level + 1;
        var giveHint = "the next code is a combination of a number that sums to <span class='randomSum'>"+updateRandomSum+"</span> also its accumulated value is <span class='randomProduct'>"+updateRandomProduct+"</span> again remeber you have only <span class='life'></span> chances";
        document.querySelector(".firstHint").innerHTML = "<span style='color:#f8f8f2;' class='compliment'></span> <span>level " + (level - 2) + "</span>  security has been breached " + giveHint;
        document.querySelector(".compliment").innerHTML = "Splendid job!";
        document.querySelector(".life").innerHTML = life;
        if((level - 2) == 1)
        {
            document.querySelector(".compliment").innerHTML = "Great!";
        }
        else if((level - 2) == 2)
        {
            document.querySelector(".compliment").innerHTML = "Splendid job!";
        }
        else if(level - 2 == 3)
        {
            var giveHint = "ACCESS GRANTED";
            document.querySelector(".firstHint").innerHTML = "<span>"+giveHint+"</span><br>Welcome to Umbrella Inc.";
            document.querySelector(".instruction1").innerHTML = '"You did an exceptional job agent press the play gain button to feel the thrill again"';
            document.querySelector(".codeDisplay").value = "HAIL";
            
            var buttonLength = document.querySelectorAll("input[type='button']").length;
            for (var i = 0; i < buttonLength; i++) {
                document.querySelectorAll("input[type='button']")[i].setAttribute("onclick", "");
            }
            document.querySelector(".playAgain").style.display = "block";
        }

    } else {
        clearDisplay();
        document.querySelector(".codeDisplay").value = "ERROR";
        life--;
        document.querySelector(".life").innerHTML = life;
        if (life === 0) {

            document.querySelector(".codeDisplay").value = "ALERT";
            document.querySelector(".firstHint").innerHTML = "You have alerted the security systems <span style='color:#ff5555'>Game Over<span>";
            document.querySelector(".firstHint").style.fontSize = "1.5rem";
            document.querySelector("table").style.border = "2px solid #ff5555";
            document.querySelector("input[type='text']").style.border = "2px solid #ff5555";
            document.querySelector("input[type='text']").style.color = "#ff5555";
            document.querySelector(".instruction1").style.display = "none";
            document.querySelector(".agent-geek").style.display = "none";
            document.querySelector(".playAgain").style.display = "block";

            var buttonLength = document.querySelectorAll("input[type='button']").length;
            for (var i = 0; i < buttonLength; i++) {
                document.querySelectorAll("input[type='button']")[i].setAttribute("onclick", "");
                document.querySelectorAll("input[type='button']")[i].style.border = "2px solid #ff5555";
                document.querySelectorAll("input[type='button']")[i].style.color = "#ff5555";
            }

        }
        gamePlay();
    }
}

var buttonLength = document.querySelectorAll("input[type='button']").length;
for(var i=0; i<buttonLength; i++)
{
    document.querySelectorAll("input[type='button']")[i].addEventListener("click",function()
    {
        var audio = new Audio("mainBeep.mp3");
        if((level - 2) == 3)
        {
            audio = new Audio("welcome.wav");
        }
        else if(life === 0)
        {
            audio = new Audio("secondBeep.wav");
        }
        audio.play();
    });
}
