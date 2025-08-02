document.getElementsByClassName("play")[0].addEventListener("click", function(){
    let random1 = Math.floor(Math.random() * 6) + 1;
    let random2 = Math.floor(Math.random() * 6) + 1;

    //player 1
    document.getElementsByClassName("img1")[0].src = `dice${random1}.png`;
    document.getElementsByClassName("img2")[0].src = `dice${random2}.png`;

    if (random1 > random2){
        document.getElementsByClassName("result")[0].innerText = "Player 1 Wins";
    }
    else if(random1 < random2){
        document.getElementsByClassName("result")[0].innerText = "Player 2 Wins";
    }
    else{
        document.getElementsByClassName("result")[0].innerText = "Draw";
    }
});