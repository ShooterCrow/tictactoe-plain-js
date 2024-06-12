const container = document.querySelector(".container");
let iconselector = true
let squareArray = Array(9).fill("")

function clickXO (e) {
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
    iconselector = !iconselector
    e.target.removeEventListener("click", clickXO);
    e.target.classList.toggle("change");
    checkWin(i)
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
    
    winCombinations.forEach((x) => {
    let [a,b,c] = x
        // First Row Win
        if (squareArray[a] === icon && squareArray[b] === icon && squareArray[c] === icon ) {
            console.log(`${squareArray[0]} Wins`)
            return
        } 
    })
}