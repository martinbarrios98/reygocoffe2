import { alertaNotificacion } from '../emergentes/emergentes.js';

export function validarNombre ( input, objeto ){
    input.addEventListener('input', e => {

        if(e.target.value === '' || e.target.value.length < 4){

            alertaNotificacion('Error de validacion', 'La longitud minima de nombre es de 5 letras o esta campo vacio', 'error');
            objeto.nombre = '';

        }else{

            const nombreTexto = e.target.value.trim();
            alertaNotificacion('Validacion Correcta', 'Nombre validado correctamente', 'exito');
            objeto.nombre = nombreTexto;

        }

    });
}

export function validarApellido ( input, objeto ) {

    input.addEventListener('input', e => {

        if(e.target.value === '' || e.target.value.length < 4){

            alertaNotificacion('Error de validacion', 'La longitud minima de apellido es de 5 letras o esta campo vacio', 'error');
            objeto.apellido = '';

        }else{

            const apellidoTexto = e.target.value.trim();
            alertaNotificacion('Validacion Correcta', 'Apellido validado correctamente', 'exito');
            objeto.apellido = apellidoTexto;

        }

    });

}

export function validarCorreo ( input, objeto ) {

    input.addEventListener('input', e =>{

        if(e.target.value === '' || e.target.value.length < 4){

            alertaNotificacion('Error de validacion', 'La longitud minima de un correo es de 5 letras o esta campo vacio', 'error');
            objeto.correo = '';

        }else{

            const correoTexto = e.target.value.trim();
            alertaNotificacion('Validacion Correcta', 'Correo validado correctamente', 'exito');
            objeto.correo = correoTexto;

        }

    });

}

export function validarPassword ( input, objeto) {

    input.addEventListener('input', e =>{

        if(e.target.value === '' || e.target.value.length < 4){

            alertaNotificacion('Error de validacion', 'La longitud minima de un password es de 5 letras o esta campo vacio', 'error');
            objeto.password = '';

        }else{

            const passwordTexto = e.target.value.trim();
            alertaNotificacion('Validacion Correcta', 'Password validado correctamente', 'exito');
            objeto.password = passwordTexto;

        }

    });

}

export function validarDireccion(input, objeto){
    input.addEventListener('input', e => {

        if(e.target.value === '' || e.target.value.length < 4){

            alertaNotificacion('Error de validacion', 'La longitud minima de direccion es de 5 letras o esta campo vacio', 'error');
            objeto.direccion = '';

        }else{

            const nombreTexto = e.target.value.trim();
            alertaNotificacion('Validacion Correcta', 'Direccion validado correctamente', 'exito');
            objeto.direccion = nombreTexto;

        }

    });
}

export function validarTelefono(input, objeto){
    input.addEventListener('input', e => {

        if(e.target.value === '' || e.target.value.length < 8){

            alertaNotificacion('Error de validacion', 'La longitud minima de telefono es de 5 letras o esta campo vacio', 'error');
            objeto.telefono = '';

        }else{

            const nombreTexto = e.target.value.trim();
            alertaNotificacion('Validacion Correcta', 'Telefono validado correctamente', 'exito');
            objeto.telefono = nombreTexto;

        }

    });
}

export function validarEstado(input, objeto){
    input.addEventListener('input', e => {

        if(e.target.value === '' || e.target.value === 'no'){

            alertaNotificacion('Error de validacion', 'Este campo no puede ir vacio', 'error');
            objeto.estado = '';

        }else{

            const estadoTexto = e.target.value.trim();
            alertaNotificacion('Validacion Correcta', 'Estado validado correctamente', 'exito');
            objeto.estado = estadoTexto;

        }

    });
}

