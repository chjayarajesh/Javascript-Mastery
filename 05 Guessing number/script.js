let result = document.querySelector(".result")
let input = document.querySelector("input");
let button = document.querySelector("button");
let hint = document.querySelector(".hint");
let timer = document.querySelector(".timer");
let computer = 0;
let generate = false;
let chances = 0;
let user;
let timeSec = 20;
//to start the time when the game starts
const gameStart = ()=>{
    const Interval = setInterval(()=>{
        timer.querySelector("span").innerText = timeSec;
        timeSec -= 1;
        if(timeSec < 0){
            clearInterval(Interval);
            result.innerText = "Time Out!";
            result.style.color = "red";
            generate = false;
            button.innerText = "Replay";
            timeSec = 20;
        }
    },1000);
}
// to generate a random number
const randomNum = ()=>{
    computer = Math.floor(Math.random() * 100) + 1;
    button.innerText = "check";
}

//game logic function
const game = ()=>{
    // checking if the number is generated or not 
    if(!generate){
        randomNum();
        console.log("computer " + computer);
        generate = true;
        gameStart();
    }else{
        user = input.value;
        result.style.visibility = "hidden";
        if(user == ''){
            console.log("user is empty");
            result.style.color = "red";
            result.innerText = "Enter a number to guess.";
            result.style.visibility = "visible";
        }else{
            result.style.visibility = "hidden";
            user = Number(input.value);
            if(user === computer){
                result.style.visibility = "visible";
                result.style.color = "green";
                result.innerText = "WoW! You guessed Number";
                generate = false;
                button.innerText = "Replay";
            }else {
                if(user > computer){
                    console.log("greater")
                    hint.style.visibility = "visible";
                    hint.querySelector("span").innerText = "Too high!";
                }else{
                    console.log("lesser");
                    hint.style.visibility = "visible";
                    hint.querySelector("span").innerText = "Too Low!";
                }
            }
        }
    }
    input.value = '';
}

//when button clicked the game starts 
button.addEventListener("click",()=>{
    if(!generate){
        computer = 0;
        result.innerText = "Enter a number to Guess."
        button.innerText = "Start";
        hint.style.visibility = "hidden";
    }
    game();
})