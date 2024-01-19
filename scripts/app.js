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

function ToggleModeBtn(clickedBtn, unselectedBtn) {
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
function CreateRoundBtn(text, value) {
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
    });
}

let matchEnd, playAgain;

// Next Button
nextBtn.addEventListener('click', function () {
    if (playAgain) {
        //restart web page
        location.reload();
    } else if (matchEnd) {
        let winner;
        if (playerOneScore > playerTwoScore) {
            winner = "Player 1";
        } else if (playerOneScore < playerTwoScore) {
            winner = "Player 2/ CPU";
        } else {
            winner = "Both"
        }
        mainTitle.innerHTML = `Match Results: ${winner} wins!`;
        mainArea.innerHTML = `Player 1 Score: ${playerOneScore} | Player 2/CPU Score: ${playerTwoScore}`;
        selectionTag.textContent = "Play Again? Click the next arrow.";
        playAgain = true;
    } else if (mode && roundNum && playerOneChoice && playerTwoChoice) {
        let result = DetermineWinner();
        mainTitle.innerHTML = `Player 1, you ${result} this round!`;
        mainArea.innerHTML = `P1: ${IconSwitch(playerOneChoice)} vs P2/CPU: ${IconSwitch(playerTwoChoice)}`;
        selectionTag.textContent = "";

        roundCount++;
        console.log(roundCount);
        console.log(roundNum);

        playerOneChoice = "";
        playerTwoChoice = "";
        if (roundNum === roundCount) {
            matchEnd = true;
        }

    } else if (mode && roundNum && playerOneChoice) {
        if (mode === "modeOne") {
            mainTitle.innerHTML = "Player 2: Make your Move";
            mainArea.innerHTML = "";
            selectionTag.textContent = "";

            iconClassArr.forEach((type) => CreateGameArea(type));
            iconButtonsArr.forEach(iconBtn => {
                iconBtn.addEventListener('click', function () {
                    let index = iconButtonsArr.indexOf(iconBtn);
                    UpdateChoice(index);

                    playerTwoChoice = choice;

                    ToggleIconBtn(index);
                });
            });

        } else if (mode === "modeCpu") {
            mainTitle.innerHTML = "CPU: Make your Move";
            mainArea.innerHTML = "CPU has selected...";
            selectionTag.textContent = "";
            callApi();
        }
    } else if (mode && rounds) {
        matchEnd = false;
        mainTitle.innerHTML = "Player 1: Make your Move";
        mainArea.innerHTML = "";
        iconClassArr.forEach((type) => CreateGameArea(type));

        iconButtonsArr.forEach(iconBtn => {
            iconBtn.addEventListener('click', function () {
                let index = iconButtonsArr.indexOf(iconBtn);
                UpdateChoice(index);

                playerOneChoice = choice;

                ToggleIconBtn(index);
            });
        });

        // if (userHasSelected) {
        // }
        // console.log(playerOneChoice);

        // GamePlay(mode, rounds);

        // console.log(playerOneChoice);
        // console.log(roundCount);
        // console.log(mode);
        // console.log(roundNum);
    }
    else if (mode) {
        mainTitle.innerHTML = "Choose Rounds";
        mainArea.innerHTML = "";
        roundLabelsArr.forEach((label, index) => CreateRoundBtn(label, index + 1));
        // console.log(choice);
        // console.log(roundCount);
        // console.log(mode);
        // console.log(roundNum);
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
let playerOneScore = 0;
let playerTwoScore = 0;
let choice;
let playerOneChoice;
let playerTwoChoice;
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
let iconBtn, iconTag;

function UpdateChoice(index) {
    choice = index + 1;
    // Handle other cases, if needed
    if (choice > 5) {
        choice = ((choice - 1) % 5) + 1;
    }
}

function CreateGameArea(type) {
    const playDiv = document.createElement("div");
    playDiv.setAttribute("class", "col-auto");

    iconBtn = document.createElement("button");
    iconBtn.classList.add("btn");

    iconTag = document.createElement("i");
    iconTag.classList.add("fa-regular", type, "font-60");

    iconBtn.appendChild(iconTag);
    playDiv.appendChild(iconBtn);
    mainArea.appendChild(playDiv);

    iconTagArr.push(iconTag);
    iconButtonsArr.push(iconBtn);

    // iconBtn.addEventListener('click', function () {
    //     choice = iconButtonsArr.indexOf(iconBtn) + 1;
    //     userHasSelected = true;
    //     // console.log(choice);
    //     iconTagArr.forEach(tag => {
    //         tag.classList.remove("fa-solid");
    //         tag.classList.add("fa-regular");
    //     });
    //     iconTag.classList.remove("fa-regular");
    //     iconTag.classList.add("fa-solid");

    //     selectionTag.textContent = "";
    //     // Handle other cases, if needed
    //     if (choice > 5) {
    //         choice = ((choice - 1) % 5) + 1;
    //     }
    //     // console.log(choice);
    //     switch (choice) {
    //         case 1:
    //             selectionTag.textContent = "Rock";
    //             break;
    //         case 2:
    //             selectionTag.textContent = "Paper";
    //             break;
    //         case 3:
    //             selectionTag.textContent = "Scissors";
    //             break;
    //         case 4:
    //             selectionTag.textContent = "Lizard";
    //             break;
    //         case 5:
    //             selectionTag.textContent = "Spock";
    //             break;
    //     }
    // });
}

function ToggleIconBtn(index) {
    iconTagArr.forEach(tag => {
        tag.classList.remove("fa-solid");
        tag.classList.add("fa-regular");
    });

    iconTagArr[index].classList.remove("fa-regular");
    iconTagArr[index].classList.add("fa-solid");

    selectionTag.textContent = "";
    selectionTag.textContent = IconSwitch(choice);
}

function IconSwitch(choice) {
    switch (choice) {
        case 1:
            return "Rock";
        case 2:
            return "Paper";
        case 3:
            return "Scissors";
        case 4:
            return "Lizard";
        case 5:
            return "Spock";
    }
}

function DetermineWinner() {
    const possibleOutcomes = [
        ["TIE", "LOSE", "WIN", "WIN", "LOSE"],
        ["WIN", "TIE", "LOSE", "LOSE", "WIN"],
        ["LOSE", "WIN", "TIE", "WIN", "LOSE"],
        ["LOSE", "WIN", "LOSE", "TIE", "WIN"],
        ["WIN", "LOSE", "WIN", "LOSE", "TIE"]
    ];

    const outcome = possibleOutcomes[playerOneChoice - 1][playerTwoChoice - 1];

    if (outcome === "WIN") {
        playerOneScore++;
    } else if (outcome === "LOSE") {
        playerTwoScore++;
    }

    return outcome;
}


// function DetermineWinner() {
//     switch (playerOneChoice) {
//         case 1:
//             if (playerTwoChoice == 1) { return "TIE!" }
//             if (playerTwoChoice == 2) { return "LOSE!" }
//             if (playerTwoChoice == 3) { return "WIN!" }
//             if (playerTwoChoice == 4) { return "WIN!" }
//             if (playerTwoChoice == 5) { return "LOSE!" }
//         case 2:
//             if (playerTwoChoice == 1) { return "WIN!" }
//             if (playerTwoChoice == 2) { return "TIE!" }
//             if (playerTwoChoice == 3) { return "LOSE!" }
//             if (playerTwoChoice == 4) { return "LOSE!" }
//             if (playerTwoChoice == 5) { return "WIN!" }
//         case 3:
//             if (playerTwoChoice == 1) { return "LOSE!" }
//             if (playerTwoChoice == 2) { return "WIN!" }
//             if (playerTwoChoice == 3) { return "TIE!" }
//             if (playerTwoChoice == 4) { return "WIN!" }
//             if (playerTwoChoice == 5) { return "LOSE!" }
//         case 4:
//             if (playerTwoChoice == 1) { return "LOSE!" }
//             if (playerTwoChoice == 2) { return "WIN!" }
//             if (playerTwoChoice == 3) { return "LOSE!" }
//             if (playerTwoChoice == 4) { return "TIE!" }
//             if (playerTwoChoice == 5) { return "WIN!" }
//         case 5:
//             if (playerTwoChoice == 1) { return "WIN!" }
//             if (playerTwoChoice == 2) { return "LOSE!" }
//             if (playerTwoChoice == 3) { return "WIN!" }
//             if (playerTwoChoice == 4) { return "LOSE!" }
//             if (playerTwoChoice == 5) { return "TIE!" }
//     }
// }

async function callApi() {
    const promise = await fetch("https://rpslsapi.azurewebsites.net/RPSLS");
    const data = await promise.text();

    switch (data) {
        case "Rock":
            cpuChoice = 1;
            break;
        case "Paper":
            cpuChoice = 2;
            break;
        case "Scissors":
            cpuChoice = 3;
            break;
        case "Lizard":
            cpuChoice = 4;
            break;
        case "Spock":
            cpuChoice = 5;
            break;
    }

    selectionTag.textContent = data;
    playerTwoChoice = cpuChoice;
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
