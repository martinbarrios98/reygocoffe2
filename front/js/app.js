import { insertarMapa } from './views/v1/contacto.js';
//import { insertarCategorias, menuMovil, insertarProductos } from './views/productos.js';
//import { insertarInformacion } from './views/terminos.js';
import { sliderPrincipal, insertarUltimosProductos } from './views/v2/inicio.js';
import { verCategorias} from './views/v2/catalogo.js';
import { insertarProductos, cantidadProductos, agregarCarrito } from './views/v2/productos.js';
import { crearUsuario, IniciarSesion } from './views/v2/sesion.js';
import { validarSesionIniciada, iconoSesionIniciada, cerrarSesion } from './views/v2/sesion_in.js';
import { insertarProductosCarrito, insertarTotalCarrito, insertarInformacionUsuario,agregarPedido, botonDireccionExtra } from './views/v2/carrito.js';

document.addEventListener('DOMContentLoaded', async e => {

    mobileMenu();
    iconoSesionIniciada();
    cantidadProductos();
    dirigirACarrito();
    scrollPrincipal();

    if(window.location.pathname.split('/')[1] === 'index.html'){
        sliderPrincipal();
        insertarUltimosProductos();
    }
    if(window.location.pathname.split('/')[3] === 'contacto.html'){
        insertarMapa();
    }
    if(window.location.pathname.split('/')[3] === 'terminos.html'){
        scrollNav();
    }
    if(window.location.pathname.split('/')[3] === 'catalogo.html'){
        verCategorias();
    }
    if(window.location.pathname.split('/')[3] === 'productos.html'){
        await insertarProductos();
        crearUsuario
    }
    if(window.location.pathname.split('/')[3] === 'sesion.html'){
        crearUsuario();
        IniciarSesion();
    }
    if(window.location.pathname.split('/')[3] === 'sesion_in.html'){
        validarSesionIniciada();
        cerrarSesion();
    }
    if(window.location.pathname.split('/')[3] === 'carrito.html'){
        await insertarProductosCarrito();
        insertarTotalCarrito();
        insertarInformacionUsuario();
        agregarPedido();
        botonDireccionExtra();
    }
});

async function mobileMenu (){

    const contenedorMenu = document.querySelector('#abrir-menu');
    const contenedorMenuCerrar = document.querySelector('#cerrar-menu');
    const nav = document.querySelector('.nav-principal');
    const body = document.querySelector('body');

    contenedorMenu.addEventListener('click', async e => {

        console.log(e.target.id);

        if(e.target.id === 'abrir-menu'){

            contenedorMenu.style.display = 'none';
            contenedorMenuCerrar.style.display = 'block';
            body.classList.add('bloquear');
            nav.classList.add('fixed');

            contenedorMenuCerrar.addEventListener('click', async e =>{
                contenedorMenu.style.display = 'block';
                contenedorMenuCerrar.style.display = 'none';
                body.classList.remove('bloquear');
                nav.classList.remove('fixed');
            });

        }

    });


}


function scrollNav(){
    const enlaces = document.querySelectorAll('.nav-terminos a');

    enlaces.forEach(function ( enlace ){
        enlace.addEventListener('click', e =>{
            e.preventDefault();
            const seccion = document.querySelector(e.target.attributes[0].value);
            seccion.scrollIntoView({
                behavior: 'smooth'
            });
        })
    })
}

function dirigirACarrito(){
    const icono = document.querySelector('.fa-shopping-cart');
    icono.addEventListener('click', e =>{
        if(window.location.pathname.split('/')[1] === 'index.html'){
            window.location = '/front/v2/carrito.html';
        }else{
            window.location = 'carrito.html';
        }
    })
}

function scrollPrincipal(){
    const enlace = document.querySelector('.contenedor-volver a');
    
    enlace.addEventListener('click', e =>{
        e.preventDefault();
        const seccion = document.querySelector(e.target.attributes[0].value);
        seccion.scrollIntoView({
            behavior: 'smooth'
        });
    })
}