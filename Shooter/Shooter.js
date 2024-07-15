const canvas = document.getElementById("BGcanvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const replayBtn = document.getElementById("replayBtn");
const meow = new Audio("SoundEffects/Player_meow.mp3");
const hurt = new Audio("SoundEffects/Player_hurt.mp3");
const laser = new Audio("SoundEffects/Laser.mp3");
const BGmusic = document.getElementById("BGmusic");

const cat_1 = new Image(100, 100);
cat_1.src = "Sprites/Player/Player_stand.png";
const cat_2 = new Image(100, 100);
cat_2.src = "Sprites/Player/Player_run.png";

const blob_1 = new Image(100, 100);
blob_1.src = "Sprites/Enemy/Blob_up.png";
const blob_2 = new Image(100, 100);
blob_2.src = "Sprites/Enemy/Blob_down.png";

var key = new Array(0, 0);
var enemyContainer = new Array(5);
var bulletContainer = new Array(5);
var Cat;

var game;
var spawn;

var speed = 2;
var enemySpeed = -2;
var bulletSpeed = 10;
var CD = 500;
var lives;
var points;

var frameCount = 0;
var sprite = 1;
var enemyCount = 1;
var bulletCount = 0;
var canFire = true;
var firing = false;

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

        if (this.x < 50) this.x = 50;
        else if (this.x > 750) this.x = 750;

        if (this.y < 50) this.y = 50;
        else if (this.y > 400) this.y = 400;
    }

    fire() {
        laser.play();
        if (bulletCount >= 5) bulletCount = 0;
        bulletContainer[bulletCount] = new bullet(0, 0, this.x, this.y, bulletSpeed);
        bulletCount++;
        canFire = false;
        window.setTimeout(coolDown, CD);
        //console.log(this.x, this.y);
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
        if (Math.pow(this.x - player.x, 2) + Math.pow(this.y - player.y, 2) <= 4000) {
            lives--;
            points -= 5;
            hurt.play();
            destory(this);
        }
        for (var i = 0; i < 5; ++i) {
            if (bulletContainer[i]) {
                if (Math.pow(this.x - bulletContainer[i].x, 2) + Math.pow(this.y - bulletContainer[i].y, 2) <= 4000) {
                    points += 10;
                    destory(this);
                    destory(bulletContainer[i]);
                }
            }
        }
        this.x += this.speed;
    }
}
class bullet extends component {
    constructor(sprite_1, sprite_2, x, y, speed) {
        super(sprite_1, sprite_2, x, y, speed);
        this.color = randomColor();
    }

    draw(size) {
        ctx.save();

        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.rect(this.x, this.y, size * 2, size);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        ctx.restore();
    }

    update() {
        //console.log(this.x);
        this.x += this.speed;
    }
}

function keyDown(e) {
    //W = 38/87; A = 37/65; S = 40/83; D = 39/68
    //console.log(e.keyCode);
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
        case 32:
            firing = true;
            //console.log("down");
            break;
    }
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
        case 32:
            firing = false;
            //console.log("up");
            break;
    }
}
function control(axis, value) {
    //alert("input");
    if (axis == "x") key[0] = value;
    else if (axis == "y") key[1] = value;
    else firing = value;
}

function randomColor() {
    var i = Math.floor(Math.random() * 6);
    var color = Math.floor(Math.random() * 256);
    //return "rgb(255 " + color + " 0)";

    switch (i) {
        case 0:
            return "rgb(255 " + color + " 0)";
            break;

        case 1:
            return "rgb(255 0 " + color + ")";
            break;

        case 2:
            return "rgb(0 255 " + color + ")";
            break;

        case 3:
            return "rgb(" + color + " 255 0)";
            break;

        case 4:
            return "rgb(" + color + " 0 255)";
            break;

        case 5:
            return "rgb(0 " + color + " 255)";
            break;
    }
}
function test() {
    //alert("test");
    ctx.save();

    ctx.fillStyle = randomColor();
    ctx.beginPath();
    ctx.rect(20, 20, 40, 20);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    ctx.restore();
}
function UI() {
    ctx.font = "50px Arial";
    ctx.fillText("life:", 10, 50);
    ctx.fillText(lives, 100, 50);
    ctx.fillText("points:", 10, 120);
    ctx.fillText(points, 170, 120);
}

function Spawner() {
    //console.log(enemyCount);
    if (enemyCount >= 5) enemyCount = 0;
    //y = 50~400
    var y = Math.random() * (400 - 50) + 50;
    enemyContainer[enemyCount] = new enemy(blob_1, blob_2, 800, y, enemySpeed);
    enemyCount++;
}
function coolDown(){
    canFire = true;
}
function destory(component) {
    if (component.speed < 0) component.x = -100;
    else component.x = 1000;
}
function music() {
    BGmusic.play();
    BGmusic.loop = true;
    BGmusic.volume = 0.2;
}

function gameStart() {
    //alert("start");
    music();
    startBtn.style.display = "none";
    replayBtn.style.display = "none";
    meow.play();

    lives = 3;
    points = 0;

    Cat = new player(cat_1, cat_2, 100, 225, speed);
    enemyContainer[0] = new enemy(blob_1, blob_2, 800, Math.random() * (400 - 50) + 50, enemySpeed);

    game = setInterval(Update, 20);
    spawn = setInterval(Spawner, 2000);

    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
}

function Update() {
    if (lives <= 0) gameEnd();

    ctx.clearRect(0, 0, 800, 450);

    //test();
    //console.log(lives, points);

    Cat.update(key[0], key[1]);
    for (var i = 0; i < 5; ++i) {
        if (enemyContainer[i]) enemyContainer[i].update(Cat);
    }
    for (var i = 0; i < 5; ++i) {
        if (bulletContainer[i]) bulletContainer[i].update();
    }
    if (canFire && firing) {
        Cat.fire();
    }

    if (frameCount >= 30) {
        frameCount = 0;
        sprite *= -1;
    }
    frameCount++;
    if (key[0] || key[1]) Cat.draw(100, sprite, true);
    else Cat.draw(100, sprite, false);
    for (var i = 0; i < 5; ++i) {
        if (enemyContainer[i]) enemyContainer[i].draw(100, sprite);
    }
    for (var i = 0; i < 5; ++i) {
        if (bulletContainer[i]) {
            bulletContainer[i].draw(20);
        }
    }
    UI();
}

function gameEnd() {
    clearInterval(game);
    clearInterval(spawn);
    replayBtn.style.display = "block";
}

//game = setInterval(Update, 20);
//spawn = setInterval(Spawner, 2000);
