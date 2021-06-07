import { alertaNotificacion } from '../../emergentes/emergentes.js';
import { validacionesUsuario, validacionesSesion } from '../../validaciones/validaciones.js';
import { creacionUsuario } from '../../consultas/v2/creador.js';
import { sesionUsuario } from '../../consultas/v2/sesion.js';
import { obtenerUsuarios } from '../../consultas/v2/consultas.js';


export async function crearUsuario(){

    const arregloUsuarios = await obtenerUsuarios();
    const boton = document.querySelector('#agregar');
    const usuario = await validacionesUsuario();

    boton.addEventListener('click', async e =>{

        if(e.target.id === 'agregar'){

            e.preventDefault();
            let validacion = true;

            arregloUsuarios.forEach(async user => {
                if(user.correo === usuario.correo){
                    validacion = false;
                }
            });

            if(!validacion || validacion === false){
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: `Ya se encuentre registrado este correo`,
                    showConfirmButton: false,
                    timer: 2000
                });
                return;
            }
            
            Swal.fire({
                title: 'Estas seguro de realizar esta accion?',
                text: "Se creara tu registro!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, crear mi perfil!'
              }).then(async (result) => {
                if (result.isConfirmed) {
                    const resultado = await creacionUsuario(usuario);
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

export async function IniciarSesion(){

    const boton = document.querySelector('#iniciar');
    const usuario = await validacionesSesion();

    boton.addEventListener('click', async e =>{

        if(e.target.id === 'iniciar'){
            e.preventDefault();
            Swal.fire({
                title: 'Estas segura de iniciar sesion?',
                text: "Se iniciara tu sesion al confirmar!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, iniciar sesion!'
              }).then(async result => {
                if (result.isConfirmed) {
                    const resultado = await sesionUsuario(usuario);
                    if(resultado.req.status === 200){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: `${resultado.res.informacion}`,
                            showConfirmButton: false,
                            timer: 2000
                        });
                        const informacion = {
                            usuario: resultado.res.resultado,
                            token: resultado.res.token

                        }
                        localStorage.setItem('sesion_in', JSON.stringify(informacion));
                        setTimeout(() => {
                            window.location = 'sesion_in.html';
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
              })

        }

    });

}

