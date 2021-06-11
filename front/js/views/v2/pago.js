import { verificarLength } from '../../utilidades/verificaciones.js';
import { alertaNotificacion } from '../../emergentes/emergentes.js';
import { obtenerProducto, obtenerUsuario } from '../../consultas/v2/consultas.js';
import { validacionesTarjeta } from '../../validaciones/validaciones.js';
import { accesoToken, crearPedido } from '../../consultas/v2/pagos.js';

export async function insertarInformacionPago(){

    if(!localStorage.getItem('pedido') || !localStorage.getItem('sesion_in')){
        window.location = 'carrito.html';
    }
    
    const contenedorTotal = document.querySelector('#total-compra');
    const contenedorNombreUsuario = document.querySelector('#nombre-usuario');
    const contenedorDireccionUsuario = document.querySelector('#direccion-usuario');
    const contenedorLocalidad = document.querySelector('#localidad-usuario');
    const contenedorPesoPedido = document.querySelector('#peso-pedido');
    const contenedorProductos = document.querySelector('.contenedor-detalles-compra');

    const pedido = JSON.parse(localStorage.getItem('pedido'));
    const { ciudad, estado, postal, productos, total, usuario, envio, peso } = pedido;
    const informacionUsuario = await obtenerUsuario(usuario.id);
    const { nombre, apellido, direccion } = informacionUsuario;
    if(envio === 0){
        contenedorTotal.textContent = `$${total} + $${envio} = $${total}.00`;
    }else{
        contenedorTotal.textContent = `$${total} + $${envio} = $${(total+envio)}.00`;
    }
    contenedorNombreUsuario.textContent = `${nombre} ${apellido}`;
    if(usuario.direccion_extra === ''){
        contenedorDireccionUsuario.textContent = `${direccion} - ${usuario.referencias}`;
    }else{
        contenedorDireccionUsuario.textContent = `${usuario.direccion_extra} - ${usuario.referencias}`;
    }
    contenedorLocalidad.textContent = `${ciudad}, ${estado} - Postal:${postal}`;
    contenedorPesoPedido.textContent = `Peso total productos: ${Number(peso)/1000} kg`;

    productos.forEach(async producto =>{

        const { id, precio, cantidad } = producto;

        const informacionProducto = await obtenerProducto(id);

        const contenedorProducto = document.createElement('div');
        contenedorProducto.classList.add('info-producto');

        const imagen = document.createElement('img');
        imagen.src = informacionProducto.url;
        imagen.alt = `imagen-${informacionProducto.nombre}`;

        const contenedorDetalle = document.createElement('div');
        contenedorDetalle.classList.add('detalle');

        const nombreProducto = document.createElement('p');
        nombreProducto.textContent = informacionProducto.nombre;

        const cantidadProducto = document.createElement('p');
        cantidadProducto.textContent = `${cantidad}x`;

        const precioProducto = document.createElement('p');
        precioProducto.textContent = `$${precio}`;

        contenedorDetalle.appendChild(nombreProducto);
        contenedorDetalle.appendChild(cantidadProducto);
        contenedorDetalle.appendChild(precioProducto);

        contenedorProducto.appendChild(imagen);
        contenedorProducto.appendChild(contenedorDetalle);

        contenedorProductos.appendChild(contenedorProducto);

    });


}

export async function pagarPedido (){

    const boton = document.querySelector('#pagar');
    //const tarjeta = await validacionesTarjeta();

    boton.addEventListener('click', async e =>{

        e.preventDefault();

        if(e.target.id === 'pagar'){
            
            Swal.fire({
                title: 'Estas segur@?',
                text: "Se procedera a realizar el pago!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Pagar!'
              }).then(async (result) => {
                if (result.isConfirmed) {

                    const objeto = {
                        pedido: localStorage.getItem('pedido')
                    }

                    Swal.fire({
                        position: 'top-end',
                        icon: 'info',
                        title: 'Validando pago, espere un momento porfavor ...',
                        showConfirmButton: false,
                        timer: 3000
                    });

                    const resultado = await crearPedido(objeto);
                    console.log(resultado);
                    const { res } = resultado;

                    const { links } = res.payment;

                    links.forEach(async elemento =>{

                        if(elemento.rel === 'approval_url'){
                            window.location = elemento.href;
                        }

                    });

                }
            })

        }

    });

}