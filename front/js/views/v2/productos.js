import { inicio, descargarProductos, descargarProductosCat, descargarCategoria } from '../../consultas/v2/consultas.js';
import { verificarLength } from '../../utilidades/verificaciones.js';
import { alertaNotificacion } from '../../emergentes/emergentes.js';
import { expandarImagen } from '../../views/v2/carrito.js';
let carrito = [];

let producto = {
    id: '',
    cantidad: '',
    precio: '',
    peso: ''
}

export async function insertarProductos (){

    const identificador = parseInt(window.location.search.split('=')[1]);
    const productos = await descargarProductosCat( identificador );
    const estado = await verificarLength(productos);
    const contenedorProductos = document.querySelector('.contenedor-productos');
    
    if(estado){

        let idCat = '';

        productos.forEach( async producto =>{

            const { id, nombre, descripcion, url, precio, categoria, categoria_nombre, peso, disponibilidad } = producto;
            idCat = categoria;

            const contenedorProducto = document.createElement('div');
            contenedorProducto.classList.add('contenedor-producto');
            contenedorProducto.id = id;
            contenedorProducto.dataset.productoPrecio = precio;
            contenedorProducto.dataset.productoPeso = peso;

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

            const parrafoPeso = document.createElement('p');
            parrafoPeso.innerHTML = `<i class="fas fa-weight"></i> ${Number(peso)/1000}kg`;
            parrafoPeso.classList.add('peso');

            const parrafoPrecio = document.createElement('p');
            parrafoPrecio.textContent = `$ ${precio}`;
            parrafoPrecio.classList.add('precio');

            const parrafoDisponibilidad = document.createElement('p');
            parrafoDisponibilidad.innerHTML = `<i class="fas fa-chevron-right"></i>  ${disponibilidad}`;
            parrafoDisponibilidad.classList.add('disponibilidad');

            const contenedorBoton = document.createElement('div');
            contenedorBoton.classList.add('contenedor-boton');
            
            const boton = document.createElement('button');

            if(disponibilidad === 'disponible'){
                boton.id = 'agregar-carrito';
                boton.textContent = 'Agregar';
                contenedorBoton.appendChild(boton);
                boton.classList.add('boton', 'boton-normal');
            }else{
                boton.id = 'no-disponible';
                boton.textContent = 'No disponible';
                contenedorBoton.appendChild(boton);
                boton.classList.add('boton', 'boton-eliminar');
            }

            contenedorInformacion.appendChild(parrafoNombre);
            contenedorInformacion.appendChild(parrafoCategoria);
            contenedorInformacion.appendChild(parrafoDescripcion);
            contenedorInformacion.appendChild(parrafoPeso);
            contenedorInformacion.appendChild(parrafoPrecio);
            contenedorInformacion.appendChild(parrafoDisponibilidad);
            contenedorInformacion.appendChild(contenedorBoton);

            contenedorProducto.appendChild(imagen);
            contenedorProducto.appendChild(contenedorInformacion);

            contenedorProductos.appendChild(contenedorProducto);
            
            imagen.onclick = e => {expandarImagen(e)};

        });

        informacionCatProducto(idCat);
        agregarCarrito();
        mensajeNoDisponible();

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
    imagen.alt = `imagen-${nombre.trim()}`;

    const parrafoCate = document.createElement('p');
    if(nombre === 'Esencias Gialinni'){
        parrafoCate.textContent = `

        Prácticos y de gran versatilidad, se pueden usar como saborizante o salsa para decorar bebidas,
        pos tres y alimentos, el límite es tu imaginación. Son los únicos en el mercado que no necesitan
        refrigeración ni congelación
       
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
    if(nombre === 'Café Tostado'){
        parrafoCate.textContent = `

        En México contamos con poco más de 12 estados productores de café, entre los
        más conocidos están: Chiapas, Veracruz, y Oaxaca, logrando
        calidad extraordinaria al producir cafés de especialidad.
        Con nosotros podrás encontrar café de diferentes regiones y mezclas que harán la
        diferencia entre tu barra de café y todas las demás. Ofreciendo un café arabica con
        una mezcla de granos (tyoica, bourbon y caturra). logrando obtener una taza con
        trazabilidad de
        84.5 puntos, donde resaltan notas como achocolatado, frutales entre otras.


        `;
    }
    if(nombre === 'Café Verde '){
        parrafoCate.textContent = `

        Producido en los altos de Chiapas, en una zona de nombre tenejapa de la etnia tzeltal, donde su
        principal medio de ingreso es la producción del café, se cosecha a una altura que van de los 1200 a
        1600 msnm, cultivado de manera orgánica, seleccionando los mejores granos a mano por el
        caficultor Alonzo López y familia; Dándonos así los mejores cuidados para obtener café de
        calidad.


        `;
    }
    if(nombre === 'Salsas Dulces y Extractos'){
        parrafoCate.textContent = `

        Extraordinario producto, por su versatilidad lo podemos utilizar de formas tan
        variadas y con grandes resultados que te invitamos a seguir descrubiendolas y
        compartiendo con nosotros, los grandes beneficios que esté producto nos brinda
        para tu negocio.
        Su uso va desde preparar un delicioso smoothie, pasando por la decoración de
        postres, diversos platillos, hasta su aplicación en bebidas moleculares, rellenos en
        pastelería, endulzante de nieves a base de yogurt, etc., etc.


        `;
    }
    if(nombre === 'Tisanas y Té'){
        parrafoCate.textContent = `

        Las tisanas son bebidas hechas con frutos secos y hierbas. Se clasifican en frutales y herbales. Las tisanas frutales tiene una base de manzana y jamaica, que se combinan con diferentes frutos. Las tisanas herbales no tienen frutos deshidratados en esencia son hierbas y/o flores.


        `;
    }

    
    const campo = document.createElement('div');
    campo.classList.add('campo');

    const label = document.createElement('label');
    label.textContent = 'Seleccione los gramos que necesita :';

    const select = document.createElement('select');
    select.id = 'gramos';

    const option = document.createElement('option');
    option.value = '';
    option.textContent = 'Seleccione gramos ...';

    const option100 = document.createElement('option');
    option100.value = '100';
    option100.textContent = '100g';

    const option200 = document.createElement('option');
    option200.value = '200';
    option200.textContent = '200g';

    const option500 = document.createElement('option');
    option500.value = '500';
    option500.textContent = '500g';
    select.appendChild(option);
    select.appendChild(option100);
    select.appendChild(option200);
    select.appendChild(option500);

    campo.appendChild(label);
    campo.appendChild(select);

    contenedorInformacionCate.appendChild(imagen);
    contenedorInformacionCate.appendChild(parrafoCate);
    if(nombre === 'Tisanas y Té'){
        contenedorInformacionCate.appendChild(campo);
        select.addEventListener('input', e=>buscadorGramos(e));
    }


}

export async function agregarCarrito (){

    const botones = document.querySelectorAll('#agregar-carrito');

    botones.forEach(async boton =>{

        boton.addEventListener('click', async e =>{

            if(e.target.id === 'agregar-carrito'){
                e.preventDefault();
    
                let identificador = parseInt(e.target.parentElement.parentElement.parentElement.id);
                const pesoProducto = Number(e.target.parentElement.parentElement.parentElement.dataset.productoPeso);
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
                    producto.peso = pesoProducto;
                    carrito.push(producto);
                    localStorage.removeItem('carrito');
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                    alertaNotificacion('Correcto', 'Se agrego correctamente al carrito', 'exito');
                    cantidadProductos();

                }else{
                    producto.id = identificador;
                    producto.cantidad = 1;
                    producto.peso = pesoProducto;
                    producto.precio = precioProducto;
                    carrito.push(producto);
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                    alertaNotificacion('Correcto', 'Se agrego correctamente al carrito', 'exito');
                    cantidadProductos();
                }
    
            }else{

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No hay disponibles para este producto!'
                })

            }
    
        });

    });
    

}

export async function mensajeNoDisponible(){

    const botones = document.querySelectorAll('#no-disponible');

    botones.forEach(async boton =>{

        boton.addEventListener('click', e =>{

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No hay disponibles para este producto!'
            });

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

async function buscadorGramos(e){

    const productos = document.querySelectorAll('.contenedor-producto');
    const valorTexto = e.target.value.trim();
    const expresion = new RegExp(`${valorTexto}g`, "i");

    console.log(expresion);

    productos.forEach(producto => {

        producto.style.display = 'none';

        if(producto.childNodes[1].childNodes[2].textContent.replace(/\s/g, " ").search(expresion) != -1){
            producto.style.display = 'grid';
        }

    });

}