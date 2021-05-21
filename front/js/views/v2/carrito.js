import { verificarLength } from '../../utilidades/verificaciones.js';
import { alertaNotificacion } from '../../emergentes/emergentes.js';
import { obtenerProducto, obtenerUsuario } from '../../consultas/v2/consultas.js';
import { validacionesPedido } from '../../validaciones/validaciones.js';
import { ventanaImagenMax } from '../../emergentes/emergentes.js';

const pedido = {
    productos:'',
    total: 0,
    usuario: {
        id: '',
        direccion_extra: '',
        referencias: ''
    },
    estado: '',
    ciudad: '',
    postal: ''
}

export async function insertarProductosCarrito(){

    const contenedor = document.querySelector('.contenido-carrito-compras');
    const resultado = await verificarLength(JSON.parse(localStorage.getItem('carrito')));

    if(resultado){

        const productos = JSON.parse(localStorage.getItem('carrito'));

        productos.forEach(async producto =>{
            
            const { id, cantidad, precio } = producto;
            const datos = await obtenerProducto(id);
            const { nombre, descripcion, url, categoria_nombre } = datos;

            //
            const contenedorProducto = document.createElement('div');
            contenedorProducto.classList.add('producto-carrito');
            contenedorProducto.dataset.idProducto = id;

            //Cantidad
            const contenedorCantidad = document.createElement('div');
            contenedorCantidad.classList.add('cantidad-carrito');
            contenedorCantidad.dataset.cantidad = cantidad;
            
            const iconoMenos = document.createElement('i');
            iconoMenos.classList.add('fas', 'fa-minus');

            const parrafoCantidad = document.createElement('p');
            parrafoCantidad.textContent = cantidad;

            const iconoMas = document.createElement('i');
            iconoMas.classList.add('fas', 'fa-plus');

            
            contenedorCantidad.appendChild(iconoMas);
            contenedorCantidad.appendChild(parrafoCantidad);
            contenedorCantidad.appendChild(iconoMenos);

            //Informacion

            const contenedorInformacion = document.createElement('div');
            contenedorInformacion.classList.add('informacion-carrito');

            const imagen = document.createElement('img');
            imagen.src = url;
            imagen.alt = `imagen-${nombre}`;

            const contenedorInformacionCarrito = document.createElement('div');
            contenedorInformacionCarrito.classList.add('informacion-especifica-carrito');
            
            const parrafoNombre = document.createElement('p');
            parrafoNombre.textContent = nombre;

            const parrafoDescripcion = document.createElement('p');
            parrafoDescripcion.textContent = descripcion;

            const parrafoPrecio = document.createElement('p');
            parrafoPrecio.textContent = `$ ${precio}`;

            contenedorInformacionCarrito.appendChild(parrafoNombre);
            contenedorInformacionCarrito.appendChild(parrafoDescripcion);
            contenedorInformacionCarrito.appendChild(parrafoPrecio);

            contenedorInformacion.appendChild(imagen);
            contenedorInformacion.appendChild(contenedorInformacionCarrito);

            //SubTotal

            const parrafoSubTotal = document.createElement('p');
            parrafoSubTotal.textContent = `$ ${parseFloat(cantidad*precio)}`;
            parrafoSubTotal.classList.add('subtotal');

            const close = document.createElement('p');
            close.textContent = 'x';
            close.classList.add('eliminar-carrito');

            //
            contenedorProducto.appendChild(contenedorCantidad);
            contenedorProducto.appendChild(imagen);
            contenedorProducto.appendChild(contenedorInformacion);
            contenedorProducto.appendChild(parrafoSubTotal);
            contenedorProducto.appendChild(close);

            contenedor.appendChild(contenedorProducto);

            iconoMas.onclick = e =>{sumarCantidad(e)};
            iconoMenos.onclick = e =>{restarCantidad(e)};
            close.onclick = e => {eliminarProducto(e)};
            imagen.onclick = e => {expandarImagen(e)};

        });
        
    }else{

        const parrafoDenegacion = document.createElement('p');
        parrafoDenegacion.innerHTML = `

            Tu carrito esta vacio
            <span>Hay muchos productos esperandote</span>

        `;

        contenedor.appendChild(parrafoDenegacion);
    }

}

export async function insertarTotalCarrito(){
    const resultado = await JSON.parse(localStorage.getItem('carrito'));
    const contenedor = document.querySelector('#total-compra');
    let suma = 0;

    resultado.forEach(async producto =>{
        suma += parseFloat(producto.cantidad*producto.precio);
        contenedor.textContent = `$ ${suma}`;
        contenedor.dataset.precioTotal = suma;
    });
}

