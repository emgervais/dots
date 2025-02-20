

class square {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.left = false;
        this.top = false;
        this.right = false;
        this.bottom = false;
    }
}
const board = Array.from({ length: 11 }, () => Array(11).fill(null));
const turn = 0;
document.addEventListener('DOMContentLoaded', function() {
initGame();
renderGame();
document.addEventListener('click', handleMove);
});

function handleMove(e) {
    const square = e.target;
    if (square.classList.contains('square')) {
        const x = square.getAttribute('data-x');
        const y = square.getAttribute('data-y');
        const offsetX = e.offsetX;
        const offsetY = e.offsetY;
        const width = square.offsetWidth;
        const height = square.offsetHeight;

        if (offsetY > height / 3 * 2) {
            board[x][y].top = true;
            if (board[x - 1][y])
                board[x - 1][y].bottom = true;
        } else if (offsetY < height / 3) {
            board[x][y].bottom = true;
            if (board[x + 1][y])
                board[x + 1][y].top = true;
        } else if (offsetX < width / 3) {
            board[x][y].left = true;
            if (board[x][y - 1])
                board[x][y - 1].right = true;
        }
        else if (offsetX > width / 3 * 2) {
            board[x][y].right = true;
            if (board[x][y + 1])
                board[x][y + 1].left = true;
        }
        renderGame();
    }
}
function initGame() {
    let amountOfSquares = 0;
    for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 11; j++) {
            if (j >= 5 - amountOfSquares && j <= 5 + amountOfSquares) {
                board[i][j] = new square(i, j);
            }
        }
        if (i < 5)
            amountOfSquares++;
        else
            amountOfSquares--;
    }
}

function renderGame() {
    let boardHTML = document.getElementById('game');
    boardHTML.innerHTML = '';
    for (let i = 0; i < 11; i++) {
        let line = document.createElement('div');
        line.classList.add('line');
        for (let j = 0; j < 11; j++) {
            if (board[i][j] !== null) {
                let square = document.createElement('div');
                square.classList.add('square');
                if (board[i][j].top)
                    square.classList.add('top');
                if (board[i][j].bottom)
                    square.classList.add('bottom');
                if (board[i][j].left)
                    square.classList.add('left');
                if (board[i][j].right)
                    square.classList.add('right');
                square.setAttribute('data-x', i);
                square.setAttribute('data-y', j);
                line.appendChild(square);
            }
        }
        boardHTML.appendChild(line);
    }
}
//     x
//    xxx
//   xxxxx
//  xxxxxxx
// xxxxxxxxx
//xxxxxxxxxxx
// xxxxxxxxx
//  xxxxxxx
//   xxxxx
//    xxx
//     x