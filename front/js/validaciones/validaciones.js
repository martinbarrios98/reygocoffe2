import { alertaNotificacion } from '../emergentes/emergentes.js';
import { validarNombre, validarApellido, validarCorreo, validarPassword, validarDireccion, validarTelefono, validarCiudad, validarEstado, validarPostal, validarDireccionExtra, validarReferencias, validarTarjeta, validarExpiracionMes, validarExpiracionAño, validarCCV  } from './validacionesInputs.js';

const usuario = {
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    direccion: '',
    telefono: ''
}

const sesion = {
    correo: '',
    password: ''
}

const tarjeta = {
    numero: '',
    nombre: '',
    ccv: '',
    expiracion:{
        año: '',
        mes: ''
    }
}

export async function validacionesUsuario (){

    const inputNombre = document.querySelector('#nombre');
    const inputApellido = document.querySelector('#apellido');
    const inputCorreo = document.querySelector('#correo');
    const inputPassword = document.querySelector('#password');
    const inputDireccion = document.querySelector('#direccion');
    const inputTelefono = document.querySelector('#telefono')

    validarNombre(inputNombre, usuario);
    validarApellido(inputApellido, usuario);
    validarCorreo(inputCorreo, usuario);
    validarPassword(inputPassword, usuario);
    validarDireccion(inputDireccion, usuario);
    validarTelefono(inputTelefono, usuario);

    return usuario;
   

}

export async function validacionesUsuarioEditar ( informacion ){

    let usuario = informacion;

    const inputNombre = document.querySelector('#nombre');
    const inputApellido = document.querySelector('#apellido');
    const inputCorreo = document.querySelector('#correo');
    const inputPassword = document.querySelector('#password');
    const inputDireccion = document.querySelector('#direccion');
    const inputTelefono = document.querySelector('#telefono')

    validarNombre(inputNombre, usuario);
    validarApellido(inputApellido, usuario);
    validarCorreo(inputCorreo, usuario);
    validarPassword(inputPassword, usuario);
    validarDireccion(inputDireccion, usuario);
    validarTelefono(inputTelefono, usuario);

    return usuario;
   

}

export async function validacionesSesion(){

    const inputCorreo = document.querySelector('#correo-iniciar');
    const inputPassword = document.querySelector('#password-iniciar');

    validarCorreo(inputCorreo, sesion);
    validarPassword(inputPassword, sesion);

    return sesion;

}

export async function validacionesPedido(objeto){

    const inputDireccion = document.querySelector('#direccion');
    const inputReferencias = document.querySelector('#referencias')
    const inputEstado = document.querySelector('#estado');
    const inputCiudad = document.querySelector('#ciudad');
    const inputPostal= document.querySelector('#postal');

    
    validarDireccionExtra(inputDireccion, objeto);
    validarReferencias(inputReferencias, objeto);
    validarEstado(inputEstado, objeto);
    validarCiudad(inputCiudad, objeto);
    validarPostal(inputPostal, objeto);

    return objeto;

}

export async function validacionesTarjeta(){

    const inputTarjeta = document.querySelector('#tarjeta-usuario');
    const inputNombre = document.querySelector('#nombre-tarjeta')
    const inputCCV = document.querySelector('#ccv-usuario');
    const inputExpiracionAño = document.querySelector('#año-expiracion');
    const inputExpiracionMes = document.querySelector('#mes-expiracion');

    validarTarjeta(inputTarjeta, tarjeta);
    validarNombre(inputNombre, tarjeta);
    validarCCV(inputCCV, tarjeta);
    validarExpiracionAño(inputExpiracionAño, tarjeta);
    validarExpiracionMes(inputExpiracionMes, tarjeta);

    return tarjeta;

}
