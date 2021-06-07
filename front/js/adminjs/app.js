import { insertarUltimosUsuarios, insertarUltimosPedidos, insertarContadores } from '../adminjs/views/principal.js';
import { insertarUsuarios } from '../adminjs/views/usuarios.js';
import{ insertarAdministradores, agregarAdministrador } from '../adminjs/views/administradores.js';
import { insertarProductos, insertarOptionCategorias, agregarProducto } from '../adminjs/views/produtos.js';
import { insertarPedidos, insertarOptionFecha } from './views/pedidos.js';
import { validacionesSesionAdmin } from '../validaciones/validaciones.js';
import { sesionAdministrador } from '../consultas/v2/sesion.js';

document.addEventListener('DOMContentLoaded', async e => {

    console.log('Documento cargado');
    if(window.location.pathname.split('/')[4] !== 'sesion_admin.html'){
        validarSesion();
        cerrarSesion();
        verInformacionSesion();
    }
    if(window.location.pathname.split('/')[4] === 'sesion_admin.html'){
        iniciarSesionAdmin();
    }

    if(window.location.pathname.split('/')[4] === 'principal.html'){

        insertarUltimosUsuarios();
        insertarUltimosPedidos();
        insertarContadores();

    }
    if(window.location.pathname.split('/')[4] === 'usuarios.html'){

        insertarUsuarios();

    }
    if(window.location.pathname.split('/')[4] === 'administradores.html'){

        insertarAdministradores();
        agregarAdministrador();

    }
    if(window.location.pathname.split('/')[4] === 'productos-categorias.html'){

        
        insertarOptionCategorias();
        insertarProductos();
        agregarProducto();

    }
    if(window.location.pathname.split('/')[4] === 'pedidos.html'){

        
        insertarPedidos();
        insertarOptionFecha();

    }

});


async function validarSesion(){

    const sesion = localStorage.getItem('sesion_in_admin');

    if(!sesion){    

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No tienes los permisos necesarios!'
        });
        setTimeout(() => {
            window.location = 'sesion_admin.html';
        }, 1200);

    }

}

async function iniciarSesionAdmin(){

    const boton = document.querySelector('#ingresar');
    const admin = await validacionesSesionAdmin();

    boton.addEventListener('click', e => {

        Swal.fire({
            title: 'Estas segur@?',
            text: "Iniciaras sesion al confirmar esta accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, ingresar a la plataforma!'
          }).then(async (result) => {
            if (result.isConfirmed) {

                const resultado = await sesionAdministrador(admin);
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
                    localStorage.setItem('sesion_in_admin', JSON.stringify(informacion));
                    setTimeout(() => {
                        window.location = 'principal.html';
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

    });

}

async function cerrarSesion(){

    const body = document.querySelector('body');
    const boton = document.createElement('button');
    boton.classList.add('boton', 'boton-normal', 'fixed');
    boton.id = 'cerrar-sesion';
    boton.textContent = 'Cerrar sesion';

    body.appendChild(boton);

    boton.addEventListener('click', e =>{

        Swal.fire({
            title: 'Estas segur@?',
            text: "Se cerrara tu sesion al confirmar esta accion",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, cerrar mi sesion!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Correto!',
                    'Se cerro correctamente tu sesion',
                    'success'
                );
                localStorage.removeItem('sesion_in_admin');
                setTimeout(() => {
                    window.location = 'sesion_admin.html';
                }, 1300);

            }
        })

    });

}

async function verInformacionSesion(){

    const informacion = JSON.parse(localStorage.getItem('sesion_in_admin'));
    const administrador = informacion.usuario; 
    const body = document.querySelector('body');
    const boton = document.createElement('button');
    boton.classList.add('boton', 'boton-editar', 'fixed-admin');
    boton.id = 'ver-sesion';
    boton.textContent = 'Ver mi informacion';

    body.appendChild(boton);

    boton.addEventListener('click', e =>{

        console.log(administrador);

        Swal.fire({
            title: `${administrador.nombre}`,
            text: `${administrador.correo}`,
            imageUrl: `${administrador.url}`,
            imageWidth: 250,
            imageHeight: 200,
            imageAlt: `imagen-${administrador.nombre}`
        });

    });

}