function main() {
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    var ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, 400, 400);

    var v1 = new Vector3([2.25, 2.25, 0]);

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