const container = document.querySelector(".container");

function createSquares () {
    for (let i = 0; i < 9; i++) {
        let square = document.createElement("div");
        square.classList.add("square");
        container.appendChild(square);
        square.classList.add("square");
        square.addEventListener("mouseover", () => {
            square.classList.add("change");
        });
        square.addEventListener("mouseleave", () => {
            square.classList.remove("change");
        });
        square.addEventListener("click", () => {
            square.classList.toggle("change");
        });

        console.log(square)
        
    }
}

createSquares()