let taskpage = document.querySelector(".taskpage");
let hispage = document.querySelector(".hispage");
let userip = document.querySelector(".userip");
let tasklist = document.querySelector(".tasklist");
let hislist = document.querySelector(".historylist");
let addtask = document.querySelector(".addtask");
let taskip = document.querySelector(".taskip");
let popup = document.querySelector(".popup");

let count = 1;
function display(item){
    item.style.display = "grid";
}
function hide(item){
    item.style.display = "none";
}
function updates(){
    let over  = document.querySelectorAll(".overbtn");
    let remove  = document.querySelectorAll(".rembtn");
    let edit = document.querySelectorAll(".editbtn");
    remove.forEach((value) =>{
        value.addEventListener("click",(event) =>{
            let remClass = event.target.closest(".remove");
            let action = remClass.closest(".actions");
            let parent = action.closest(".task");
            let com_name = parent.querySelector(".taskname").querySelector("p").innerHTML;
            const his_text = `<div class="history" style="background-color : rgb(234, 55, 49); color : white;">
                                <div class="name"><p>${com_name}</p></div>
                                <div><p>Cancelled</p></div>
                            </div>`
            hislist.innerHTML += his_text;
            parent.remove();
            popup.style.display = "block";
            popup.style.backgroundColor = "rgb(234, 55, 49)";

            popup.innerHTML = "Task Cancelled"
            setTimeout(() => {
                popup.style.display = "none";
            }, 1000);
        });
    });

    over.forEach((value) =>{
        value.addEventListener("click",(event) =>{
            let overClass = event.target.closest(".over");
            let action = overClass.closest(".actions");
            let parent = action.closest(".task");
            let com_name = parent.querySelector(".taskname").querySelector("p").innerHTML;
            const his_text = `<div class="history" style="background-color : rgb(114, 240, 30); color : white;">
                                <div class="name"><p>${com_name}</p></div>
                                <div><p>Completed</p></div>
                            </div>`
            hislist.innerHTML += his_text;
            parent.remove();
            popup.style.display = "block";
            popup.style.backgroundColor = "rgb(67, 168, 0)";
            popup.innerHTML = "Task Completed"
            setTimeout(() => {
                popup.style.display = "none";
            }, 1000);
        });
    });

    edit.forEach((value) =>{
        value.addEventListener("click",(event) =>{
            let editClass = event.target.closest(".edit");
            let action = editClass.closest(".actions");
            let parent = action.closest(".task");

            let edit_txt = parent.querySelector(".edit-text");
            let task_name = parent.querySelector(".taskname");

            let edit_btn = parent.querySelector(".editbtn");
            let check_btn = parent.querySelector(".okbtn");

            let rem = parent.querySelector(".remove");
            let over = parent.querySelector(".over");
            let check = parent.querySelector(".ok");
            let edit = parent.querySelector(".edit");

            edit_txt.querySelector("input").value = task_name.querySelector("p").innerHTML;
            display(edit_txt);
            display(check);
            hide(task_name);
            hide(rem);
            hide(over);
            hide(edit);
            document.querySelector(".actions").style.justifyContent = "flex-end"
            document.querySelector(".actions").style.width = "100px"
            document.querySelector(".edit-text").style.width = "100%"
            
            check_btn.addEventListener("click", function(){
                let renamed = edit_txt.querySelector("input").value;
                document.querySelector(".actions").style.width = "200px"
                task_name.querySelector("p").innerHTML = renamed;
                document.querySelector(".actions").style.justifyContent = "space-evenly"
                display(task_name);
                display(rem);
                display(over);
                display(edit);
                hide(edit_txt);
                hide(check);
            });
        });
    });
}



taskpage.addEventListener("click" , function(){
    display(tasklist);
    userip.style.display = "flex";
    hide(hislist)
    taskpage.style.boxShadow = "0px 4px 5px rgb(243, 138, 26)"
    hispage.style.boxShadow = "0px 0px 0px white"
});

hispage.addEventListener("click" , function(){
    display(hislist);
    hide(userip);
    hide(tasklist)
    hispage.style.boxShadow = "0px 4px 5px rgb(243, 138, 26)"
    taskpage.style.boxShadow = "0px 0px 0px white"
});

addtask.addEventListener("click", function(){
    let tasklist = document.querySelector(".tasklist");
    let name = taskip.value;
    if(name == ""){
        popup.style.display = "block";
        popup.style.backgroundColor = "rgb(255, 0, 0)";
        popup.innerHTML = "Please enter Task!";
        setTimeout(() => {
            popup.style.display = "none";
        }, 1500);
    }
    else{
        let txt = `<div class="task">
                        <div class="taskname"><p>${name}</p></div>
                        <div class="edit-text"><input class="editing"></div>
                        <div class="actions">
                            <div class="edit">
                                <button class="editbtn">
                                    <span class="material-symbols-outlined">
                                        edit
                                        </span>
                                </button>
                            </div>
                            <div class="remove">
                                <button class="rembtn">
                                    <span class="material-symbols-outlined">
                                        delete
                                        </span>
                                </button>
                            </div>
                            <div class="over">
                                <button class="overbtn">
                                    <span class="material-symbols-outlined">
                                        done_outline
                                        </span>
                                </button>
                            </div>
                            <div class="ok" style = "display : none;">
                                <button class="okbtn">
                                    <span class="material-symbols-outlined">
                                        check
                                        </span>
                                </button>
                            </div>
                        </div>
                    </div>`
        
        
        
        tasklist.innerHTML += txt;
        taskip.value = "";
        popup.style.display = "block";
        popup.style.backgroundColor = "rgb(243, 138, 26)";
        popup.innerHTML = "Task Added"
        setTimeout(() => {
            popup.style.display = "none";
        }, 1000);
        updates();
    }
});

