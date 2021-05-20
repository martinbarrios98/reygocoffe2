import { alertaNotificacion } from '../emergentes/emergentes.js';
import { descargarDatosCategorias, descargarDatosProductos } from '../consultas/consultas.js';

export async function insertarCategorias () {

    const categorias = await descargarDatosCategorias();
    const contenedorCategorias = document.querySelector('.categorias');


    categorias.forEach( async categoria => {

        const { id, nombre } = categoria;

        const contenedorCategoria = document.createElement('div');
        contenedorCategoria.classList.add('categoria');
        contenedorCategoria.id = id;
        contenedorCategoria.dataset.nombreCategoria = nombre;

        const parrafoNombre = document.createElement('p');
        parrafoNombre.textContent = nombre;

        contenedorCategoria.appendChild(parrafoNombre);

        contenedorCategorias.appendChild(contenedorCategoria);

    });

    const close = document.createElement('p');
    close.innerHTML = '<i class="fa fa-times-circle" aria-hidden="true"></i>';
    close.id ='cerrar-movil';

    contenedorCategorias.appendChild(close);

}

export async function insertarProductos (){

    const productos = await descargarDatosProductos();
    const btnCategorias = document.querySelectorAll('.categoria');
    const contenedorProductos = document.querySelector('.productos');
    const encabezado = document.querySelector('#nombre-categoria-encabezado');

    btnCategorias.forEach(async btnCategoria =>{
        btnCategoria.addEventListener('click', e =>{

            let nombreCategoria = '';

            if(e.target.tagName === 'DIV'){
                nombreCategoria = e.target.dataset.nombreCategoria;
            }
            if(e.target.tagName === 'P'){
                nombreCategoria = e.target.textContent;
            }

            if(document.querySelector('.producto')){
                const resultados = document.querySelectorAll('.producto');

                resultados.forEach( async resultado =>{
                    resultado.remove();
                })
            }

            encabezado.textContent = nombreCategoria;

            productos.forEach( async producto => {

                const { nombre, precio, descripcion, categoria, id, url, sabor } = producto;

                if(categoria === nombreCategoria){

                    const contenedorProducto = document.createElement('div');
                    contenedorProducto.classList.add('producto', 'sombra');
                    contenedorProducto.id = id;

                    const imagen = document.createElement('img');
                    imagen.src = `front/public/img/${url}`;

                    const parrafoNombre = document.createElement('p');
                    parrafoNombre.textContent = nombre;
                    parrafoNombre.classList.add('nombre-producto');

                    const parrafoSabor = document.createElement('p');
                    parrafoSabor.innerHTML = `<i class="fa fa-magic" aria-hidden="true"></i> ${sabor}`;
                    parrafoSabor.classList.add('sabor-producto');

                    const parrafoDescripcion = document.createElement('p');
                    parrafoDescripcion.textContent = descripcion;
                    parrafoDescripcion.classList.add('descripcion-producto');

                    const parrafoCategoria = document.createElement('p');
                    parrafoCategoria.innerHTML = `<i class="fa fa-coffee" aria-hidden="true"></i> ${categoria}`;
                    parrafoCategoria.classList.add('categoria-producto');

                    const parrafoPrecio = document.createElement('p');
                    parrafoPrecio.textContent = `$${precio}`;
                    parrafoPrecio.classList.add('precio-producto');

                    const button = document.createElement('button');
                    button.id = 'agregar-carrito';
                    button.textContent = 'Agregar a Carrito';
                    button.classList.add('btn', 'btn-negro');

                    contenedorProducto.appendChild(imagen);
                    contenedorProducto.appendChild(parrafoNombre);
                    contenedorProducto.appendChild(parrafoSabor);
                    contenedorProducto.appendChild(parrafoDescripcion);
                    contenedorProducto.appendChild(parrafoCategoria);
                    contenedorProducto.appendChild(parrafoPrecio);
                    contenedorProducto.appendChild(button);

                    contenedorProductos.appendChild(contenedorProducto);

                }

            });
    
        });
    })

}

export async function menuMovil (){

    const contenedorMenu = document.querySelector('.menu-movil');

    contenedorMenu.addEventListener('click', e =>{

        const cat = document.querySelector('.categorias');
        const body = document.querySelector('body');
        const cerrar = document.querySelector('#cerrar-movil');

        contenedorMenu.style.display = 'none';
        cat.style.display = 'block';
        cerrar.style.display = 'block';

        cerrar.addEventListener('click', e =>{

            contenedorMenu.style.display = 'block';
            cat.style.display = 'none';
            cerrar.style.display = 'none';

        });

    });

}