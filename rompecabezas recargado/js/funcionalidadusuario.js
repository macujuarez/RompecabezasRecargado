$("#btnInicio").click(function(){
    Juego.iniciar(75);
    $("#btnInicio").hide();
});

//Selecciona el nivel por el usuario
var $nivelDeJuego = $('#cantidadPiezasPorLado');
var $movimientosDelNivel = $('#contadorDeMovimientos');
var $nivelDejuegoElegido = $('#Niveles input[type=radio]').change(function(){
  $nivelElegido = $(this).val();
  var Dificultad;
  var Movimientos;
    if ($nivelElegido == "facil"){
        Dificultad = 3;
        Movimientos = 30;
    }
    if ($nivelElegido == "medio"){
        Dificultad = 4;
        Movimientos = 50
    }
    if ($nivelElegido == "dificil"){
        Dificultad = 5;
        Movimientos = 70
    }
    $nivelDeJuego.val(Dificultad);
    $movimientosDelNivel.val(Movimientos);
});
 