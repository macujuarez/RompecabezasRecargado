var Juego = {
  posicionVacia : {
    fila: 2,
    columna: 2
  },
  ganador: false,
} 

// Esta función va a chequear si el Rompecabezas est&aacute; en la posición ganadora
Juego.chequearMovimientosRestantes = function(){
  perdiste = 0
  if(Juego.contadorDeMovimientos <= 0 ){
    $('#contadorDeMovimientos').val(perdiste);
    setTimeout('Juego.mostrarCartel("Perdiste")', 10); 
  }
}
Juego.mostrarCartel = function (estado) {
  if(estado === "Ganaste"){
    //alert("GANASTE");
    swal("Ganaste :)", "Felicitaciones", "success",);
  } else {
    swal('Perdiste :(', 'En la próxima seguro que lo lográs', 'error');
  }
}
Juego.actualizarPiezas = function (){
  for(let y=0; y<Juego.grilla.length; y++){
    for(let x=0; x<Juego.grilla[0].length; x++){
      var posX = x * Juego.anchoPiezas;
      var posY = y * Juego.altoPiezas;
      Juego.piezas[Juego.grilla[y][x]].x = posX;
      Juego.piezas[Juego.grilla[y][x]].y = posY;
    }
  }
}
// Intercambia posiciones grilla y en el DOM
Juego.intercambiarPosiciones = function (fila1, columna1, fila2, columna2) {
  var valorAnterior = Juego.grilla[fila1][columna1];
  Juego.grilla[fila1][columna1] = Juego.grilla[fila2][columna2];
  Juego.grilla[fila2][columna2] = valorAnterior; 
  Juego.actualizarPiezas();
}
// Actualiza la posición de la pieza vacía
Juego.actualizarPosicionVacia = function (nuevaFila, nuevaColumna) {
  Juego.posicionVacia.fila = nuevaFila;
  Juego.posicionVacia.columna = nuevaColumna;
}
// Para chequear si la posicón está dentro de la grilla.
Juego.posicionValida = function (fila, columna) {
  if (fila < 0 || fila >= Juego.grilla.length || columna < 0 || columna >= Juego.grilla[0].length) {
    return false;
  } else {
    if(!Juego.mezclando){
      Juego.setContadorDeMovimientos(Juego.contadorDeMovimientos-=1);
    }
    return true;
  }
}
Juego.setContadorDeMovimientos = function(contador){
  Juego.contadorDeMovimientos = contador;
  if(!Juego.mezclando){
    $("#contadorDeMovimientos").val(Juego.contadorDeMovimientos);
  } else {
    $("#contadorDeMovimientos").val("MEZCLANDO"); 
  }
}
Juego.moverEnDireccion = function (direccion) {
  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;
  if(Juego.contadorDeMovimientos >=0 && !Juego.ganador){
    // Intercambia pieza blanca con la pieza que está arriba suyo
    if (direccion == 40) {
      nuevaFilaPiezaVacia = Juego.posicionVacia.fila - 1;
      nuevaColumnaPiezaVacia = Juego.posicionVacia.columna;
    }
    // Intercambia pieza blanca con la pieza que está abajo suyo
    else if (direccion == 38) {
      nuevaFilaPiezaVacia = Juego.posicionVacia.fila + 1;
      nuevaColumnaPiezaVacia = Juego.posicionVacia.columna;
    }
    // Intercambia pieza blanca con la pieza que está a su izq
    else if (direccion == 39) {
      nuevaFilaPiezaVacia = Juego.posicionVacia.fila;
      nuevaColumnaPiezaVacia = Juego.posicionVacia.columna - 1;
    }
    // Intercambia pieza blanca con la pieza que está a su der
    else if (direccion == 37) {
      nuevaFilaPiezaVacia = Juego.posicionVacia.fila;
      nuevaColumnaPiezaVacia = Juego.posicionVacia.columna + 1;
    }
    // Se chequea si la nueva posición es válida, si lo es, se intercambia
    if (Juego.posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
      Juego.intercambiarPosiciones(Juego.posicionVacia.fila, Juego.posicionVacia.columna, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
      Juego.actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);        
    }
  }
}
// Extras, ya vienen dadas
Juego.mezclarPiezas = function(veces) {
  if (veces <= 0) {
    Juego.mezclando = false;
    return;
  }
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
  Juego.moverEnDireccion(direccion);
  setTimeout(function () {
    Juego.mezclarPiezas(veces - 1)},5);
 
} 
Juego.capturarTeclas = function() {
  if(Juego.contadorDeMovimientos >= 0 && !Juego.ganador){
    document.onkeydown = (function (evento) {
      if (evento.which == 40 || evento.which == 38 || evento.which == 39 || evento.which == 37) {
        Juego.moverEnDireccion(evento.which);
        Juego.chequearSiGano();
        Juego.chequearMovimientosRestantes();
        evento.preventDefault();
      }
    })
  }
}
Juego.capturarMouse = function(){
  if(Juego.contadorDeMovimientos >= 0 && !Juego.ganador){
    document.onmousedown = (function(evento){
      var canvasBox = canvas.getBoundingClientRect();
      mouseClicked.x = evento.clientX - canvasBox.left;
      mouseClicked.y = evento.clientY - canvasBox.top;
      var piezaSize = Juego.piezas[0].width;
      var piezaPos = {
        x: Juego.piezas[Juego.piezas.length - 1].x,
        y: Juego.piezas[Juego.piezas.length - 1].y,
      }
      // Click dentro del canvas
      if(mouseClicked.x > 0 && mouseClicked.x < canvas.width && mouseClicked.y > 0 && mouseClicked.y < canvas.height){
        // Izquierda
        if(mouseClicked.x < piezaPos.x && mouseClicked.x > piezaPos.x - piezaSize && mouseClicked.y > piezaPos.y && mouseClicked.y < piezaPos.y + piezaSize){
          Juego.moverEnDireccion(39);
        }
        // Arriba
        if(mouseClicked.x > piezaPos.x && mouseClicked.x < piezaPos.x + piezaSize && mouseClicked.y < piezaPos.y && mouseClicked.y > piezaPos.y - piezaSize){
          Juego.moverEnDireccion(40);
        }
        // Derecha
        if(mouseClicked.x > piezaPos.x + piezaSize && mouseClicked.x < piezaPos.x + piezaSize * 2 && mouseClicked.y > piezaPos.y && mouseClicked.y < piezaPos.y + piezaSize){
          Juego.moverEnDireccion(37);
        }
        // Abajo
        if(mouseClicked.x > piezaPos.x && mouseClicked.x < piezaPos.x + piezaSize && mouseClicked.y > piezaPos.y + piezaSize && mouseClicked.y < piezaPos.y + piezaSize * 2){
          Juego.moverEnDireccion(38);
        }
        Juego.chequearSiGano();
        Juego.chequearMovimientosRestantes();
      }
    });
  }
}
Juego.crearGrilla = function(cantidadDePiezasPorLado){
  Juego.grilla = new Array();  
    for (var y = 0; y < cantidadDePiezasPorLado; y++) {
      Juego.grilla[y] = new Array(cantidadDePiezasPorLado);
      for (var x = 0; x < cantidadDePiezasPorLado; x++) {
        Juego.grilla[y][x] = (y * cantidadDePiezasPorLado) + x;
      }      
    }
    Juego.posicionVacia.fila = cantidadDePiezasPorLado - 1;
    Juego.posicionVacia.columna = cantidadDePiezasPorLado - 1;
}
// Configuro elcontexto para el Canvas
var canvas = document.getElementById("miCanvas");
var ctx = canvas.getContext("2d");

