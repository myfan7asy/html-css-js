var field = [],
    snakePosX = 5,
    snakePosY = 5,
    foodPosX = 0,
    foodPosY = 0,
    snakeSize = 1,
    foodCounter = 0,
    moveLeft = false,
    moveTop = false,
    moveRight = false,
    moveDown = false,
    tail = [],
    seconds = 0,
    minutes = 0;

startGame();

setInterval(function () {movement()}, 150);

function snakeGrowth() {
    tail.push(document.createElement("div"));
    tail[tail.length - 1].className = "tailStyle";
    tail[tail.length - 1].style.top = snakePosX * 20 + "px";
    tail[tail.length - 1].style.left = snakePosY * 20 + "px";
    tail[tail.length - 1].style.marginTop = "-20px";
    tail[tail.length - 1].style.zIndex = "100";

    if (tail.length > snakeSize) {
        document.getElementById("gameField").appendChild(tail[tail.length - 1]);
        tail[tail.length - snakeSize].style.backgroundColor = "white";
        tail[tail.length - snakeSize].style.zIndex = "100";
    }
}

function movement() {
    if (moveTop || moveDown || moveLeft || moveRight) {
        snakeGrowth();
    }

    if (moveTop == true && snakePosX > 0) {
        snakePosX--;
    } else if (moveDown == true && snakePosX < 29) {
        snakePosX++;
    } else if (moveLeft == true && snakePosY > 0) {
        snakePosY--;
    } else if (moveRight == true && snakePosY < 29) {
        snakePosY++;
    }

    field[snakePosX][snakePosY] = 1;

    fieldDraw();

    if (field[snakePosX][snakePosY] == field[foodPosX][foodPosY]) {
        changeFoodPos();
        snakeSize++;
        foodCounter++;
        document.getElementById("record").innerHTML = "Food consumed: " + foodCounter;
    }
}

function controls(event) {
    moveLeft = false;
    moveTop = false;
    moveRight = false;
    moveDown = false;

    if (event.keyCode == 38) {
        moveTop = true;
    } else if (event.keyCode == 40) {
        moveDown = true;
    } else if (event.keyCode == 37) {
        moveLeft = true;
    } else if (event.keyCode == 39) {
        moveRight = true;
    }
}

function startGame() {
    for (i = 0; i < 30; i++) {
        field[i] = [];
        for (j = 0; j < 30; j++) {
            field[i][j] = 0;
        }
    }

    field[snakePosX][snakePosY] = 1;

    changeFoodPos();
}

function fieldDraw() {
    document.getElementById("food").style.top = foodPosX * 20 + "px";
    document.getElementById("food").style.left = foodPosY * 20 + "px";
    document.getElementById("snakeHead").style.top = snakePosX * 20 + "px";
    document.getElementById("snakeHead").style.left = snakePosY * 20 + "px";
}

function changeFoodPos() {
    foodPosX = Math.floor((Math.random() * 29));
    foodPosY = Math.floor((Math.random() * 29));
    field[foodPosX][foodPosY] = 2;
    fieldDraw();
}

setInterval(function () {timer()}, 1000);

function timer() {
    if (moveTop || moveDown || moveLeft || moveRight) {
        seconds++;
    }
    if (seconds == 60) {
        seconds = 0;
        minutes++;
    }
    document.getElementById("timer").innerHTML = "Time in game: " + minutes + " " + "minutes" + " " + seconds + " " + "seconds";
}





