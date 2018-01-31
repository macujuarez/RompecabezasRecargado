
var expect = chai.expect;

describe('Creación', function() {
  'use strict';

  describe('Juego', function() {
    it('El Objeto Juego está definido', function(done) {
      if (!window.Juego){
        done(err);
      }
      else{
        done();
      }
    });
  });

describe('Tamaño de la grilla', function() {
    it('La grilla tiene el tamaño correcto', function() {
      //se crea la grilla con un valor de cantidad de piezas por lado
      Juego.cantidadDePiezasPorLado = 5;
      Juego.crearGrilla(Juego.cantidadDePiezasPorLado);
      //se evalua si el tamaño de la grilla creada es correcto
      expect(Juego.grilla.length).to.equal(Juego.cantidadDePiezasPorLado);
      expect(Juego.grilla[0].length).to.equal(Juego.cantidadDePiezasPorLado);
    });
    
});

describe('Durante el juego', function () {
  'use strict';

  describe("Testear Movimientos Validos", function () {
    it('Movimientos Negativos', function () {
      expect(Juego.posicionValida(-1, -1)).to.equal(false);
    });
    it('Ningun Movimiento => (0,0)', function () {
      expect(Juego.posicionValida(0, 0)).to.equal(true);
    });
    it('Movimiento fuera de limites', function () {
      expect(Juego.posicionValida(Juego.grilla[0].length, Juego.grilla.length)).to.equal(false);
    });
    it('Actualiza posicion vacia', function(){
      Juego.posicionVacia.fila = 3;
        Juego.posicionVacia.columna = 3;
        Juego.actualizarPosicionVacia(2,2);
        expect(Juego.posicionVacia.fila).to.equal(2);
      expect(Juego.posicionVacia.columna).to.equal(2);			
    })
  });

});


});
