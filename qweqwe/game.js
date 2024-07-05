let canv = document.getElementById("game_f");
let cntx = canv.getContext("2d");

const ground = new Image();
ground.src = "asasa.png";


const foodImg = new Image();
foodImg.src = "k.png";



let box = 32;
let score = 0;

let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box,
};

document.addEventListener("keydown", direction);

let knock;

function direction(event) {
    if (event.keyCode == 37 && knock != "right") {
        knock = "left";
    } else if (event.keyCode == 38 && knock != "down") {
        knock = "up";
    } else if (event.keyCode == 39 && knock != "left") {
        knock = "right";
    } else if (event.keyCode == 40 && knock != "up") {
        knock = "down";
    }
}

function eatHvost(head, arr) {
    for(let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y) {
            clearInterval(game);
        }
    }
}

function drawGame() {

    cntx.drawImage(ground, 0, 0);

    cntx.drawImage(foodImg, food.x, food.y);

    for(let i = 0; i < snake.length; i++) {
        cntx.fillStyle = i == 0 ? "#FFF455" : "#FFC700";
        cntx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    cntx.fillStyle = "#FFCBCB";
    cntx.font = "50px Arial";
    cntx.fillText(score, box * 2, box * 1.5);

    let snakeX = snake[0].x; 
    let snakeY = snake[0].y;

    if(snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };
    } else {
        snake.pop();
    }

    if((snakeX < box || snakeX > box * 17) ||(snakeY < box || snakeY > box * 17)) {
        clearInterval(game);
    }

    if(knock == "left") snakeX -= box;
    if(knock == "right") snakeX += box;
    if(knock == "down") snakeY += box;
    if(knock == "up") snakeY -= box;

    let newHead = {
        x: snakeX,
        y: snakeY,
    }

    eatHvost(newHead, snake);
    
    snake.unshift(newHead);

}

let game = setInterval(drawGame, 100);