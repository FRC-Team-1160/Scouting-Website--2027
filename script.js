//How to use first in terminal
//$ cd ~/Desktop/robotics\ Scouting\ form
//$ npx serve
//Then go to http://localhost:3000 
//Then click on the html file!
//testing
fetch("2026casgv_team_list.csv")
	.then(response => response.text())
	.then(data => {
		const lines = data.split('\n');
    		const select = document.getElementById("team");

	for(let i = 1; i < lines.length; i++){
        const values = lines[i].split(',');
        const teamNumber = values[0];

        if(teamNumber){
            const option = document.createElement("option");
            option.value = teamNumber;
            option.textContent = teamNumber;
            select.appendChild(option);

        }
    }
});

function setupOther(buttonID, textboxID){

    const button = document.getElementById(buttonID);
    const textbox = document.getElementById(textboxID);

    button.addEventListener("change", function(){

        textbox.hidden = !button.checked;
        textbox.required = button.checked;

    });
}

setupOther("otherAutoLoc", "otherAutoTextLoc");
//setupOther("otherAutoRole", "otherAutoTextRole"); 

const form = document.getElementById("scoutingForm");
const checkboxList = ["autoLocation"];

form.addEventListener("submit", function(event){
    let missedList = [];
    for(let i = 0; i < checkboxList.length; i++){
            const boxes = document.querySelectorAll(`input[type="checkbox"][name=${checkboxList[i]}]`);
                let selected = false;
                for(let j = 0; j < boxes.length; j++){
                    if(boxes[j].checked){
                        selected = true;
                        break;
                    }
                }
                if(!selected){
                    missedList.push(checkboxList[i]);
                }
    }
    if(missedList.length != 0){
        let word = "You need to awnser: " + codeToEnglish(missedList[0]);
        for(let i = 1; i < missedList.length; i++){
            word += ", " + codeToEnglish(missedList[i]);
        }
        event.preventDefault();
        alert(word);
    }
});

const translate = ["\"Where did they go in auto?\""];

function codeToEnglish(word){
    for(let i = 0; i < checkboxList.length; i++){
        if(word == checkboxList[i]){
            return translate[i];
        }
    }
    return "<YouShouldn'tSeeThis>";
}