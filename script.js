let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBackGround() {
    context.fillStyle = "lightblue";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = "blue";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    context.fillStyle = "black";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(e) {
    if(e.keyCode == 37 && direction != "right") direction = "left";
    if(e.keyCode == 38 && direction != "down") direction  = "up";
    if(e.keyCode == 39 && direction != "left") direction = "right";
    if(e.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo() {

    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for(let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert("Game Over!!!")
            aparecerBotao();
            
        }
    } 

    criarBackGround();
    criarCobrinha();
    drawFood();

    let snakex = snake[0].x;
    let snakey = snake[0].y;

    if(direction == "right") snakex += box;
    if(direction == "left") snakex -= box;
    if(direction == "up") snakey -= box;
    if(direction == "down") snakey += box;

    if(snakex != food.x || snakey != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    

    let newHead = {
        x: snakex,
        y: snakey
    }

    snake.unshift(newHead);
}

function aparecerBotao() {
    document.getElementById('botao').style.display = 'block'
}

function iniciarGame() {
    location.reload();
}
        
let jogo = setInterval(iniciarJogo, 100);