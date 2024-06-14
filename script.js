const container = document.querySelector(".container");
let iconselector = true
let squareArray = Array(9).fill("")

function clickXO (e) {
    if (iconselector === true) {
        e.target.setAttribute("src", "O-icon.png");
        // console.log(squareArray, e.target)
        squareArray[e.target.id] = "O"
    } else {
        e.target.setAttribute("src", "X-icon.png")
        squareArray[e.target.id] = "X"
        // console.log(squareArray, e.target)
    }
    iconselector = !iconselector
    e.target.removeEventListener("click", clickXO);
    e.target.classList.toggle("change");
    checkWin()
}

function createSquares () {
    for (let i = 0; i < 9; i++) {
        let square = document.createElement("img");
        square.setAttribute("id", i)
        square.classList.add("square");
        container.appendChild(square);
        square.classList.add("square");

        // square.addEventListener("mouseover", () => {
        //     square.classList.add("change");
        // });
        // square.addEventListener("mouseleave", () => {
        //     square.classList.remove("change");
        // });
        

        square.addEventListener("click", clickXO);
        
    }
}

createSquares()

function checkWin (icon) {
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
    
    squareArray.forEach((x) => {
        // First Row Win
        if (squareArray[0] === squareArray[1] && squareArray[1] === squareArray[2] && squareArray[0] !== "") {
            console.log(`${squareArray[0]} Wins`)
            return
        }
        // Second Row Win
        if (squareArray[3] === squareArray[4] && squareArray[4] === squareArray[5] && squareArray[3] !== "") {
            console.log(`${squareArray[3]} Wins`)
            return
        }
        // 3rd Row Win
        if (squareArray[6] === squareArray[7] && squareArray[7] === squareArray[8] && squareArray[6] !== "") {
            console.log(`${squareArray[6]} Wins`)
            return
        }
    })
}