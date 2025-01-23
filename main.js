document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.getElementById("game-container");
    const scoreElement = document.getElementById("score");
    const bestElement = document.getElementById("best");
    const newGameButton = document.getElementById("new-game");

    let score = 0;
    let bestScore = 0;
    let grid = [];
    let hasMoved = false;

    function createGrid() {
        gameContainer.innerHTML = '';
        grid = [];
        for (let i = 0; i < 16; i++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.setAttribute("data-value", 0);
            gameContainer.appendChild(tile);
            grid.push(tile);
        }
        updateTileValues();
    }

    function getRandomEmptyTile() {
        const emptyTiles = grid.filter(tile => tile.getAttribute("data-value") == 0);
        return emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    }

    function placeRandomTile() {
        const tile = getRandomEmptyTile();
        if (tile) {
            const value = Math.random() > 0.1 ? 2 : 4;
            tile.setAttribute("data-value", value);
            tile.textContent = value;
        }
    }

    function startNewGame() {
        score = 0;
        scoreElement.textContent = score;
        createGrid();
        placeRandomTile();
        placeRandomTile();
    }

    function updateScore(newScore) {
        score = newScore;
        scoreElement.textContent = score;
        if (score > bestScore) {
            bestScore = score;
            bestElement.textContent = bestScore;
        }
    }

    function moveLeft() {
        let moved = false;
        for (let i = 0; i < 4; i++) {
            let row = grid.slice(i * 4, i * 4 + 4);
            let values = row.map(tile => parseInt(tile.getAttribute("data-value")));
            let newValues = [];
            let combined = [false, false, false, false];
            for (let j = 0; j < 4; j++) {
                if (values[j] !== 0) {
                    if (newValues.length > 0 && newValues[newValues.length - 1] === values[j] && !combined[newValues.length - 1]) {
                        newValues[newValues.length - 1] *= 2;
                        combined[newValues.length - 1] = true;
                        updateScore(score + newValues[newValues.length - 1]);
                        moved = true;
                    } else {
                        newValues.push(values[j]);
                    }
                }
            }
            while (newValues.length < 4) newValues.push(0);
            row.forEach((tile, index) => {
                if (parseInt(tile.getAttribute("data-value")) !== newValues[index]) {
                    moved = true;
                }
                tile.setAttribute("data-value", newValues[index]);
                tile.textContent = newValues[index] > 0 ? newValues[index] : '';
            });
        }
        return moved;
    }

    function moveRight() {
        let moved = false;
        for (let i = 0; i < 4; i++) {
            let row = grid.slice(i * 4, i * 4 + 4).reverse();
            let values = row.map(tile => parseInt(tile.getAttribute("data-value")));
            let newValues = [];
            let combined = [false, false, false, false];
            for (let j = 0; j < 4; j++) {
                if (values[j] !== 0) {
                    if (newValues.length > 0 && newValues[newValues.length - 1] === values[j] && !combined[newValues.length - 1]) {
                        newValues[newValues.length - 1] *= 2;
                        combined[newValues.length - 1] = true;
                        updateScore(score + newValues[newValues.length - 1]);
                        moved = true;
                    } else {
                        newValues.push(values[j]);
                    }
                }
            }
            while (newValues.length < 4) newValues.push(0);
            newValues.reverse();
            row.forEach((tile, index) => {
                if (parseInt(tile.getAttribute("data-value")) !== newValues[index]) {
                    moved = true;
                }
                tile.setAttribute("data-value", newValues[index]);
                tile.textContent = newValues[index] > 0 ? newValues[index] : '';
            });
        }
        return moved;
    }

    function moveUp() {
        let moved = false;
        for (let i = 0; i < 4; i++) {
            let col = [grid[i], grid[i + 4], grid[i + 8], grid[i + 12]];
            let values = col.map(tile => parseInt(tile.getAttribute("data-value")));
            let newValues = [];
            let combined = [false, false, false, false];
            for (let j = 0; j < 4; j++) {
                if (values[j] !== 0) {
                    if (newValues.length > 0 && newValues[newValues.length - 1] === values[j] && !combined[newValues.length - 1]) {
                        newValues[newValues.length - 1] *= 2;
                        combined[newValues.length - 1] = true;
                        updateScore(score + newValues[newValues.length - 1]);
                        moved = true;
                    } else {
                        newValues.push(values[j]);
                    }
                }
            }
            while (newValues.length < 4) newValues.push(0);
            col.forEach((tile, index) => {
                if (parseInt(tile.getAttribute("data-value")) !== newValues[index]) {
                    moved = true;
                }
                tile.setAttribute("data-value", newValues[index]);
                tile.textContent = newValues[index] > 0 ? newValues[index] : '';
            });
        }
        return moved;
    }

    function moveDown() {
        let moved = false;
        for (let i = 0; i < 4; i++) {
            let col = [grid[i], grid[i + 4], grid[i + 8], grid[i + 12]].reverse();
            let values = col.map(tile => parseInt(tile.getAttribute("data-value")));
            let newValues = [];
            let combined = [false, false, false, false];
            for (let j = 0; j < 4; j++) {
                if (values[j] !== 0) {
                    if (newValues.length > 0 && newValues[newValues.length - 1] === values[j] && !combined[newValues.length - 1]) {
                        newValues[newValues.length - 1] *= 2;
                        combined[newValues.length - 1] = true;
                        updateScore(score + newValues[newValues.length - 1]);
                        moved = true;
                    } else {
                        newValues.push(values[j]);
                    }
                }
            }
            while (newValues.length < 4) newValues.push(0);
            newValues.reverse();
            col.forEach((tile, index) => {
                if (parseInt(tile.getAttribute("data-value")) !== newValues[index]) {
                    moved = true;
                }
                tile.setAttribute("data-value", newValues[index]);
                tile.textContent = newValues[index] > 0 ? newValues[index] : '';
            });
        }
        return moved;
    }

    function moveTiles(direction) {
        let moved = false;
        switch (direction) {
            case "left":
                moved = moveLeft();
                break;
            case "right":
                moved = moveRight();
                break;
            case "up":
                moved = moveUp();
                break;
            case "down":
                moved = moveDown();
                break;
        }
        if (moved) {
            placeRandomTile();
            updateTileValues();
        }
    }

    function updateTileValues() {
        grid.forEach(tile => {
            const value = tile.getAttribute("data-value");
            tile.textContent = value > 0 ? value : '';
        });
    }

    newGameButton.addEventListener("click", startNewGame);

    document.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowUp":
                if (moveTiles("up")) placeRandomTile();
                break;
            case "ArrowDown":
                if (moveTiles("down")) placeRandomTile();
                break;
            case "ArrowLeft":
                if (moveTiles("left")) placeRandomTile();
                break;
            case "ArrowRight":
                if (moveTiles("right")) placeRandomTile();
                break;
        }
    });

    startNewGame(); // Initialize the game when the page loads
});