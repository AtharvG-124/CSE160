// Global Variables
let canvas, gl, a_Position, u_FragColor, u_Size;

// State Variables
let g_selectedColor = [1.0, 1.0, 1.0, 1.0];
let g_selectedSize = 5;
let g_selectedType = 'point';
let g_selectedSegments = 10;
let g_shapesList = [];

var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform float u_Size;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = u_Size;
  }`;

var FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }`;

function setupWebGL() {
  canvas = document.getElementById('webgl');
  gl = canvas.getContext("webgl", { preserveDrawingBuffer: true }); // Requirement 8
}

function connectVariablesToGLSL() {
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) return;
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  u_Size = gl.getUniformLocation(gl.program, 'u_Size');
}

function addActionsForHtmlUI() {
  // Color/Size Listeners (Requirement 4, 5)
  document.getElementById('redSlide').addEventListener('input', function() { g_selectedColor[0] = this.value/100; });
  document.getElementById('greenSlide').addEventListener('input', function() { g_selectedColor[1] = this.value/100; });
  document.getElementById('blueSlide').addEventListener('input', function() { g_selectedColor[2] = this.value/100; });
  document.getElementById('sizeSlide').addEventListener('input', function() { g_selectedSize = this.value; });
  document.getElementById('segmentSlide').addEventListener('input', function() { g_selectedSegments = this.value; });

  // Buttons (Requirement 9, 10, 7)
  document.getElementById('pointButton').onclick = function() { g_selectedType = 'point'; };
  document.getElementById('triButton').onclick = function() { g_selectedType = 'triangle'; };
  document.getElementById('circleButton').onclick = function() { g_selectedType = 'circle'; };
  document.getElementById('clearButton').onclick = function() { g_shapesList = []; renderAllShapes(); };
}

function main() {
  setupWebGL();
  connectVariablesToGLSL();
  addActionsForHtmlUI();

  canvas.onmousedown = click;
  canvas.onmousemove = function(ev) { if(ev.buttons == 1) { click(ev); } }; // Requirement 8

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

function click(ev) {
  let [x, y] = convertCoordinatesEventToGL(ev);
  let shape;
  if (g_selectedType === 'point') shape = new Point();
  else if (g_selectedType === 'triangle') shape = new Triangle();
  else shape = new Circle();

  shape.position = [x, y];
  shape.color = [...g_selectedColor];
  shape.size = g_selectedSize;
  g_shapesList.push(shape);
  renderAllShapes();
}

function convertCoordinatesEventToGL(ev) {
  var x = ev.clientX, y = ev.clientY;
  var rect = ev.target.getBoundingClientRect();
  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
  return [x, y];
}

function renderAllShapes() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  for(var i = 0; i < g_shapesList.length; i++) {
    g_shapesList[i].render();
  }
}