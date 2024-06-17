const container = document.querySelector(".container");
const xButton = document.getElementById("1b");
const oButton = document.getElementById("2b");
let iconselector
let computerPlay = false
let computerIcon
let userIcon
let squareArray = Array(9).fill("")
let squresTakenArray = Array(9).fill("")
let winCount = []
let currentPlayer

function checkDuplicate() {
    let random
    if (squresTakenArray.includes("")) {
        console.log(squresTakenArray)
    }
    do {
        random = Math.floor(Math.random() * squareArray.length)
        console.log(999999999)
    } while (squresTakenArray[random] == "Taken");
    return random
}

function iconInitializer() {
    if (!iconselector) {
        userIcon = "X"
        computerIcon = "O"
    } else {
        userIcon = "O"
        computerIcon = "X"
    }
}

function cp() {
    let cI
    if (currentPlayer === "c") {
        setTimeout(() => {
            let random = checkDuplicate()
            let compSquareDisplay = document.getElementById(random);
            if (computerIcon === "X") {
                compSquareDisplay.setAttribute("src", "X-icon.png")
            } else if (computerIcon === "O") {
                compSquareDisplay.setAttribute("src", "O-icon.png")
            }
            squareArray[random] = computerIcon
            squresTakenArray[compSquareDisplay.id] = "Taken"
            compSquareDisplay.removeEventListener("click", clickXO)
            // console.log(squareArray, squresTakenArray, random, compSquareDisplay.id)
            currentPlayer = "h"
            return
        }, 2000);

    } if (currentPlayer === 'h') console.log(99)

}

function hp(e) {
        console.log("Human Picj", userIcon)
        if (userIcon === "O") {
            e.target.setAttribute("src", "O-icon.png")
        } else {
            e.target.setAttribute("src", "X-icon.png")
        }
        squareArray[e.target.id] = userIcon
        squresTakenArray[e.target.id] = "Taken"
        currentPlayer = "c"
        console.log(squareArray, e.target.id)
        cp()
}

function clickXO(e) {

    if (computerPlay) {
        if ((squareArray.includes(""))) {
            if (currentPlayer === 'c') {
                cp()
            }
            if (currentPlayer === 'h') {
                hp(e)
            }
            checkWin(computerIcon)
            checkWin(userIcon)
        }


    }

    if (!computerPlay) {
        let i
        if (iconselector === true) {
            e.target.setAttribute("src", "O-icon.png");
            squareArray[e.target.id] = "O"
            i = "O"

        } else {
            e.target.setAttribute("src", "X-icon.png")
            squareArray[e.target.id] = "X"
            i = "X"
        }
        checkWin(i)

    }


    iconselector = !iconselector
    e.target.removeEventListener("click", clickXO);
    e.target.classList.toggle("change");
}

function createSquares() {
    container.innerHTML = ''
    for (let i = 0; i < 9; i++) {
        let square = document.createElement("img");
        square.setAttribute("id", i)
        square.classList.add("square");
        square.classList.add("square");
        container.appendChild(square);
        container.style.display = "flex";
        document.querySelector(".buttons").innerHTML = ""

        // square.addEventListener("mouseover", () => {
        //     square.classList.add("change");
        // });
        // square.addEventListener("mouseleave", () => {
        //     square.classList.remove("change");
        // });
        square.addEventListener("click", clickXO);

    }
}

function checkWin(icon) {
    const winCombinations = [
        // Row Wins
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        // Column Wins
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        // Diagonal Wins
        [0, 4, 8], [2, 4, 6],
    ]

    winCombinations.forEach((x) => {
        let [a, b, c] = x
        // First Row Win
        if (squareArray[a] === icon && squareArray[b] === icon && squareArray[c] === icon) {
            console.log(`${icon} Wins`)
            winCount.push(icon)
            console.log(winCount)
            clearBoard()
            return
        }
    })
}

function clearBoard() {
    let timeout = 2100
    setTimeout(() => {
        createSquares()
        squareArray = Array(9).fill("")
        squresTakenArray = Array(9).fill("")
        iconselector = true
    }, timeout);
}


function initializer() {
    let info = document.createElement("p");
    info.innerHTML = "Choose an Icon"
    let bs = document.querySelector(".buttons")
    bs.appendChild(info)

    const buttonHandler = (e) => {
        if (e.target === xButton) {
            iconselector = false
            currentPlayer = "h"
        } else if (e.target === oButton) {
            iconselector = true
            currentPlayer = "c"
        }

        xButton.removeEventListener("click", buttonHandler)
        oButton.removeEventListener("click", buttonHandler)

        setTimeout(() => {
            xButton.innerText = "Human v Human"
            oButton.innerText = "Human v Computer"
            if (xButton.innerHTML === "Human v Human") {
                xButton.addEventListener("click", createSquares)
                oButton.addEventListener("click", computerSetup)
            }
        }, 1000);

    }

    xButton.addEventListener("click", buttonHandler)
    oButton.addEventListener("click", buttonHandler)

    function computerSetup() {
        createSquares()
        iconInitializer()
        computerPlay = true
        // clickXO()
    }


}

initializer()