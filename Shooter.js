const canvas = document.getElementById("BGcanvas");
const ctx = canvas.getContext("2d");

const cat_1 = new Image(100, 100);
cat_1.src = "Sprites/Player/Player_stand.png";
const cat_2 = new Image(100, 100);
cat_2.src = "Sprites/Player/Player_run.png";

const blob_1 = new Image(100, 100);
blob_1.src = "Sprites/Enemy/Blob_up.png";
const blob_2 = new Image(100, 100);
blob_2.src = "Sprites/Enemy/Blob_down.png";

const fire = new Image(100, 100);
fire.src = "Sprites/Bullets/Fireball.png";

var key = new Array(0, 0);
var frameCount = 0;
var sprite = 1;
var speed = 2;
var enemySpeed = 2;

class component {
    constructor(sprite_1, sprite_2, x, y, speed) {
        this.sprite_1 = sprite_1;
        this.sprite_2 = sprite_2;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    draw(size, sprite) {
        switch (sprite) {
            case 1:
                ctx.drawImage(this.sprite_1, this.x - size / 2, this.y - size / 2, size, size);
                break;
            case -1:
                ctx.drawImage(this.sprite_2, this.x - size / 2, this.y - size / 2, size, size);
                break;
        }
    }
}
class player extends component {

    constructor(sprite_1, sprite_2, x, y, speed) {
        super(sprite_1, sprite_2, x, y, speed);
    }

    draw(size, sprite, move) {
        if (move) super.draw(size, sprite);
        else ctx.drawImage(this.sprite_1, this.x - size / 2, this.y - size / 2, size, size);
    }

    update(moveX, moveY) {
        this.x += moveX * this.speed;
        this.y += moveY * this.speed;
    }
}
class enemy extends component {
    constructor(sprite_1, sprite_2, x, y, speed) {
        super(sprite_1, sprite_2, x, y, speed);
    }

    draw(size, sprite) {
        super.draw(size, sprite);
    }

    update(player) {
        //console.log(Math.pow(this.x - player.x, 2) + Math.pow(this.y - player.y, 2));
        if (Math.pow(this.x - player.x, 2) + Math.pow(this.y - player.y, 2) <= 4000) gameEnd();
        this.x += this.speed;
    }
}

var Cat = new player(cat_1, cat_2, 30, 225, speed);
var Blob = new enemy(blob_1, blob_2, 700, 225, -enemySpeed);

function keyDown(e) {
    //W = 38/87; A = 37/65; S = 40/83; D = 39/68
    switch (e.keyCode) {
        case 38:
        case 87:
            key[1] = -1;
            break;

        case 40:
        case 83:
            key[1] = 1;
            break;

        case 37:
        case 65:
            key[0] = -1;
            break;

        case 39:
        case 68:
            key[0] = 1;
            break;
    }
    //console.log(key);
}
function keyUp(e) {
    switch (e.keyCode) {
        case 38:
        case 87:
        case 40:
        case 83:
            key[1] = 0;
            break;

        case 37:
        case 65:
        case 39:
        case 68:
            key[0] = 0;
            break;
    }
}

function Spawner() {
    var Blob = new enemy(blob_1, blob_2, 700, 225, -enemySpeed);
}

function Update() {
    ctx.clearRect(0, 0, 800, 450);

    Cat.update(key[0], key[1]);
    Blob.update(Cat);

    if (frameCount >= 30) {
        frameCount = 0;
        sprite *= -1;
    }
    frameCount++;
    if (key[0] || key[1]) Cat.draw(100, sprite, true);
    else Cat.draw(100, sprite, false);
    Blob.draw(100, sprite);
}

function gameEnd() {
    clearInterval(game);
}

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);

var game = setInterval(Update, 20);
setInterval(Spawner, 3000);
