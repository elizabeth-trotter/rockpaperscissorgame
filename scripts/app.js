// Document Variables
let header = document.getElementById("header");
let mainTitle = document.getElementById("mainTitle");
let mainArea = document.getElementById("mainArea");
let selectionTag = document.getElementById("selectionTag");

let modeOneBtn = document.getElementById("modeOneBtn");
let modeCpuBtn = document.getElementById("modeCpuBtn");

let nextBtn = document.getElementById("nextBtn");

// JavaScript Variables
let mode, rounds, roundNum;
let roundCount = 0;

// Mode Selection
modeOneBtn.addEventListener('click', function () {
    ToggleModeBtn(modeOneBtn, modeCpuBtn);
});

modeCpuBtn.addEventListener('click', function () {
    ToggleModeBtn(modeCpuBtn, modeOneBtn);
});

async function ToggleModeBtn(clickedBtn, unselectedBtn) {
    if (mode) {
        unselectedBtn.classList.add("bg-transparent", "whiteF");
        clickedBtn.classList.remove("bg-transparent", "whiteF");
        if (clickedBtn === modeOneBtn) {
            mode = "modeOne";
        } else {
            mode = "modeCpu";
        }
    } else {
        clickedBtn.classList.remove("bg-transparent", "whiteF");
        if (clickedBtn === modeOneBtn) {
            mode = "modeOne";
        } else {
            mode = "modeCpu";
        }
    }
}

// Round Variables
let roundButtonsArr = [];
const roundLabelsArr = ["1 / 1", "3 / 5", "4 / 7"];

// Round Selection
async function CreateRoundBtn(text, value) {
    const roundDiv = document.createElement("div");
    roundDiv.setAttribute("class", "col-auto");

    const roundBtn = document.createElement("button");
    roundBtn.classList.add("btn", "btn-light", "bg-transparent", "whiteF", "px-4", "py-2");
    roundBtn.textContent = text;

    roundDiv.appendChild(roundBtn);
    mainArea.appendChild(roundDiv);
    roundButtonsArr.push(roundBtn);

    roundBtn.addEventListener('click', function () {
        if (rounds) {
            roundButtonsArr.forEach(btn => btn.classList.add("bg-transparent", "whiteF"));
            roundBtn.classList.remove("bg-transparent", "whiteF");
            rounds = value;
        } else {
            roundBtn.classList.remove("bg-transparent", "whiteF");
            rounds = value;
        }
    });
}

// Next Button
nextBtn.addEventListener('click', function () {
    if (mode && roundNum && playerChoice.length == 1) {
        if (mode === "modeOne") {
            //ask for player two input
            roundCount++;
        } else if (mode === "modeCpu") {
            mainTitle.innerHTML = "CPU: Make your Move";
            mainArea.innerHTML = "Selecting a choice..";
            callApi();
            playerChoice.push(cpuChoice);
            roundCount++;
        }
    } else if (mode && rounds) {
        mainTitle.innerHTML = "Player 1: Make your Move";
        mainArea.innerHTML = "";
        iconClassArr.forEach((type) => CreateGameArea(type));
        // GamePlay(mode, rounds);
        switch (rounds) {
            case 1:
                roundNum = 1;
                break;
            case 2:
                roundNum = 3;
                break;
            case 3:
                roundNum = 4;
                break;
        }
    }
    else if (mode) {
        mainTitle.innerHTML = "Choose Rounds";
        mainArea.innerHTML = "";
        roundLabelsArr.forEach((label, index) => CreateRoundBtn(label, index + 1));
    }
});

// Game Play
// async function GamePlay(mode, rounds) {
//     if (mode === "modeOne") {
//         mainTitle.innerHTML = "Player 1: Make your Move";
//         mainArea.innerHTML = "";
//         RoundControl(rounds);
//     } else if (mode === "modeCpu") {
//         mainTitle.innerHTML = "Player 1: Make your Move";
//         mainArea.innerHTML = "";
//     }
// }

// Game Play Variables
let modeOneScore = 0;
let playerChoice = [];
let cpuChoice;

// Icon Variables
let iconClassArr = ["fa-hand-back-fist", "fa-hand", "fa-hand-scissors", "fa-hand-lizard", "fa-hand-spock"];
let iconButtonsArr = [];
let iconTagArr = [];

// async function RoundControl(rounds) {
//     let roundNum;
//     switch (rounds) {
//         case 1:
//             roundNum = 1;
//             break;
//         case 2:
//             roundNum = 3;
//             break;
//         case 3:
//             roundNum = 4;
//             break;
//     }
//     for (let i = 0; i < roundNum; i++) {
//         iconClassArr.forEach((type) => CreateGameArea(type));
//     }
// }

async function CreateGameArea(type) {
    const playDiv = document.createElement("div");
    playDiv.setAttribute("class", "col-auto");

    const iconBtn = document.createElement("button");
    iconBtn.classList.add("btn");

    const iconTag = document.createElement("i");
    iconTag.classList.add("fa-regular", type, "font-60");

    iconBtn.appendChild(iconTag);
    playDiv.appendChild(iconBtn);
    mainArea.appendChild(playDiv);

    iconTagArr.push(iconTag);
    iconButtonsArr.push(iconBtn);

    iconBtn.addEventListener('click', function () {
        let choice = iconButtonsArr.indexOf(iconBtn);
        playerChoice.push(choice);
        iconTagArr.forEach(tag => {
            tag.classList.remove("fa-solid");
            tag.classList.add("fa-regular");
        });
        iconTag.classList.remove("fa-regular");
        iconTag.classList.add("fa-solid");
        // 0 = rock, 1 = paper, 2 = scissors, 3 = lizard, 4 = spock
        selectionTag.textContent = "";
        switch (choice) {
            case 0:
                selectionTag.textContent = "Rock";
                break;
            case 1:
                selectionTag.textContent = "Paper";
                break;
            case 2:
                selectionTag.textContent = "Scissors";
                break;
            case 3:
                selectionTag.textContent = "Lizard";
                break;
            case 4:
                selectionTag.textContent = "Spock";
                break;
        }
    });
}

