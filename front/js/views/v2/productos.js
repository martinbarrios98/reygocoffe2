import { inicio, descargarProductos, descargarProductosCat, descargarCategoria } from '../../consultas/v2/consultas.js';
import { verificarLength } from '../../utilidades/verificaciones.js';
import { alertaNotificacion } from '../../emergentes/emergentes.js';

let carrito = [];

let producto = {
    id: '',
    cantidad: '',
    precio: ''
}

export async function insertarProductos (){

    const identificador = parseInt(window.location.search.split('=')[1]);
    const productos = await descargarProductosCat( identificador );
    const estado = await verificarLength(productos);
    const contenedorProductos = document.querySelector('.contenedor-productos');
    
    if(estado){

        let idCat = '';

        productos.forEach( async producto =>{

            const { id, nombre, descripcion, url, precio, categoria, categoria_nombre } = producto;
            idCat = categoria;

            const contenedorProducto = document.createElement('div');
            contenedorProducto.classList.add('contenedor-producto');
            contenedorProducto.id = id;
            contenedorProducto.dataset.productoPrecio = precio;

            const imagen = document.createElement('img');
            imagen.src = url;
            imagen.alt = `imagen-${nombre}`;

            const contenedorInformacion = document.createElement('div');
            contenedorInformacion.classList.add('informacion-producto');

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

        informacionCatProducto(idCat);
        agregarCarrito();

    }else{
        const parrafoDenegacion = document.createElement('p');
        parrafoDenegacion.textContent = 'No hay elementos insertados';
        contenedorProductos.appendChild(parrafoDenegacion);
    }

}

export async function informacionCatProducto (identificador){

    const categoria = await descargarCategoria( identificador );
    const parrafoCatNombre = document.querySelector('#categoria-nombre');
    const contenedorInformacionCate = document.querySelector('.contenedor-informacion-categoria');

    const { id, nombre, url } = categoria;
    parrafoCatNombre.textContent = nombre;

    const imagen = document.createElement('img');
    imagen.src = url;
    imagen.alt = `imagen-${nombre}`;

    const parrafoCate = document.createElement('p');
    if(nombre === 'Esencias Gialini'){
        parrafoCate.textContent = `

        Perfectos para disolver en bebidas y postres, cuidando siempre el delicioso sabor. Los puedes usar en:
        • Tés 
        • Frappés 
        • Coctelería 
        • Repostería
        `;
    }
    if(nombre === 'Polvos y Bases'){
        parrafoCate.textContent =`

        La marca Zaachila® se especializa en bebidas llenas de textura y delicioso sabor fáciles de preparar.
        Impulsados por el esfuerzo y tradición de manos mexicanas que buscan crear grandes sabores, texturas y aromas que enamoren paladares.

        `;
    }
    if(nombre === 'Zaate'){
        parrafoCate.textContent = `

        Son deliciosas bebidas base de té en polvo con ingredientes funcionales y exóticos sabores refrescantes, conoce las líneas An Tea Ox, Probio Tea e Inmuno Tea que te ayudan a llevar un estilo de vida saludable.

        `;
    }
    if(nombre === 'Café Tostado' || nombre === 'Café Verde' || nombre === 'Extractos Concentrados'){
        parrafoCate.textContent = `

        Somos familias productores aquí en los Altos de Chiapas, en una zona de nombre Tenejapa de la etnia Tzteltal, la producción de café es el principal medio de nuestro ingreso, cosechamos café de Altura entre los 1200 a 1600 MSNM cultivando de manera orgánica, ofrecemos en café Tostado Medio con las presentaciones de 1 kg, le damos los mejores cuidados para obtener café de calidad, seleccionando los mejores granos a mano.


        `;
    }
    if(nombre === 'Tisanas'){
        parrafoCate.textContent = `

        Las tisanas son bebidas hechas con frutos secos y hierbas. Se clasifican en frutales y herbales. Las tisanas frutales tiene una base de manzana y jamaica, que se combinan con diferentes frutos. Las tisanas herbales no tienen frutos deshidratados en esencia son hierbas y/o flores.


        `;
    }

    contenedorInformacionCate.appendChild(imagen);
    contenedorInformacionCate.appendChild(parrafoCate);


}

export async function agregarCarrito (){

    const botones = document.querySelectorAll('#agregar-carrito');

    botones.forEach(async boton =>{

        boton.addEventListener('click', async e =>{

            if(e.target.id === 'agregar-carrito'){
                e.preventDefault();
    
                let identificador = parseInt(e.target.parentElement.parentElement.parentElement.id);
                let precioProducto = e.target.parentElement.parentElement.parentElement.dataset.productoPrecio;
                let carritoLocal = localStorage.getItem('carrito');
    
                if(carritoLocal){

                    let carritoLocalParse = JSON.parse(carritoLocal);
                    const found = carritoLocalParse.find( valor => valor.id === identificador);

                    if(found){
                        alertaNotificacion('Ya existe', 'Ya agregaste este producto a tu carrito', 'error');
                        return;
                    }

                    carrito = carritoLocalParse;
                    producto.id = identificador;
                    producto.precio = precioProducto;
                    producto.cantidad = 1;
                    carrito.push(producto);
                    localStorage.removeItem('carrito');
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                    alertaNotificacion('Correcto', 'Se agrego correctamente al carrito', 'exito');
                    cantidadProductos();

                }else{
                    producto.id = identificador;
                    producto.cantidad = 1;
                    producto.precio = precioProducto;
                    carrito.push(producto);
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                    alertaNotificacion('Correcto', 'Se agrego correctamente al carrito', 'exito');
                    cantidadProductos();
                }
    
            }
    
        });

    });
    

}

export async function cantidadProductos (){

    const contenedor = document.querySelector('#cantidad-productos-carro');
    const carrito = localStorage.getItem('carrito')

    if(carrito){
        const carritoParse = JSON.parse(carrito).length;
        contenedor.innerHTML = carritoParse;
    }else{
        contenedor.innerHTML = 0;
    }

}