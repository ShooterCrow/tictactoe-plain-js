const container = document.querySelector(".container");
const xButton = document.getElementById("1b");
const oButton = document.getElementById("2b");
let iconselector
let computerPlay = false
let computerIcon
let userIcon
let squareArray = Array(9).fill("")
let compPicDisplay = squareArray
let winCount = []
let currentPlayer

function iconInitializer () {
    if (!iconselector) {
        userIcon = "X"
        computerIcon = "O"
    } else {
        userIcon = "O"
        computerIcon = "X"
    }
}

function cp() {
    if (currentPlayer === "c") {
        let random
        setTimeout(() => {
            do {
                random = Math.floor(Math.random() * squareArray.length) 
                console.log(random)               
            } while (random == "Taken");

            
            let compSquareDisplay = document.getElementById(random);
            console.log(compSquareDisplay)
            while (compSquareDisplay.src) {
                let updatedCCSA = compCjooseSquareArr.filter(x=> x==random)
                compSquareDisplay = document.getElementById(updatedCCSA[random]);
                compCjooseSquareArr = updatedCCSA
                console.log(compCjooseSquareArr, updatedCCSA, random)
            }
            if (computerIcon === "X") {
                compSquareDisplay.setAttribute("src", "X-icon.png")
            } else if (computerIcon === "O"){
                compSquareDisplay.setAttribute("src", "O-icon.png")
            }
            squareArray[random] = computerIcon
            compSquareDisplay.removeEventListener("click", clickXO)
            // console.log(squareArray)
            currentPlayer = "h"
            return
        }, 1000);

    }

}

function hp() {
}

function clickXO(e) {
    let i

    if (computerPlay) {

        console.log(computerPlay)

        if (currentPlayer === "h") {

            console.log("Human Picj", userIcon)
            squareArray[e.target.id] = userIcon
            if (userIcon === "O") {
                e.target.setAttribute("src", "O-icon.png")
            } else {
                e.target.setAttribute("src", "X-icon.png")
            }
            currentPlayer = "c"
            squareArray[e.target.id] = "Taken"
            console.log(squareArray, e.target.id)
            cp()
            return
        }


    }

    if (!computerPlay) {


        if (iconselector === true) {
            e.target.setAttribute("src", "O-icon.png");
            squareArray[e.target.id] = "O"
            i = "O"

        } else {
            e.target.setAttribute("src", "X-icon.png")
            squareArray[e.target.id] = "X"
            i = "X"
        }

    }



    iconselector = !iconselector
    e.target.removeEventListener("click", clickXO);
    e.target.classList.toggle("change");
    checkWin(i)
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
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Column Wins
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonal Wins
        [0, 4, 8],
        [2, 4, 6],
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
    let timeout = 2000
    setTimeout(() => {
        createSquares()
        squareArray = Array(9).fill("")
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