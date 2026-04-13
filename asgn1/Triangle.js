class Triangle {
  constructor(position, color, size) {
    this.type = 'triangle';
    this.position = position;
    this.color = color;
    this.size = size;
  }

  render() {
    let d = this.size / 200.0;
    gl.uniform4f(u_FragColor, this.color[0], this.color[1], this.color[2], this.color[3]);
    drawTriangle([
      this.position[0], this.position[1] + d,
      this.position[0] - d, this.position[1] - d,
      this.position[0] + d, this.position[1] - d
    ]);
  }
}

function drawTriangle(vertices) {
  var n = 3;
  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);
  gl.drawArrays(gl.TRIANGLES, 0, n);
}