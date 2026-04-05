function main() {
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, 400, 400);
}

function handleDrawEvent() {
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, 400, 400);

    var x = document.getElementById('v1X').value;
    var y = document.getElementById('v1Y').value;

    var v1 = new Vector3([parseFloat(x), parseFloat(y), 0]);

    drawVector(v1, "red");
}

function drawVector(v, color) {
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');

    ctx.strokeStyle = color;

    var x = v.elements[0];
    var y = v.elements[1];

    var dx = x * 20;
    var dy = y * 20;

    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.lineTo(200 + dx, 200 - dy);
    ctx.stroke();
}