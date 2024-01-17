// Document Variables
let header = document.getElementById("header");
let mainTitle = document.getElementById("mainTitle");
let mainArea = document.getElementById("mainArea");

let modeOneBtn = document.getElementById("modeOneBtn");
let modeCpuBtn = document.getElementById("modeCpuBtn");

let nextBtn = document.getElementById("nextBtn");

// JavaScript Variables
let mode, rounds;


// Mode Selection
modeOneBtn.addEventListener('click', function () {
    if (mode) {
        modeCpuBtn.classList.add("bg-transparent");
        modeCpuBtn.classList.add("whiteF");
        modeOneBtn.classList.remove("bg-transparent");
        modeOneBtn.classList.remove("whiteF");
        mode = "modeOne";
    } else {
        modeOneBtn.classList.remove("bg-transparent");
        modeOneBtn.classList.remove("whiteF");
        mode = "modeOne";
    }
});
modeCpuBtn.addEventListener('click', function () {
    if (mode) {
        modeOneBtn.classList.add("bg-transparent");
        modeOneBtn.classList.add("whiteF");
        modeCpuBtn.classList.remove("bg-transparent");
        modeCpuBtn.classList.remove("whiteF");
        mode = "modeCpu";
    } else {
        modeCpuBtn.classList.remove("bg-transparent");
        modeCpuBtn.classList.remove("whiteF");
        mode = "modeCpu";
    }
});

nextBtn.addEventListener('click', function () {
    if (mode && !rounds) {
        mainTitle.innerHTML = "Choose Rounds";
        mainArea.innerHTML = "";
        // Button One
        const roundOneDiv = document.createElement("div");
        roundOneDiv.setAttribute("class", "col-auto");
        const roundOneBtn = document.createElement("button");
        roundOneBtn.classList.add("btn");
        roundOneBtn.classList.add("btn-light");
        roundOneBtn.classList.add("bg-transparent");
        roundOneBtn.classList.add("whiteF");
        roundOneBtn.classList.add("px-4");
        roundOneBtn.classList.add("py-2");
        roundOneBtn.textContent = "1 / 1";
        roundOneDiv.appendChild(roundOneBtn);
        mainArea.appendChild(roundOneDiv);
        roundOneBtn.addEventListener('click', function () {
            if (rounds) {
                roundThreeBtn.classList.add("bg-transparent");
                roundThreeBtn.classList.add("whiteF");
                roundTwoBtn.classList.add("bg-transparent");
                roundTwoBtn.classList.add("whiteF");
                roundOneBtn.classList.remove("bg-transparent");
                roundOneBtn.classList.remove("whiteF");
                rounds = "1";
            } else {
                roundOneBtn.classList.remove("bg-transparent");
                roundOneBtn.classList.remove("whiteF");
                rounds = "1";
            }
            rounds = "1";
        });
        // Button Two
        const roundTwoDiv = document.createElement("div");
        roundTwoDiv.setAttribute("class", "col-auto");
        const roundTwoBtn = document.createElement("button");
        roundTwoBtn.classList.add("btn");
        roundTwoBtn.classList.add("btn-light");
        roundTwoBtn.classList.add("bg-transparent");
        roundTwoBtn.classList.add("whiteF");
        roundTwoBtn.classList.add("px-4");
        roundTwoBtn.classList.add("py-2");
        roundTwoBtn.textContent = "3 / 5";
        roundTwoDiv.appendChild(roundTwoBtn);
        mainArea.appendChild(roundTwoDiv);
        roundTwoBtn.addEventListener('click', function () {
            if (rounds) {
                roundThreeBtn.classList.add("bg-transparent");
                roundThreeBtn.classList.add("whiteF");
                roundOneBtn.classList.add("bg-transparent");
                roundOneBtn.classList.add("whiteF");
                roundTwoBtn.classList.remove("bg-transparent");
                roundTwoBtn.classList.remove("whiteF");
                rounds = "2";
            } else {
                roundTwoBtn.classList.remove("bg-transparent");
                roundTwoBtn.classList.remove("whiteF");
                rounds = "2";
            }
            rounds = "2";
        });
        // Button Three
        const roundThreeDiv = document.createElement("div");
        roundThreeDiv.setAttribute("class", "col-auto");
        const roundThreeBtn = document.createElement("button");
        roundThreeBtn.classList.add("btn");
        roundThreeBtn.classList.add("btn-light");
        roundThreeBtn.classList.add("bg-transparent");
        roundThreeBtn.classList.add("whiteF");
        roundThreeBtn.classList.add("px-4");
        roundThreeBtn.classList.add("py-2");
        roundThreeBtn.textContent = "4 / 7";
        roundThreeDiv.appendChild(roundThreeBtn);
        mainArea.appendChild(roundThreeDiv);
        roundThreeBtn.addEventListener('click', function () {
            if (rounds) {
                roundOneBtn.classList.add("bg-transparent");
                roundOneBtn.classList.add("whiteF");
                roundTwoBtn.classList.add("bg-transparent");
                roundTwoBtn.classList.add("whiteF");
                roundThreeBtn.classList.remove("bg-transparent");
                roundThreeBtn.classList.remove("whiteF");
                rounds = "3";
            } else {
                roundThreeBtn.classList.remove("bg-transparent");
                roundThreeBtn.classList.remove("whiteF");
                rounds = "3";
            }
            rounds = "3";
        });
    } else if (mode && rounds) {
        gamePlay(mode, rounds);
    }
});

function gamePlay(mode, rounds) {
    if (mode === "modeOne") {
        mainTitle.innerHTML = "Player 1: Make your Move";
        mainArea.innerHTML = "";
    } else if (mode === "modeCpu") {
        mainTitle.innerHTML = "Player 1: Make your Move";
        mainArea.innerHTML = "";
    }

}

function playerOne() {
    mainTitle.innerHTML = "Player 1: Make your Move";
    mainArea.innerHTML = "";
}