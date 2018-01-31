//se carga la imagen del rompecabezas
  Juego.prototype.cargarImagen = function (e) {
    //se calcula el ancho y el alto de las piezas de acuerdo al tamaño del canvas (600). 
    this.anchoPiezas = Math.floor(600 / this.cantidadDePiezasPorLado);
    this.altoPiezas = Math.floor(600 / this.cantidadDePiezasPorLado);
    //se calcula el ancho y alto del rompecabezas de acuerdo al ancho y alto de cada pieza y la cantidad de piezas por lado
    this.anchoDeRompecabezas = this.anchoPiezas * this.cantidadDePiezasPorLado;
    this.altoDeRompecabezas = this.altoPiezas * this.cantidadDePiezasPorLado;
    this.configurarCanvas();
  },

  //funcion que carga la imagen
  Juego.prototype.iniciarImagen = function (callback) {
    this.imagen = new Image();
    var self = this;
    //se espera a que se termine de cargar la imagen antes de ejecutar la siguiente funcion
    this.imagen.addEventListener('load', function () {
      self.cargarImagen.call(self);
      callback();
    }, false);
    this.imagen.src = "images/imagen.jpg";
  },

  Juego.prototype.dibujarImagen = function(imagen, x, y){
    window.onload = function() {
      var canvas = document.getElementById("myCanvas");
      var ctx = canvas.getContext("2d");
      var img = document.getElementById("scream");
      ctx.drawImage(img, 10, 10);
    };
  }

  //una vez elegido el nivel, se inicia el juego
  Juego.prototype.iniciar = function (cantMovimientos) {
    this.movimientosTotales = cantMovimientos;
    this.contadorDeMovimientos = cantMovimientos;
    this.piezas = [];
    this.grilla = [];
    document.getElementById("contadorDeMovimientos").innerHTML = this.contadorDeMovimientos;
    this.cantidadDePiezasPorLado = document.getElementById("cantidadPiezasPorLado").value;
    //se guarda el contexto en una variable para que no se pierda cuando se ejecute la funcion iniciarImagen (que va a tener otro contexto interno)
    var self = this;
    this.crearGrilla();
    //se instancian los atributos que indican la posicion de las fila y columna vacias de acuerdo a la cantidad de piezas por lado para que sea la ultima del tablero
    this.filaPosicionVacia = this.cantidadDePiezasPorLado - 1;
    this.columnaPosicionVacia = this.cantidadDePiezasPorLado - 1;
    //se espera a que este iniciada la imagen antes de construir las piezas y empezar a mezclarlas
    this.iniciarImagen(function () {
      self.construirPiezas();
      //la cantidad de veces que se mezcla es en funcion a la cantidad de piezas por lado que tenemos, para que sea lo mas razonable posible.
      var cantidadDeMezclas = Math.max(Math.pow(self.cantidadDePiezasPorLado, 3), 100);
      self.mezclarPiezas(cantidadDeMezclas);
    });
  }