export function validarCiudad(input, objeto){
    input.addEventListener('input', e => {

        if(e.target.value === '' || e.target.value.length < 4){

            alertaNotificacion('Error de validacion', 'Este campo no puede ir vacio y longitud minima de ciudad es 4 palabras', 'error');
            objeto.ciudad = '';

        }else{

            const estadoTexto = e.target.value.trim();
            alertaNotificacion('Validacion Correcta', 'Ciudad validada correctamente', 'exito');
            objeto.ciudad = estadoTexto;

        }

    });
}

export function validarPostal(input, objeto){
    input.addEventListener('input', e => {

        if(e.target.value === '' || e.target.value.length < 4){

            alertaNotificacion('Error de validacion', 'Este campo no puede ir vacio', 'error');
            objeto.postal = '';

        }else{

            const estadoTexto = e.target.value.trim();
            alertaNotificacion('Validacion Correcta', 'Codigo Postal validado correctamente', 'exito');
            objeto.postal = estadoTexto;

        }

    });
}

export function validarReferencias(input, objeto){
    input.addEventListener('input', e => {

        if(e.target.value === '' || e.target.value.length < 4){

            alertaNotificacion('Error de validacion', 'Este campo no puede ir vacio', 'error');
            objeto.usuario.referencias = '';

        }else{

            const estadoTexto = e.target.value.trim();
            alertaNotificacion('Validacion Correcta', 'Referencias validado correctamente', 'exito');
            objeto.usuario.referencias = estadoTexto;

        }

    });
}

export function validarDireccionExtra(input, objeto){
    input.addEventListener('input', e => {

        if(e.target.value === '' || e.target.value.length < 4){

            alertaNotificacion('Error de validacion', 'La longitud minima de direccion es de 5 letras o esta campo vacio', 'error');
            objeto.usuario.direccion_extra = '';

        }else{

            const nombreTexto = e.target.value.trim();
            alertaNotificacion('Validacion Correcta', 'Direccion validado correctamente', 'exito');
            objeto.usuario.direccion_extra = nombreTexto;

        }

    });
}

export function validarTarjeta ( input, objeto ){
    input.addEventListener('input', e => {

        if(e.target.value === '' || e.target.value.length < 16){

            alertaNotificacion('Error de validacion', 'La longitud minima de una tarjeta es de 16 numeros o esta campo vacio', 'error');
            objeto.numero = '';

        }else{

            const tarjetaNumero = e.target.value.trim();
            alertaNotificacion('Validacion Correcta', 'Numero de Tarjeta validado correctamente', 'exito');
            objeto.numero = tarjetaNumero;

        }

    });
}

export function validarCCV(input, objeto){
    input.addEventListener('input', e => {

        if(e.target.value === '' || e.target.value.length < 3){

            alertaNotificacion('Error de validacion', 'Este campo no puede ir vacio', 'error');
            objeto.ccv = '';

        }else{

            const estadoTexto = e.target.value.trim();
            alertaNotificacion('Validacion Correcta', 'CCV validado correctamente', 'exito');
            objeto.ccv = estadoTexto;

        }

    });
}

export function validarExpiracionAño (input, objeto){
    input.addEventListener('input', e => {

        if(e.target.value === '' || e.target.value.length < 2){

            alertaNotificacion('Error de validacion', 'Este campo no puede ir vacio', 'error');
            objeto.expiracion.año = '';

        }else{

            const estadoTexto = e.target.value.trim();
            alertaNotificacion('Validacion Correcta', 'Año validado correctamente', 'exito');
            objeto.expiracion.año  = estadoTexto;

        }

    });
}

export function validarExpiracionMes (input, objeto){
    input.addEventListener('input', e => {

        if(e.target.value === '' || e.target.value.length < 2){

            alertaNotificacion('Error de validacion', 'Este campo no puede ir vacio', 'error');
            objeto.expiracion.mes = '';

        }else{

            const estadoTexto = e.target.value.trim();
            alertaNotificacion('Validacion Correcta', 'Mes validado correctamente', 'exito');
            objeto.expiracion.mes  = estadoTexto;

        }

    });
}