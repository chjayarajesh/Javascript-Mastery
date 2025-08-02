let dis = "";
let arrhis = [];
let pre = "";
const a = document.querySelectorAll(".bt");
a.forEach((value) => {
    value.addEventListener("click", function () {
        const exp = document.querySelector(".exp").querySelector("p");
        const res = document.querySelector(".result").querySelector("p");
        const pp = document.querySelector(".hist").querySelector("P")

        if(this.innerHTML == "CE"){
            exp.innerHTML = "";
            res.innerHTML = "";
        }
        else if(this.innerText == "backspace"){
                exp.innerHTML = exp.innerHTML.slice(0,-1);
                res.innerHTML = "";
        }
        else if(this.innerHTML == "="){
                res.innerHTML = eval (exp.innerHTML);
                let history ={ exp : exp.innerHTML , res : res.innerHTML};;
                arrhis.push(history);    
                pre = history['res'];
        }
        else if(this.innerText == "history"){
                arrhis.forEach((value) =>{
                    dis +=  `${value['exp']} = ${value['res']} <br>` ;
                });
                pp.innerHTML = dis;
                document.querySelector(".popup").style.display = "flex";
        }
        else if(this.innerHTML == "1/X"){
                exp.innerHTML = `1/(${res.innerHTML})`;
                res.innerHTML = `${1/res.innerText}`
                let history ={ exp : exp.innerHTML , res : res.innerHTML};;
                arrhis.push(history);
        }
        else if(this.innerHTML == "X^2"){
                exp.innerHTML = `square(${res.innerHTML})`;
                res.innerHTML = `${(eval(res.innerText))**2}`
                let history ={ exp : exp.innerHTML , res : res.innerHTML};;
                arrhis.push(history);
        }
        else if(this.innerHTML == "sqrt(x)"){
                exp.innerHTML = `sqrt(${res.innerHTML})`;
                res.innerHTML = `${(eval(res.innerText))**0.5}`
                let history ={ exp : exp.innerHTML , res : res.innerHTML};;
                arrhis.push(history);
        }
        else if(this.innerHTML == "Ans"){
                if(exp.innerHTML == ""){
                    exp.innerHTML += pre;
                }
                else if (!isNaN(exp.innerHTML.slice(-1))){
                    exp.innerHTML += "*" + pre;
                    res.innerHTML = "";
                }
        }
        else{

                if (exp.innerHTML.length < 16){
                        exp.innerHTML += this.innerHTML;
                        res.innerHTML = "";
                }
                else{
                        alert("Input exceeds the display!");   
                }
        }
        });
});
document.querySelector(".close").addEventListener("click",function(){
    document.querySelector(".popup").style.display = "none";
})