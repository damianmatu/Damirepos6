let trail = [];
const maxTrailLength = 50;
let trailOpacity = 255;
let lastUpdateTime = 0;
const fadeInterval = 5000; // 5 segundos
let currentColor = 0;
const colors = ['#FF0000', '#0000FF', '#00FF00', '#FFFF00', '#FF69B4', '#800080', '#FFA500', '#A52A2A'];
let trailSizeSlider;
let textSizeValue = 14; // Tamaño del texto
let textColor; // Color del texto
let vibrationAmount = 2; // Cantidad de vibración

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  
  // Crea un slider para ajustar el tamaño de la estela
  trailSizeSlider = createSlider(1, 10, 2);
  trailSizeSlider.position(10, 10); // Coloca la barra en la esquina superior izquierda
  
  // Establece el color del texto
  textColor = color(0); // Color negro
}

function draw() {
  // Calcula el tiempo transcurrido desde la última actualización
  let currentTime = millis();
  let elapsedTime = currentTime - lastUpdateTime;

  // Deja una estela solo si se mueve el cursor
  if (mouseX !== pmouseX || mouseY !== pmouseY) {
    let trailPoint = {
      x: mouseX + random(-vibrationAmount, vibrationAmount), // Agrega vibración en X
      y: mouseY + random(-vibrationAmount, vibrationAmount), // Agrega vibración en Y
      opacity: trailOpacity,
      color: colors[currentColor],
      size: trailSizeSlider.value() * 2 // Ajusta el tamaño de la estela
    };
    trail.push(trailPoint);

    // Limita la longitud de la estela
    if (trail.length > maxTrailLength) {
      trail.shift();
    }
    
    // Reduce la opacidad de la estela
    trailOpacity -= 2;

    // Restablece el tiempo de la última actualización
    lastUpdateTime = currentTime;
  }

  // Dibuja la estela
  for (let i = 0; i < trail.length; i++) {
    stroke(trail[i].color);
    strokeWeight(trail[i].size);
    point(trail[i].x, trail[i].y);
  }
  
  // Restablece la opacidad cuando sea necesario
  if (trailOpacity <= 0) {
    trailOpacity = 255;
  }
  
  // Verifica si ha pasado el intervalo de 5 segundos
  if (elapsedTime >= fadeInterval) {
    // Reinicia la estela y la opacidad
    trail = [];
    trailOpacity = 255;
  }
  
  // Dibuja el texto debajo de la barra para ajustar el tamaño en la esquina superior izquierda
  textAlign(LEFT, TOP);
  noStroke(); // Sin bordes para el texto
  fill(textColor);
  textSize(textSizeValue);
  text("Tamaño de la estela:", 10, 50); // Ajusta la posición en la esquina superior izquierda
  // Dibuja el texto "Barra espaciadora" debajo de la barra de tamaño
  text("Barra espaciadora: borrar", 10, 90); // Ajusta la posición en la esquina superior izquierda
  // Dibuja el texto "Clic derecho" debajo de "Barra espaciadora"
  text("Clic derecho: color", 10, 120); // Ajusta la posición en la esquina superior izquierda
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(255);
}

function mousePressed() {
  // Cambia al siguiente color en la lista cuando se hace clic izquierdo
  currentColor = (currentColor + 1) % colors.length;
}

function keyPressed() {
  if (key === ' ') {
    // Limpia el canvas al presionar la barra espaciadora
    background(255);
    trail = [];
  }
}