var mouseClicked = {
  x: 0,
  y: 0,
}
Juego.cargarImagen = function (e) {
  //se calcula el ancho y el alto de las piezas de acuerdo al tamaño del canvas (600). 
  this.anchoPiezas = Math.floor(600 / this.cantidadDePiezasPorLado);
  this.altoPiezas = Math.floor(600 / this.cantidadDePiezasPorLado);
  //se calcula el ancho y alto del rompecabezas de acuerdo al ancho y alto de cada pieza y la cantidad de piezas por lado
  this.anchoDeRompecabezas = this.anchoPiezas * this.cantidadDePiezasPorLado;
  this.altoDeRompecabezas = this.altoPiezas * this.cantidadDePiezasPorLado;
  this.configurarCanvas();
} 
//funcion que carga la imagen
Juego.iniciarImagen = function (callback) {
  this.imagen = new Image();
  var self = this;
  //se espera a que se termine de cargar la imagen antes de ejecutar la siguiente funcion
  this.imagen.addEventListener('load', function () {
    self.cargarImagen.call(self);
    callback();
  }, false);
  this.imagen.src = "images/imagen.jpg";
  
}

Juego.configurarCanvas = function(){
  ctx.fillStyle = "orange";
  ctx.fillRect(0,0,canvas.width,canvas.height);
} // Termina configurarCanvas
Juego.construirPiezas = function (){
  Juego.piezas = new Array();
  for( y=0; y<Juego.grilla.length; y++){
    for( x=0; x<Juego.grilla[0].length; x++){
      var posX = x * Juego.anchoPiezas;
      var posY = y * Juego.altoPiezas;
      var cropX = posX;
      var cropY = posY;
      var nuevaPieza = new Pieza(Juego.grilla[y][x],posX, posY, Juego.anchoPiezas, Juego.altoPiezas);
      nuevaPieza.setImageURL(this.imagen.src);
      nuevaPieza.setImageCrop(cropX, cropY);
      Juego.piezas.push(nuevaPieza);
    }
  }
}
Juego.iniciar = function (cantMovimientos) {
  this.movimientosTotales = cantMovimientos;
  this.contadorDeMovimientos = cantMovimientos;
  Juego.maxMovimientos = 0;
  Juego.mezclando = true;
  Juego.frameCount = 0;
  Juego.opacidadObraFinal = 0.5;
  this.piezas = [];
  this.grilla = [];
  //se guarda el contexto en una variable para que no se pierda cuando se ejecute la funcion iniciarImagen (que va a tener otro contexto interno)
  // ==============
  var nivelDificultad = $("input[type='radio'][name='nivel']:checked").val();
  Juego.configurarNivel(nivelDificultad);
  $("#cantidadPiezasPorLado").val(Juego.cantidadDePiezasPorLado);

  $("#btnReIniciar").click(function(){
    location.reload();
  });

  $("#btnMezclar").click(function(){
    Juego.mezclando = true;  
    Juego.mezclarPiezas(20);
  });
    
    $("#btnInicio").val(1);
    $("#btnInicio").delay(200).animate({value:"0"},2500); 

  var self = this;
  this.crearGrilla(this.cantidadDePiezasPorLado);
  //se instancian los atributos que indican la posicion de las fila y columna vacias de acuerdo a la cantidad de piezas por lado para que sea la ultima del tablero
  this.filaPosicionVacia = this.cantidadDePiezasPorLado - 1;
  this.columnaPosicionVacia = this.cantidadDePiezasPorLado - 1;
  //se espera a que este iniciada la imagen antes de construir las piezas y empezar a mezclarlas
  this.iniciarImagen(function () {
    self.construirPiezas();
    var cantidadDeMezclas = Math.max(Math.pow(self.cantidadDePiezasPorLado, 3), 100);
    Juego.capturarTeclas();
    Juego.capturarMouse();
    self.mezclarPiezas(cantidadDeMezclas);
  
    setInterval(function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      Juego.frameCount+=1;
     // =======================================================================
    Juego.piezas.forEach(function(pieza) {
      ctx.strokeStyle = 'white';
      ctx.drawImage(pieza.image, pieza.xCrop, pieza.yCrop, pieza.width, pieza.height, pieza.x, pieza.y, pieza.width, pieza.height);
      ctx.strokeRect(pieza.xCrop,  pieza.yCrop, pieza.width, pieza.width);
     });
    // ========================================================================
     Juego.mostrarPiezaMovil();
     ctx.save();
     ctx.globalAlpha = $("#btnInicio").val();
     ctx.drawImage(Juego.piezas[0].image,0,0);
     ctx.restore();
    },1000/30); //Termina SetInterval
  });
  
}
Juego.setContadorDeMovimientos = function(contador){
  Juego.contadorDeMovimientos = contador;
  if(!Juego.mezclando){
    $("#contadorDeMovimientos").val(Juego.contadorDeMovimientos);
  } else {
    $("#contadorDeMovimientos").val(0);
  }
} 
Juego.configurarNivel = function(nivel){
  var piezas = 0;
  var movimientos = 0;
  nivel = nivel == undefined ? "facil" : nivel;
  
  if(nivel == "facil"){
    piezas = 3; //3
    movimientos = 30;//30
  } else if(nivel == "medio"){
    piezas = 4;
    movimientos = 50;
  } else if(nivel == "dificil"){
    piezas = 5;
    movimientos = 70;
  } else {
    piezas = Math.abs($("#cantidadPiezasPorLado").val());
    movimientos = Math.abs($("#contadorDeMovimientos").val());
  }
  Juego.cantidadDePiezasPorLado = piezas;
  Juego.maxMovimientos = movimientos;
  Juego.contadorDeMovimientos = Juego.maxMovimientos;
  $("#contadorDeMovimientos").val(Juego.maxMovimientos);
} 

Juego.mostrarPiezaMovil = function() {
      ctx.fillStyle = "rgba(156, 39, 176)"; 
      ctx.fillRect(Juego.piezas[Juego.piezas.length - 1].x, Juego.piezas[Juego.piezas.length - 1].y, Juego.piezas[0].width, Juego.piezas[0].height);
};

 Juego.chequearSiGano = function() {
  Juego.ganador = true;
  if(Juego.contadorDeMovimientos >=0){
    for (var y = 0; y < Juego.grilla.length; y++) {
      for (var x = 0; x < Juego.grilla[y].length; x++) {
        var ordenPiezas = ((Juego.grilla[0].length * y) + x);
        if (Juego.grilla[y][x] != ordenPiezas) {
          Juego.ganador = false;
         }
      }
    }
    if (Juego.ganador) {
      setTimeout("Juego.mostrarCartel('Ganaste')", 10);
    }
  }
}