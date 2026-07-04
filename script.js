const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");

const submitButton = document.getElementById("submit");

const gameContainer = document.querySelector(".game-container");
const playerSetup = document.querySelector(".player-setup");

const message = document.querySelector(".message");

const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";

let currentPlayer = "";
let currentSymbol = "x";

let gameOver = false;

let board = [
    "", "", "",
    "", "", "",
    "", "", ""
];

const winningPatterns = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]

];

submitButton.addEventListener("click",function(){

    player1 = player1Input.value.trim();
    player2 = player2Input.value.trim();

    if(player1==="" || player2===""){
        alert("Please enter both player names");
        return;
    }

    playerSetup.style.display="none";

    gameContainer.style.display="block";

    currentPlayer=player1;

    message.textContent=`${currentPlayer}, you're up`;

});

cells.forEach((cell,index)=>{

    cell.addEventListener("click",function(){

        if(gameOver){
            return;
        }

        if(board[index] !== ""){
            return;
        }

        board[index]=currentSymbol;

        cell.textContent=currentSymbol;

        if(checkWinner()){

            gameOver=true;

            message.textContent=`${currentPlayer} congratulations you won!`;

            return;
        }

        if(checkDraw()){

            gameOver=true;

            message.textContent="It's a Draw!";

            return;
        }

        if(currentSymbol==="x"){

            currentSymbol="o";
            currentPlayer=player2;
        }else{

            currentSymbol="x";
            currentPlayer=player1;

        }

        message.textContent=`${currentPlayer}, you're up`;

    });

});

function checkWinner(){

    for(let pattern of winningPatterns){

        const [a,b,c]=pattern;

        if(

            board[a]!=="" &&
            board[a]===board[b] &&
            board[b]===board[c]

        ){

            return true;

        }

    }

    return false;

}

function checkDraw(){

    return board.every(cell=>cell!=="");

}