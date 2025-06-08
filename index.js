var playing = false;
var score;
var timeremaining;
var action;
var correctAnswer;

document.getElementById("startreset").onclick = function(){
    if(playing == true){
        location.reload();
    }
    else{
        playing = true;
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        document.getElementById("timeremain").style.display = "block";
        timeremaining = 60;
        document.getElementById("timeleft").innerHTML = timeremaining;
        hide("gameover");
        document.getElementById("startreset").innerHTML = "Reset Game";
        startCountDown();
        generateQA();
    }
}

for(i=1;i<5;i++){
    document.getElementById("box"+i).onclick = function(){
        if(playing == true){
            if(this.innerHTML == correctAnswer){
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                },1000);
                generateQA();
            }
            else{
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                },1000);
            }
        }
    }
}

function startCountDown(){
    action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById("timeleft").innerHTML = timeremaining;
        if(timeremaining == 0){
            stopCountDown();
            show("gameover");
            document.getElementById("gameover").innerHTML = "<p>Game Over!</p><p>Your Score is " + score + "</p>";
            hide("timeremain");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    },1000);
}

function stopCountDown(){
    clearInterval(action);
}

function hide(Id){
    document.getElementById(Id).style.display = "none";
}

function show(Id){
    document.getElementById(Id).style.display = "block";
}

function generateQA(){
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = x +" "+ "x" +" "+ y;
    var correctPosition = 1 + Math.round(3 * Math.random());
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer;
    
    var answer = [correctAnswer];
    for(i=1;i<5;i++){
        if(i !== correctPosition){
            var wrongAnswer;
            do{
                wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
            }while(answer.indexOf(wrongAnswer)>-1)
            
            document.getElementById("box" + i).innerHTML = wrongAnswer;
            answer.push(wrongAnswer);
        }
    }
    
    
}

