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

function handleDrawEvent() {
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, 400, 400);

    var v1x = document.getElementById('v1X').value;
    var v1y = document.getElementById('v1Y').value;
    var v1 = new Vector3([parseFloat(v1x), parseFloat(v1y), 0]);
    drawVector(v1, "red");

    var v2x = document.getElementById('v2X').value;
    var v2y = document.getElementById('v2Y').value;
    var v2 = new Vector3([parseFloat(v2x), parseFloat(v2y), 0]);
    drawVector(v2, "blue");
}

function handleDrawOperationEvent() {
    handleDrawEvent();

    var v1x = document.getElementById('v1X').value;
    var v1y = document.getElementById('v1Y').value;
    var v1 = new Vector3([parseFloat(v1x), parseFloat(v1y), 0]);

    var v2x = document.getElementById('v2X').value;
    var v2y = document.getElementById('v2Y').value;
    var v2 = new Vector3([parseFloat(v2x), parseFloat(v2y), 0]);

    var op = document.getElementById('operation').value;
    var s = parseFloat(document.getElementById('scalar').value);

    if (op === "add") {
        var v3 = new Vector3(v1.elements);
        v3.add(v2);
        drawVector(v3, "green");
    } else if (op === "sub") {
        var v3 = new Vector3(v1.elements);
        v3.sub(v2);
        drawVector(v3, "green");
    } else if (op === "mul") {
        var v3 = new Vector3(v1.elements);
        var v4 = new Vector3(v2.elements);
        v3.mul(s);
        v4.mul(s);
        drawVector(v3, "green");
        drawVector(v4, "green");
    } else if (op === "div") {
        var v3 = new Vector3(v1.elements);
        var v4 = new Vector3(v2.elements);
        v3.div(s);
        v4.div(s);
        drawVector(v3, "green");
        drawVector(v4, "green");
    } else if (op === "magnitude") {
        console.log("Magnitude v1: " + v1.magnitude());
        console.log("Magnitude v2: " + v2.magnitude());
    } else if (op === "normalize") {
        var v3 = new Vector3(v1.elements);
        var v4 = new Vector3(v2.elements);
        v3.normalize();
        v4.normalize();
        drawVector(v3, "green");
        drawVector(v4, "green");
    }
}