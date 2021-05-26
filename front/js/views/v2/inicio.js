import Swiper from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js';
import { verificarLength } from '../../utilidades/verificaciones.js';
import { obtenerUltimosProductos } from '../../consultas/v2/consultas.js';
import { agregarCarrito } from '../v2/productos.js';

export async function sliderPrincipal (){
    var swiper = new Swiper(".mySwiper", {
        spaceBetween: 30,
        effect: "fade",
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        autoplay: {
            delay: 5000,
        }
    });

    return swiper;

}

export async function insertarUltimosProductos(){

  const productos = await obtenerUltimosProductos();

  const estado = await verificarLength(productos);
    const contenedorProductos = document.querySelector('.ultimos-agregados');
    
    if(estado){

        productos.forEach( async producto =>{

            const { id, nombre, descripcion, url, precio, categoria, categoria_nombre } = producto;

            const contenedorProducto = document.createElement('div');
            contenedorProducto.classList.add('ultimo-agregado');
            contenedorProducto.id = id;
            contenedorProducto.dataset.productoPrecio = precio;

            const imagen = document.createElement('img');
            imagen.src = url;
            imagen.alt = `imagen-${nombre}`;

            const contenedorInformacion = document.createElement('div');
            contenedorInformacion.classList.add('informacion-agregado');

            const parrafoNombre = document.createElement('p');
            parrafoNombre.textContent = nombre;
            parrafoNombre.classList.add('nombre');

            const parrafoCategoria = document.createElement('p');
            parrafoCategoria.innerHTML = `<i class="fas fa-angle-right"></i> ${categoria_nombre}`;
            parrafoCategoria.classList.add('categoria-parrafo');

            const parrafoDescripcion = document.createElement('p');
            parrafoDescripcion.textContent = descripcion;
            parrafoDescripcion.classList.add('descripcion');

            const parrafoPrecio = document.createElement('p');
            parrafoPrecio.textContent = `$ ${precio}`;
            parrafoPrecio.classList.add('precio');

            const contenedorBoton = document.createElement('div');
            contenedorBoton.classList.add('contenedor-boton');

            const boton = document.createElement('button');
            boton.classList.add('boton', 'boton-normal');
            boton.id = 'agregar-carrito';
            boton.textContent = 'Agregar';
            contenedorBoton.appendChild(boton);

            contenedorInformacion.appendChild(parrafoNombre);
            contenedorInformacion.appendChild(parrafoCategoria);
            contenedorInformacion.appendChild(parrafoDescripcion);
            contenedorInformacion.appendChild(parrafoPrecio);
            contenedorInformacion.appendChild(contenedorBoton);

            contenedorProducto.appendChild(imagen);
            contenedorProducto.appendChild(contenedorInformacion);

            contenedorProductos.appendChild(contenedorProducto);

        });

        agregarCarrito();

    }else{
        const parrafoDenegacion = document.createElement('p');
        parrafoDenegacion.textContent = 'No hay elementos insertados';
        contenedorProductos.appendChild(parrafoDenegacion);
    }


}