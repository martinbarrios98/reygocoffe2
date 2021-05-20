import { alertaNotificacion } from '../../emergentes/emergentes.js';
import { ventanaUsuarioEditar } from '../../emergentes/ventanas.js';
import { validacionesUsuarioEditar } from '../../validaciones/validaciones.js';
import { edicionUsuario } from '../../consultas/v2/editor.js';
import { obtenerUsuario } from '../../consultas/v2/consultas.js';


export async function iconoSesionIniciada(){
    const sesion = localStorage.getItem('sesion_in');
    const icono = document.querySelector('.fa-user');

    if(sesion){
        icono.classList.add('verde');
    }else{
        icono.classList.remove('verde');
    }
}

export async function validarSesionIniciada(){

    const sesion = localStorage.getItem('sesion_in');

    if(sesion){
        insertarInformacionUsuario();
    }else{
        window.location = 'sesion.html';
    }

}

export async function insertarInformacionUsuario(){

    const sesion = JSON.parse(localStorage.getItem('sesion_in'));
    const { usuario, token } = sesion;
    const user = await obtenerUsuario( usuario.id );
    const { id, nombre, apellido, correo, direccion, telefono, password } = user;
    const contenedor = document.querySelector('.contenido-informacion');
    const nombreUsuario = document.querySelector('#nombre-usuario');
    
    nombreUsuario.textContent = nombre;

    //Nombre
    const campo = document.createElement('div');
    campo.classList.add('campo-informacion');

    const parrafoLabel = document.createElement('p');
    parrafoLabel.textContent = 'Nombre :'
    const parrafoNombre = document.createElement('p');
    parrafoNombre.textContent = nombre;

    campo.appendChild(parrafoLabel);
    campo.appendChild(parrafoNombre);

    //Apellido

    const campoApellido = document.createElement('div');
    campoApellido.classList.add('campo-informacion');

    const labelApellido = document.createElement('p');
    labelApellido.textContent = 'Apellido :'
    const parrafoApellido = document.createElement('p');
    parrafoApellido.textContent = apellido;

    campoApellido.appendChild(labelApellido);
    campoApellido.appendChild(parrafoApellido);

    //Correo

    const campoCorreo = document.createElement('div');
    campoCorreo.classList.add('campo-informacion');

    const labelCorreo = document.createElement('p');
    labelCorreo.textContent = 'Correo :'
    const parrafoCorreo = document.createElement('p');
    parrafoCorreo.textContent = correo;

    campoCorreo.appendChild(labelCorreo);
    campoCorreo.appendChild(parrafoCorreo);

    //Direccion

    const campoDireccion = document.createElement('div');
    campoDireccion.classList.add('campo-informacion');

    const labelDireccion = document.createElement('p');
    labelDireccion.textContent = 'Direccion :'
    const parrafoDireccion = document.createElement('p');
    parrafoDireccion.textContent = direccion;

    campoDireccion.appendChild(labelDireccion);
    campoDireccion.appendChild(parrafoDireccion);

    //Telefono

    const campoTelefono = document.createElement('div');
    campoTelefono.classList.add('campo-informacion');

    const labelTelefono = document.createElement('p');
    labelTelefono.textContent = 'Telefeno :'
    const parrafoTelefono = document.createElement('p');
    parrafoTelefono.textContent = telefono;

    campoTelefono.appendChild(labelTelefono);
    campoTelefono.appendChild(parrafoTelefono);

    //Passowrd

    const campoPassword = document.createElement('div');
    campoPassword.classList.add('campo-informacion');

    const labelPassword = document.createElement('p');
    labelPassword.textContent = 'Password :'
    const parrafoPassword = document.createElement('p');
    parrafoPassword.textContent = password;

    campoPassword.appendChild(labelPassword);
    campoPassword.appendChild(parrafoPassword);

    //BotonEditar

    const contenedotBoton = document.createElement('div');
    contenedotBoton.classList.add('contenedor-boton-right');
    contenedotBoton.dataset.idUsuario = id;

    const boton = document.createElement('button');
    boton.id = 'editar';
    boton.classList.add('boton', 'boton-editar');
    boton.textContent = 'Editar mi informacion';

    contenedotBoton.appendChild(boton);

    //

    contenedor.appendChild(campo);
    contenedor.appendChild(campoApellido);
    contenedor.appendChild(campoCorreo);
    contenedor.appendChild(campoDireccion);
    contenedor.appendChild(campoTelefono);
    contenedor.appendChild(campoPassword);
    contenedor.appendChild(contenedotBoton);

    editarInformacion(user);
}

export async function cerrarSesion(){

    const boton = document.querySelector('#cerrar');

    boton.addEventListener('click', async e =>{
        if(e.target.id === 'cerrar'){

            Swal.fire({
                title: 'Estas segur@?',
                text: "Se cerrara tu sesion al confirmar!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, cerrar mi sesion!'
              }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem('sesion_in');
                    Swal.fire({
                        position: 'top-end',
                        icon: 'warning',
                        title: 'cerrando sesion!!!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => {
                        location.reload();
                    }, 1600);

                }
              });

        }
    })

}

export async function editarInformacion( objeto ){

    const boton = document.querySelector('#editar');

    boton.addEventListener('click', async e =>{

        if(e.target.id === 'editar'){

            const botonEditar = await ventanaUsuarioEditar( objeto );
            const usuario = await validacionesUsuarioEditar( objeto );

            botonEditar.addEventListener('click', async e =>{

                if(e.target.id === 'confirmar-editar'){
                    e.preventDefault();
                    Swal.fire({
                        title: 'Estas segur@?',
                        text: "Se editara su perfil al confirmar esta accion!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Si, editar mi informacion!'
                      }).then(async (result) => {
                        if (result.isConfirmed) {
                            
                            const resultado = await edicionUsuario(usuario, usuario.id);
                            if(resultado.req.status === 200){
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: `${resultado.res.informacion}`,
                                    showConfirmButton: false,
                                    timer: 2000
                                });
                                setTimeout(() => {
                                    location.reload();
                                }, 2100);
                            }

                            if(resultado.req.status === 401){
                                
                                Swal.fire({
                                    position: 'top-end',
                                    icon: `${resultado.res.respuesta}`,
                                    title: `${resultado.res.informacion}, ${resultado.res.extra}`,
                                    showConfirmButton: false,
                                    timer: 2000
                                })

                                setTimeout(() => {
                                    localStorage.removeItem('informacion');
                                    window.location = 'sesion.html';
                                }, 2100);
                            }

                            if(resultado.req.status === 400){
                                Swal.fire({
                                    icon: 'error',
                                    title: `${resultado.res.respuesta}`,
                                    text: `${resultado.res.informacion}`
                                })
                            }

                        }
                      });

                }

            });

        }

    });

}