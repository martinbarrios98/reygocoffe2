import { validacionPago } from '../../consultas/v2/pagos.js';
import { validacionPedido } from '../../consultas/v2/creador_pedido.js';
import { obtenerUsuario } from '../../consultas/v2/consultas.js';
 
export async function validarPago (){
    const payerId = window.location.search.split('=')[3];
    const paymentId = window.location.search.split('&')[0].split('=')[1];
    const pedidoParse = JSON.parse(localStorage.getItem('pedido'));
    const { total, envio } = pedidoParse;
    const suma = (total+envio);
    const objeto ={
        payerId: payerId,
        paymentId: paymentId,
        total: suma
    }

    const resultado = await validacionPago(objeto);

    if(resultado.req.status === 200){

        const informacionCompra = resultado.res.payment;
        const { id, state, transactions } = informacionCompra;
        const { amount, create_time, transaction_fee} = transactions[0].related_resources[0].sale;
        const identificadorTransaccion = transactions[0].related_resources[0].sale.id;

        if(state){
            insertarEstadoPago(state, id);
        }

        //Inserccion a base de datos

        const pedidoParse = JSON.parse(localStorage.getItem('pedido'));
        let modo;
        if(pedidoParse.estado === 'Tabasco'){
            modo = 'Local'
        }else{
            modo = 'Foraneo'
        }
        const inforUsuario = await obtenerUsuario(pedidoParse.usuario.id);
        let direccion_texto;
        if(pedidoParse.usuario.direccion_extra === ''){
            direccion_texto = inforUsuario.direccion;
        }else{
            direccion_texto = pedidoParse.usuario.direccion_extra;
        }

        const objeto1 = {
            usuario: JSON.stringify(pedidoParse.usuario),
            estado_pedido: 'Pagado',
            fecha: create_time,
            total: pedidoParse.total,
            direccion: direccion_texto,
            referencias: pedidoParse.usuario.referencias,
            productos: JSON.stringify(pedidoParse.productos),
            postal: pedidoParse.postal,
            ciudad: pedidoParse.ciudad,
            estado: pedidoParse.estado,
            modalidad: modo,
            envio: pedidoParse.envio,
            id_transacion: identificadorTransaccion,
            comision_paypal: transaction_fee.value,
            peso: pedidoParse.peso
        }

        const resultado2 = await validacionPedido(objeto1);

        if(resultado2.res.respuesta === 'correcto'){
            localStorage.removeItem('pedido');
            localStorage.removeItem('carrito');
        }

    }
    
    if(resultado.req.status === 400){
        Swal.fire({
            icon: 'error',
            title: `${resultado.res.respuesta}`,
            text: `${resultado.res.informacion}`
        });
        setTimeout(() => {
            window.location = 'carrito.html';
        }, 600);
    }

}

async function insertarEstadoPago(estado, id){
        
    const contenedor = document.querySelector('.seccion-confirmacion-pago');

    const contenedorMensaje = document.createElement('div');
    const icono = document.createElement('i');
    const mensaje = document.createElement('p');
    const boton = document.createElement('a');
    boton.classList.add('boton');

    if(estado === 'approved'){
        contenedorMensaje.classList.add('exito', 'contenedor-mensaje');
        icono.classList.add('fas', 'fa-check-circle');
        mensaje.textContent = `Su compra fue realizada correctamente, se registro su compra con el ID ${id}`;
        boton.classList.add('boton-editar');
        boton.href = 'sesion_in.html';
        boton.textContent = 'Ir a mis pedidos';
    }else{
        contenedorMensaje.classList.add('error', 'contenedor-mensaje');
        icono.classList.add('fas', 'fa-window-close');
        mensaje.textContent = `Ocurrio un error durante su compra`;
        boton.classList.add('boton-eliminar');
        boton.href = 'carrito.html';
        boton.textContent = 'Volver a Carrito';
    }

    contenedorMensaje.appendChild(icono);
    contenedorMensaje.appendChild(mensaje);
    contenedorMensaje.appendChild(boton);

    contenedor.appendChild(contenedorMensaje);
}