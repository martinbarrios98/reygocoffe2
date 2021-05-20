import { inicio, descargarCategorias } from '../../consultas/v2/consultas.js';
import { verificarLength } from '../../utilidades/verificaciones.js';


export async function verCategorias(){

    const categorias = await descargarCategorias();
    const estado = await verificarLength(categorias);
    const contenedorCategorias = document.querySelector('.contenedor-categorias');

    if(estado){

        categorias.forEach(async categoria => {
            
            const { id, nombre, url } = categoria;

            const contenedorCategoria = document.createElement('div');
            contenedorCategoria.classList.add('categoria');
            contenedorCategoria.id = id;

            const imagen = document.createElement('img');
            imagen.src = url;
            imagen.alt = `imagen-${nombre}`;

            const parrafoNombre = document.createElement('p');
            parrafoNombre.textContent = nombre;

            contenedorCategoria.appendChild(imagen);
            contenedorCategoria.appendChild(parrafoNombre);

            contenedorCategorias.appendChild(contenedorCategoria);

        });

    }else{
        const parrafoDenegacion = document.createElement('p');
        parrafoDenegacion.textContent = 'No hay elementos insertados';
        contenedorCategorias.appendChild(parrafoDenegacion);
    }

    desplegarProductosVentana();
    

}

async function desplegarProductosVentana(){

    const botones = document.querySelectorAll('.categoria');

    botones.forEach( async boton =>{

        boton.addEventListener('click', async e =>{

            let identificador = '';

            if(e.target.tagName === 'DIV'){
                identificador = parseInt(e.target.id); 
            }else{
                identificador = parseInt(e.target.parentElement.id);
            }

            window.location = `productos.html?identificador=${identificador}`;

        });

    });

}