async function callApi() {
    const promise = await fetch("https://rpslsapi.azurewebsites.net/RPSLS");
    const data = await promise.json;
    cpuChoice = data;
    console.log(cpuChoice);
}



























// Mode Selection
// modeOneBtn.addEventListener('click', function () {
//     if (mode) {
//         modeCpuBtn.classList.add("bg-transparent", "whiteF");
//         modeOneBtn.classList.remove("bg-transparent", "whiteF");
//         mode = "modeOne";
//     } else {
//         modeOneBtn.classList.remove("bg-transparent", "whiteF");
//         mode = "modeOne";
//     }
// });
// modeCpuBtn.addEventListener('click', function () {
//     if (mode) {
//         modeOneBtn.classList.add("bg-transparent", "whiteF");
//         modeCpuBtn.classList.remove("bg-transparent", "whiteF");
//         mode = "modeCpu";
//     } else {
//         modeCpuBtn.classList.remove("bg-transparent", "whiteF");
//         mode = "modeCpu";
//     }
// });

// nextBtn.addEventListener('click', function () {
//     if (mode && !rounds) {
//         mainTitle.innerHTML = "Choose Rounds";
//         mainArea.innerHTML = "";
//         // Button One
//         const roundOneDiv = document.createElement("div");
//         roundOneDiv.setAttribute("class", "col-auto");
//         const roundOneBtn = document.createElement("button");
//         roundOneBtn.classList.add("btn", "btn-light", "bg-transparent", "whiteF", "px-4", "py-2");
//         roundOneBtn.textContent = "1 / 1";
//         roundOneDiv.appendChild(roundOneBtn);
//         mainArea.appendChild(roundOneDiv);
//         roundOneBtn.addEventListener('click', function () {
//             if (rounds) {
//                 roundThreeBtn.classList.add("bg-transparent", "whiteF");
//                 roundTwoBtn.classList.add("bg-transparent", "whiteF");
//                 roundOneBtn.classList.remove("bg-transparent", "whiteF");
//                 rounds = "1";
//             } else {
//                 roundOneBtn.classList.remove("bg-transparent", "whiteF");
//                 rounds = "1";
//             }
//             rounds = "1";
//         });
//         // Button Two
//         const roundTwoDiv = document.createElement("div");
//         roundTwoDiv.setAttribute("class", "col-auto");
//         const roundTwoBtn = document.createElement("button");
//         roundTwoBtn.classList.add("btn");
//         roundTwoBtn.classList.add("btn-light");
//         roundTwoBtn.classList.add("bg-transparent");
//         roundTwoBtn.classList.add("whiteF");
//         roundTwoBtn.classList.add("px-4");
//         roundTwoBtn.classList.add("py-2");
//         roundTwoBtn.textContent = "3 / 5";
//         roundTwoDiv.appendChild(roundTwoBtn);
//         mainArea.appendChild(roundTwoDiv);
//         roundTwoBtn.addEventListener('click', function () {
//             if (rounds) {
//                 roundThreeBtn.classList.add("bg-transparent");
//                 roundThreeBtn.classList.add("whiteF");
//                 roundOneBtn.classList.add("bg-transparent");
//                 roundOneBtn.classList.add("whiteF");
//                 roundTwoBtn.classList.remove("bg-transparent");
//                 roundTwoBtn.classList.remove("whiteF");
//                 rounds = "2";
//             } else {
//                 roundTwoBtn.classList.remove("bg-transparent");
//                 roundTwoBtn.classList.remove("whiteF");
//                 rounds = "2";
//             }
//             rounds = "2";
//         });
//         // Button Three
//         const roundThreeDiv = document.createElement("div");
//         roundThreeDiv.setAttribute("class", "col-auto");
//         const roundThreeBtn = document.createElement("button");
//         roundThreeBtn.classList.add("btn");
//         roundThreeBtn.classList.add("btn-light");
//         roundThreeBtn.classList.add("bg-transparent");
//         roundThreeBtn.classList.add("whiteF");
//         roundThreeBtn.classList.add("px-4");
//         roundThreeBtn.classList.add("py-2");
//         roundThreeBtn.textContent = "4 / 7";
//         roundThreeDiv.appendChild(roundThreeBtn);
//         mainArea.appendChild(roundThreeDiv);
//         roundThreeBtn.addEventListener('click', function () {
//             if (rounds) {
//                 roundOneBtn.classList.add("bg-transparent");
//                 roundOneBtn.classList.add("whiteF");
//                 roundTwoBtn.classList.add("bg-transparent");
//                 roundTwoBtn.classList.add("whiteF");
//                 roundThreeBtn.classList.remove("bg-transparent");
//                 roundThreeBtn.classList.remove("whiteF");
//                 rounds = "3";
//             } else {
//                 roundThreeBtn.classList.remove("bg-transparent");
//                 roundThreeBtn.classList.remove("whiteF");
//                 rounds = "3";
//             }
//             rounds = "3";
//         });
//     } else if (mode && rounds) {
//         gamePlay(mode, rounds);
//     }
// });
