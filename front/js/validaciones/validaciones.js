import { alertaNotificacion } from '../emergentes/emergentes.js';
import { validarNombre, validarApellido, validarCorreo, validarPassword, validarDireccion, validarTelefono, validarCiudad, validarEstado, validarPostal, validarDireccionExtra, validarReferencias, validarTarjeta, validarExpiracionMes, validarExpiracionAño, validarCCV, validarURL, validarURLEditar, validarCategoria, validarDescripcion, validarPrecio, validarEstadoPedido, validarNumeroGuia, validarPaqueteria, validarDisponibilidad, validarPeso  } from './validacionesInputs.js';

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

const administrador = {
    nombre: '',
    correo: '',
    password: '',
    url: ''
}

const producto = {
    nombre: '',
    descripcion: '',
    precio: '',
    url: '',
    categoria: '',
    peso: ''
}

const sesionAdmin = {
    correo: '',
    password: ''
}

const categoria = {
    nombre: '',
    url: ''
}

export async function validacionesUsuario (){

    const inputNombre = document.querySelector('#nombre');
    const inputApellido = document.querySelector('#apellido');
    const inputCorreo = document.querySelector('#correo');
    const inputPassword = document.querySelector('#password');
    const inputDireccion = document.querySelector('#direccion');
    const inputTelefono = document.querySelector('#telefono');

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

export async function validacionesAdministrador(){

    const inputNombre = document.querySelector('#nombre');
    const inputCorreo = document.querySelector('#correo');
    const inputPassword = document.querySelector('#password');
    const inputURL = document.querySelector('#imagen');

    validarNombre(inputNombre, administrador);
    validarCorreo(inputCorreo, administrador);
    validarPassword(inputPassword, administrador);
    validarURL(inputURL, administrador);

    return administrador;

}

export async function validacionesAdministradorEditar( objeto ){

    const inputNombre = document.querySelector('#nombre-editar');
    const inputCorreo = document.querySelector('#correo-editar');
    const inputPassword = document.querySelector('#password-editar');
    const inputURL = document.querySelector('#imagen-editar');

    validarNombre(inputNombre, objeto);
    validarCorreo(inputCorreo, objeto);
    validarPassword(inputPassword, objeto);
    validarURLEditar(inputURL, objeto);

    return objeto;

}

export async function validacionesProducto(){

    const inputNombre = document.querySelector('#nombre');
    const inputPrecio = document.querySelector('#precio');
    const inputDescripcion = document.querySelector('#descripcion');
    const inputCategoria = document.querySelector('#categoria');
    const inputURL = document.querySelector('#imagen');
    const inputPeso = document.querySelector('#peso');

    validarNombre(inputNombre, producto);
    validarPrecio(inputPrecio, producto);
    validarDescripcion(inputDescripcion, producto);
    validarCategoria(inputCategoria, producto);
    validarURL(inputURL, producto);
    validarPeso(inputPeso, producto);

    return producto;


}

export async function validacionesProductoEditar( objeto ){

    const inputNombre = document.querySelector('#nombre-editar');
    const inputPrecio = document.querySelector('#precio-editar');
    const inputDescripcion = document.querySelector('#descripcion-editar');
    const inputCategoria = document.querySelector('#categoria-editar');
    const inputURL = document.querySelector('#imagen-editar');
    const inputDisponibilidad = document.querySelector('#disponibilidad-editar');
    const inputPeso = document.querySelector('#peso-editar');

    validarNombre(inputNombre, objeto);
    validarPrecio(inputPrecio, objeto);
    validarDescripcion(inputDescripcion, objeto);
    validarCategoria(inputCategoria, objeto);
    validarURLEditar(inputURL, objeto);
    validarDisponibilidad(inputDisponibilidad, objeto);
    validarPeso(inputPeso, objeto);

    return objeto;

}

export async function validacionesPedidoEditar( objeto ){

    const inputNumeroGuia = document.querySelector('#numero-guia');
    const inputPaqueteria = document.querySelector('#paqueteria');
    const inptuEstadoPedido = document.querySelector('#estado-pedido');

    validarNumeroGuia(inputNumeroGuia, objeto);
    validarPaqueteria(inputPaqueteria, objeto);
    validarEstadoPedido(inptuEstadoPedido, objeto);

    return objeto;

}

export async function validacionesSesionAdmin(){

    const inputCorreo = document.querySelector('#correo-iniciar');
    const inputPassword = document.querySelector('#password-iniciar');

    validarCorreo(inputCorreo, sesionAdmin);
    validarPassword(inputPassword, sesionAdmin);

    return sesionAdmin;

}

export async function validacionesCategoria(){

    const inputNombre = document.querySelector('#nombre');
    const inputImagen = document.querySelector('#imagen');

    validarNombre(inputNombre, categoria);
    validarURL(inputImagen, categoria);

    return categoria;

}

export async function validacionesCategoriaEditar( objeto ){

    const inputNombre = document.querySelector('#nombre-editar');
    const inputImagen = document.querySelector('#imagen-editar');

    validarNombre(inputNombre, objeto);
    validarURLEditar(inputImagen, objeto);

    return objeto;

}