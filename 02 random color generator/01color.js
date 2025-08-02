const display = document.getElementsByClassName("display")[0]
const random = document.getElementsByClassName("random")[0];
const currhex = document.querySelector(".currhex");
const previous = document.querySelector(".previous");
const next = document.querySelector(".next");
const generated = document.querySelector(".generated");
const msg = document.querySelector(".msg")
const arr = []
let index = 0;
let isVisible = false;
// to display the color using dom manipulation
function displayColor(hex){
    display.style.backgroundColor = hex;
    currhex.innerText = hex;
    currhex.style.color = hex;
    index = arr.indexOf(hex)
}

// to add the colors to an array and adding it to a generated div element
function addColor(hex){
    console.log(hex);
    arr.push(hex);
    index = arr.length - 1;
    let HTMLtext = `
        <div class="set">
                <div class="color-btn" >
                    <button onclick="displayColor('${hex}')" style="background-color:${hex};"></button>
                </div>
                <div class="code">
                    <p>${hex}</p>
                </div>
            </div>
    `;
    generated.insertAdjacentHTML("beforeend",HTMLtext);
    previous.style.visibility = "visible";
}
// skip this dont try to understand this first
function nextColor(){
    if (index < arr.length-1){
        index += 1;
        display.style.backgroundColor = arr[index];
        currhex.innerText = arr[index];
        currhex.style.color = arr[index];
        next.style.visibility = "visible"
        previous.style.visibility = "visible";
        isVisible = true;
        msg.style.visibility="hidden"
    }
    else{
        msg.style.visibility="visible"
        msg.innerText = "This is the last color that had generated.";
        next.style.visibility="hidden";
    }
}
// try to understand this here we are using an index variable to traverse througn the array
function previousColor(){
    if(index > 0){
        index -= 1;
        display.style.backgroundColor = arr[index];
        currhex.innerText = arr[index];
        currhex.style.color = arr[index];
        next.style.visibility = "visible"
        msg.style.visibility="hidden";
    }
    else{
        msg.style.visibility="visible"
        msg.innerText = "This is the first color that had generated.";
        previous.style.visibility="hidden";
    }
}

// function to generate random color
function randomColor(){
    let r1 = Math.floor(Math.random()*256); // to generate red
    let r2 = Math.floor(Math.random()*256); // to generate green
    let r3 = Math.floor(Math.random()*256); // to generate dblue
    // to convert into hex code
    let h1 = r1.toString(16);
    let h2 = r2.toString(16);
    let h3 = r3.toString(16);

    let hex = "#" + h1 + h2 + h3; // 
    // while loop is used to add "f" if the generated hex code has less than 6 characters
    while(hex.length < 7){
        hex += "f";
    }
    // calling display function to display the color
    displayColor(hex);
    // add func to add color into array 
    addColor(hex);
    msg.style.visibility="hidden";
    if(isVisible){
        next.style.visibility = "hidden";
    }
}

random.onclick = randomColor
previous.onclick = previousColor;
next.onclick = nextColor;