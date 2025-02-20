class square {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.left = false;
        this.top = false;
        this.right = false;
        this.bottom = false;
        this.player = null;
    }
}
const lastMove = [];
const board = Array.from({ length: 11 }, () => Array(11).fill(null));
let turn = 0;
let player1 = 0;
let player2 = 0;
document.addEventListener('DOMContentLoaded', function() {
initGame();
document.addEventListener('click', handleMove);
});
function isDone() {
    for (let x = 0; x < 11; x++) {
        for (let y = 0; y < 11; y++) {
            if(board[x][y]) {
                if (board[x][y].player === null)
                    return;
            }
        }
    }
    alert("player " + (player1 > player2 ? "X" : "Y") + " wins!");
}
function checkSquare(x, y, turn) {
    if (board[x][y].top && board[x][y].bottom && board[x][y].left && board[x][y].right && board[x][y].player === null) {
        board[x][y].player = turn;
        turn ? player2++ : player1++;
        return true;
    }
    return false;
}
function handleMove(e) {
    const square = e.target;
    if (square.classList.contains('square')) {
        const x = parseInt(square.getAttribute('data-x'));
        const y = parseInt(square.getAttribute('data-y'));
        const offsetX = e.offsetX;
        const offsetY = e.offsetY;
        const width = square.offsetWidth;
        const height = square.offsetHeight;
        const move = [];
        move[2] = turn;
        let firstCheck = false;
        let secondCheck = false;
        if (offsetY < height / 4 && !board[x][y].top) {
            board[x][y].top = true;
            board[x - 1][y].bottom = true;
            firstCheck = checkSquare(x, y, turn);
            secondCheck = checkSquare(x-1, y, turn);
            move[0] = { square: board[x][y], property: 'top' };
            move[1] = { square: board[x-1][y], property: 'bottom' };
        } else if (offsetY > height / 4 * 3 && !board[x][y].bottom) {
            board[x][y].bottom = true;
            board[x + 1][y].top = true;
            firstCheck = checkSquare(x, y, turn);
            secondCheck = checkSquare(x+1, y, turn);
            move[0] = { square: board[x][y], property: 'bottom' };
            move[1] = { square: board[x+1][y], property: 'top' };
        } else if (offsetX < width / 4 && !board[x][y].left) {
            board[x][y].left = true;
            board[x][y - 1].right = true;
            firstCheck = checkSquare(x, y, turn);
            secondCheck = checkSquare(x, y-1, turn);
            move[0] = { square: board[x][y], property: 'left' };
            move[1] = { square: board[x][y-1], property: 'right' };
        } else if (offsetX > width / 4 * 3 && !board[x][y].right) {
            board[x][y].right = true;
            board[x][y + 1].left = true;
            firstCheck = checkSquare(x, y, turn);
            secondCheck = checkSquare(x, y+1, turn);
            move[0] = { square: board[x][y], property: 'right' };
            move[1] = { square: board[x][y+1], property: 'left' };
        } else {
            return;
        }
        lastMove.push(move);
        if (!firstCheck && !secondCheck) {
            turn = !turn;
        }
        renderGame();
        isDone();
    }
}
function back() {
    if (lastMove.length == 0) {
        return;
    }
    move = lastMove.pop();
    if (move[0].square.player !== null) {
        move[0].square.player ? player2-- : player1--;
        move[0].square.player = null;
    }
    if (move[1].square.player !== null) {
        move[1].square.player ? player2-- : player1--;
        move[1].square.player = null;
    }   
    move[0].square[move[0].property] = false;
    move[1].square[move[1].property] = false;
    turn = move[2];
    
    renderGame();
}
function initGame() {
    let amountOfSquares = 0;
    for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 11; j++) {
            if (j >= 5 - amountOfSquares && j <= 5 + amountOfSquares) {
                board[i][j] = new square(i, j);
                if (i === 0 || i === 10) {
                    if (i === 0)
                        board[i][j].top = true;
                    else
                        board[i][j].bottom = true;
                    board[i][j].left = true;
                    board[i][j].right = true;
                }
                if (i === 5 && (j === 5 - amountOfSquares || j === 5 + amountOfSquares)) {
                    board[i][j].top = true;
                    board[i][j].bottom = true;
                    if (j === 5 - amountOfSquares)
                        board[i][j].left = true;
                    if (j === 5 + amountOfSquares)
                        board[i][j].right = true;
                }
                else if (j === 5 - amountOfSquares || j === 5 + amountOfSquares) {
                    if (i < 5)
                        board[i][j].top = true;
                    else
                        board[i][j].bottom = true;
                    if (j === 5 - amountOfSquares)
                        board[i][j].left = true;
                    if (j === 5 + amountOfSquares)
                        board[i][j].right = true;
                }
                
            }
        }
        if (i < 5)
            amountOfSquares++;
        else
            amountOfSquares--;
    }
    renderGame();
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
                if (board[i][j].player !== null)
                    square.innerText = board[i][j].player ? 'y' : 'x';
                square.setAttribute('data-x', i);
                square.setAttribute('data-y', j);
                line.appendChild(square);
            }
        }
        boardHTML.appendChild(line);
    }
    document.getElementById('1').innerText = 'x: ' + player1;
    document.getElementById('2').innerText = 'y: ' + player2;
    document.getElementById('turn').innerText = turn ? 'Player Y' : 'Player X';
}