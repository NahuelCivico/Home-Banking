 //Declaración de variables globales con caracter "_"
var _nombreUsuario = 'Nahuel Civico';
var _saldoCuenta = 8000;
var _limiteExtraccion = 7500;
var _saldoAnterior;
var _codigoCuenta = 1234;
//Ejecución de las funciones que actualizan los valores de las variables en el HTML
iniciarSesion();
cargarNombreEnPantalla();
actualizarSaldoEnPantalla();
actualizarLimiteEnPantalla();
//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
    var monto = parseInt(mostrarAlerta("Ingrese el nuevo límite de extracción"));
    if (validarMontoIngresado(monto)) {
      actualizarLimiteEnPantalla();
      mostrarMensajeUsuario("El nuevo limite de extracción es: " + _limiteExtraccion );
    }
}

function extraerDinero() {
    var monto = parseInt(mostrarAlerta("Ingrese el monto a retirar"));
    if (extraerDeA100(monto)) {
      if (haySaldoDisponible(monto) && superaLimite(monto)) {
        restarDinero(monto);
        mostrarMensajeInformativo(monto, "retirado");
      }
    }
}

function depositarDinero() {
    var monto = parseInt(mostrarAlerta("Ingrese el monto a depositar"));
    if (validarMontoIngresado(monto)) {
      sumarDinero(monto);
      mostrarMensajeInformativo(monto, "depositado");
    }
}

function depositarCheque() {
    var montoCheque = parseInt(mostrarAlerta("Ingrese el monto del cheque a depositar"));
    if (montoCheque <= 10000) {
      sumarDinero(montoCheque);
      mostrarMensajeInformativo(montoCheque, "depositado");
    }else {
      mostrarMensajeUsuario("No es posible depositar un cheque con un valor superior a diez mil pesos en una transacción");
    }
}

function pagarServicio() {
    var agua = 100;
    var telefono = 330;
    var luz = 500;
    var internet = 850;
    var gas = 325;

    var servicio = parseInt(mostrarAlerta("Ingrese el numero de servicio que desea pagar: \n 1 - Agua \n 2 - Teléfono \n 3 - Luz \n 4 - Internet \n 5 - Gas"));

    switch (servicio) {
      case 1:
          pagarServicios(agua, "agua");
        break;
        case 2:
          pagarServicios(telefono, "telefono");
          break;
          case 3:
            pagarServicios(luz, "luz");
            break;
            case 4:
              pagarServicios(internet, "internet");
              break
              case 5:
                pagarServicios(gas, "gas");
                break
      default:
        mostrarMensajeUsuario("No existe el servicio que se ha seleccionado");
    }
}

function transferirDinero() {
    var cuentaAmiga1 = 1234567;
    var cuentaAmiga2 = 7654321;

    var monto = parseInt(mostrarAlerta("Ingrese el monto que desea transferir"));
    if (haySaldoDisponible(monto)) {
      var cuenta = parseInt(mostrarAlerta("Ingrese el numero de cuenta"));
      if (cuenta == cuentaAmiga1 || cuenta == cuentaAmiga2) {
        restarDinero(monto);
        mostrarMensajeUsuario("Se han transferido: $" + monto + "\nCuenta destino: " + cuenta);
      }else {
        mostrarMensajeUsuario("Solo se puede transferir dinero a una cuenta amiga");
      }
    }
}

function iniciarSesion() {
    var codigoIngresado = mostrarAlerta("Ingresa el código de tu cuenta");
    if (codigoCorrecto(codigoIngresado)) {
      mostrarMensajeUsuario("Bienvenido/a " + _nombreUsuario + ", ya puedes comenazar a realizar operaciones");
    }
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + _nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + _saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + _limiteExtraccion;
}

//Funciones complementarias
function mostrarAlerta(texto){
    return prompt(texto);
}

function mostrarMensajeUsuario(texto){
    return alert(texto);
}

function mostrarMensajeInformativo(monto, accion){
    return alert("Has " + accion + ": $" + monto +  "\nSaldo anterior: $" + _saldoAnterior +" \nSaldo actual: $" + _saldoCuenta);
}

function codigoCorrecto(codigoIngresado){
    if (codigoIngresado != _codigoCuenta){
      _saldoCuenta = 0;
      mostrarMensajeUsuario("Código incorrecto. Tu dinero ha sido retenido por cuestiones de seguridad");
      return false;
    }
    return true;
}

function validarMontoIngresado(monto){
    if (isNaN(monto)) {
      mostrarMensajeUsuario("Debes ingresar valores numericos");
      return false;
    }else if (monto == "" || monto == null) {
        return false;
    }
    _limiteExtraccion = monto;
    return true;
}

function haySaldoDisponible(monto){
    if (monto > _saldoCuenta) {
      mostrarMensajeUsuario("Saldo insuficiente, el saldo de la cuenta es de: $" + _saldoCuenta);
      return false;
    }
    return true;
}

function superaLimite(monto){
  if (monto > _limiteExtraccion) {
      mostrarMensajeUsuario("La cantidad de dinero que deseas extraer supera el limite de extracción");
      return false;
  }
  return true;
}

function sumarDinero(monto){
    _saldoAnterior = _saldoCuenta;
    _saldoCuenta += monto;
    actualizarSaldoEnPantalla();
}

function restarDinero(monto){
    _saldoAnterior = _saldoCuenta;
    _saldoCuenta -= monto;
    actualizarSaldoEnPantalla();
}

function extraerDeA100(monto){
  if (monto % 100 !== 0) {
    mostrarMensajeUsuario("Solo puede extraer billetes de 100");
    return false;
  }
  return true;
}

function pagarServicios(monto, servicio){
    if (haySaldoDisponible(monto)) {
      restarDinero(monto);
      mostrarMensajeInformativo(monto, "pagado el servicio de "+ servicio +"");
    }
}
