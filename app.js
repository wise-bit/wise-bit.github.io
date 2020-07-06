const human = "O";
const computer = "X";

let all_spaces_filled = false;
let board = ["", "", "", "", "", "", "", "", ""];

const board_container = document.querySelector(".tic-tac-toe-area");

const winner_statement = document.getElementById("winner");

check_board_complete = () => {
    let flag = true;
    board.forEach(element => {
        if (element != human && element != computer) {
            flag = false;
        }
    });
    all_spaces_filled = flag;
};

const check_line = (a, b, c) => {
    return (
        board[a] == board[b] && board[b] == board[c] && (board[a] == human || board[a] == computer));
};

const check_match = () => {
    for (i = 0; i < 9; i += 3) {
        if (check_line(i, i + 1, i + 2)) {
            return board[i];
        }
    }
    for (i = 0; i < 3; i++) {
        if (check_line(i, i + 3, i + 6)) {
            return board[i];
        }
    }
    if (check_line(0, 4, 8)) {
        return board[0];
    }
    if (check_line(2, 4, 6)) {
        return board[2];
    }
    return "";
};

const check_for_winner = () => {
    let res = check_match();
    if (res == human) {
        winner.innerText = "Woo! You won!";
        winner.classList.add("humanWin");
        all_spaces_filled = true;
    } else if (res == computer) {
        winner.innerText = "Oops, you lost.";
        winner.classList.add("computerWin");
        all_spaces_filled = true;
    } else if (all_spaces_filled) {
        winner.innerText = "It's... a tie?!";
        winner.classList.add("draw");
    }
};

const render_board = () => {
    board_container.innerHTML = "";
    board.forEach((e, i) => {
        board_container.innerHTML += `<div id="block_${i}" class="block" onclick="addHumanMove(${i})">${board[i]}</div>`;
        if (e == human || e == computer) {
            document.querySelector(`#block_${i}`).classList.add("occupied");
        }
    });
};

const game_loop = () => {
    render_board();
    check_board_complete();
    check_for_winner();
}

const addHumanMove = e => {
    if (!all_spaces_filled && board[e] == "") {
        board[e] = human;
        game_loop();
        addComputerMove();
    }
};

const addComputerMove = () => {
    if (!all_spaces_filled) {
        do {
            selected = Math.floor(Math.random() * 9);
        } while (board[selected] != "");
        board[selected] = computer;
        game_loop();
    }
};

const reset_board = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    all_spaces_filled = false;
    winner.classList.remove("humanWin");
    winner.classList.remove("computerWin");
    winner.classList.remove("draw");
    winner.innerText = "I wonder who will win...";
    render_board();
};

render_board();