export async function sumarCantidad(e){
    let identificador = parseInt(e.target.parentElement.parentElement.dataset.idProducto);
    let cantidad = parseInt(e.target.parentElement.dataset.cantidad);
    const carritoParse = await JSON.parse(localStorage.getItem('carrito'));
    //Buscamos el producto
    let found = carritoParse.find( producto => producto.id === identificador);
    found.cantidad = (cantidad+1);
    carritoParse.push(found);
    let carritoNuevo = new Set(carritoParse);
    let nuevoCarrito = [...carritoNuevo];
    localStorage.removeItem('carrito');
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    alertaNotificacion('Correcto', 'Se agrego correctamente otro mas', 'exito');
    setTimeout(() => {
        location.reload();
    }, 700);
}

export async function restarCantidad(e){
    let identificador = parseInt(e.target.parentElement.parentElement.dataset.idProducto);
    let cantidad = parseInt(e.target.parentElement.dataset.cantidad);
    const carritoParse =  await JSON.parse(localStorage.getItem('carrito'));
    let found = carritoParse.find( producto => producto.id === identificador);
    found.cantidad = (cantidad-1);

    if(found.cantidad === 0){
        const nuevoCarro = carritoParse.filter(producto => producto.id !== identificador);
        localStorage.removeItem('carrito');
        localStorage.setItem('carrito', JSON.stringify(nuevoCarro));
        alertaNotificacion('Correcto', 'Se elimino correctamente otro mas', 'exito');
        setTimeout(() => {
            location.reload();
        }, 700);
        return;
    }

    carritoParse.push(found);
    let carritoNuevo = new Set(carritoParse);
    let nuevoCarrito = [...carritoNuevo];
    localStorage.removeItem('carrito');
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    alertaNotificacion('Correcto', 'Se elimino correctamente otro mas', 'exito');
    setTimeout(() => {
        location.reload();
    }, 700);
}

export async function eliminarProducto(e){
    const identificador = parseInt(e.target.parentElement.dataset.idProducto);
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    const nuevoCarrito = carrito.filter(producto => producto.id !== identificador);
    Swal.fire({
        title: 'Estas segur@?',
        text: "Se eliminara este producto de tu lista!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar producto!'
      }).then((result) => {
        if (result.isConfirmed) {
            

            localStorage.removeItem('carrito');
            localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
            location.reload();

        }
      });
}

export async function insertarInformacionUsuario(){
    const informacion = localStorage.getItem('sesion_in');
    const informacionParse = JSON.parse(informacion);
    const contenedor = document.querySelector('.mi-informacion');
    const estados = document.querySelector('.estado-envio');

    if(informacion){

        const { id } = informacionParse.usuario;
        const usuario = await obtenerUsuario(id);
        const { nombre, apellido, direccion, telefono } = usuario;

        const parrafoNombre = document.createElement('p');
        parrafoNombre.textContent = `${nombre} ${apellido}`;

        const parrafoDireccion = document.createElement('p');
        parrafoDireccion.textContent = direccion;

        const parrafoTelefono = document.createElement('p');
        parrafoTelefono.textContent = telefono;

        contenedor.appendChild(parrafoNombre);
        contenedor.appendChild(parrafoDireccion);
        contenedor.appendChild(parrafoTelefono);

    }else{

        estados.style.display = 'none';
        const parrafoDenegacion = document.createElement('p');
        parrafoDenegacion.innerHTML = `

            No has iniciado sesion ingresa para poder completa tu compra

        `;

        contenedor.appendChild(parrafoDenegacion);

    }
}

export async function botonDireccionExtra(){
    const boton = document.querySelector('#mostrar-direccion');
    boton.addEventListener('click', async e=>{

        document.querySelector('.contenedor-direccion-extra div').style.display = 'flex';


    });
}

export async function agregarPedido(){
    const boton = document.querySelector('#comprar');
    const resultado = await validacionesPedido(pedido);
    const informacion = JSON.parse(localStorage.getItem('sesion_in'));
    const total = document.querySelector('#total-compra');
    boton.addEventListener('click', async e =>{

        if(e.target.id === 'comprar'){

            resultado.productos = JSON.stringify(localStorage.getItem('carrito'));
            resultado.usuario = informacion.usuario.id;
            resultado.total = parseInt(total.dataset.precioTotal);

            console.log(resultado);

        }

    });
}

export async function expandarImagen(e) {
    const url = e.target.src;
    ventanaImagenMax(url);
}