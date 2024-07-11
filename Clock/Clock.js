const canvas = document.getElementById("BGcanvas");
const ctx = canvas.getContext("2d");
const bee = new Image(50, 50);
bee.src = "bee.png";

function Clock() {
    ctx.save();

    ctx.strokeStyle = "rgb(33 166 166)";
    ctx.fillStyle = "rgb(33 166 166)";
    ctx.beginPath();
    ctx.arc(0, 0, 199, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    ctx.strokeStyle = "rgb(39 140 65)";
    ctx.fillStyle = "rgb(39 140 65)";
    ctx.beginPath();
    ctx.arc(0, 0, 180, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    ctx.strokeStyle = "rgb(33 166 166)";
    ctx.fillStyle = "rgb(33 166 166)";
    ctx.beginPath();
    ctx.arc(0, 0, 120, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    ctx.restore();
}

function ScaleLine() {
    ctx.save();

    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";
    ctx.lineCap = "round";

    for (var i = 0; i < 12; ++i) {
        ctx.beginPath();
        ctx.moveTo(0, 220);
        ctx.lineTo(0, 230);
        ctx.stroke();

        ctx.rotate(Math.PI / 6);
    }
    
    //ctx.closePath();

    ctx.restore();
}

function Flower(pedals){
    ctx.save();

    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";
    ctx.lineCap = "round";

    for (var i = 0; i < pedals; ++i) {
        ctx.rotate(Math.PI / 6);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -20);
        ctx.stroke();
    }

    ctx.strokeStyle = "rgb(242 160 7)";
    ctx.fillStyle = "rgb(242 160 7)";

    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, 2 * Math.PI);
    ctx.closePath();

    ctx.stroke();
    ctx.fill();

    ctx.restore();
}

function Scale() {
    for (var i = 1; i < 13; ++i) {
        ctx.save();

        ctx.rotate(Math.PI * i / 6);
        ctx.translate(0, -150);
        ctx.rotate(-Math.PI * i / 6);
        Flower(i);

        ctx.restore();
    }
}

function Draw() {
    Clock();
    Scale();
}

function Hour(h, m) {
    ctx.save();

    ctx.lineWidth = 10;
    ctx.strokeStyle = "black";
    ctx.lineCap = "round";

    ctx.rotate(Math.PI * h / 6);
    ctx.rotate(Math.PI * m / 360);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -70);
    ctx.stroke();

    ctx.restore();
}

function Minute(m, s) {
    ctx.save();

    ctx.lineWidth = 10;
    ctx.strokeStyle = "black";
    ctx.lineCap = "round";

    ctx.rotate(Math.PI * m / 30);
    ctx.rotate(Math.PI * s / 1800);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -100);
    ctx.stroke();

    ctx.restore();
}

function Second(s) {
    ctx.save();

    ctx.rotate(Math.PI * s / 30);
    Flower(12);
    ctx.drawImage(bee, -20, -175, 40, 40);

    ctx.restore();
}

function Run() {
    let date = new Date();
    let second = date.getSeconds();
    let minute = date.getMinutes();
    let hour = date.getHours();

    ctx.save();

    ctx.strokeStyle = "rgb(233 228 99)";
    ctx.fillStyle = "rgb(233 228 99)";
    ctx.beginPath();
    ctx.rect(-250, -250, 500, 500);
    ctx.stroke();
    ctx.fill();
    Draw();

    Hour(hour, minute);
    Minute(minute, second);
    Second(second);
}

ctx.translate(200, 200);
Run();
setInterval(Run, 1000);

//blue rgb(33 166 166)
//green rgb(39 140 65)
//orange rgb(242 160 7)
//yellow rgb(233 228 99)