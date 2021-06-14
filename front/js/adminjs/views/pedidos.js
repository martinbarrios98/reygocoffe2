import { obtenerFechasPedido, obtenerPedido, obtenerPedidos } from "../../consultas/v2/consultas.js";
import { edicionPedido } from "../../consultas/v2/editor.js";
import { ventanaEditarPedido, ventanaProductos } from "../../emergentes/ventanas.js";
import { validacionesPedidoEditar } from "../../validaciones/validaciones.js";


export async function insertarPedidos(){

    const contenedor = document.querySelector('.contenedor-pedidos-registrados');
    const req = await obtenerPedidos();
    const pedidos = await req.pedidos;
    insertarIngresosComisiones( pedidos );

    if(pedidos){
        pedidos.forEach(async pedido =>{

            const { id, ciudad, estado, comision_paypal, id_transacion, envio, total, estado_pedido, fecha, numero_guia, paqueteria, postal, referencias, usuario, productos, direccion, modalidad, peso } = pedido;
    
            const contenedorPedido = document.createElement('div');
            contenedorPedido.classList.add('contenedor-pedido');
            contenedorPedido.dataset.idPedido = id;
    
            //Detalles Informacion Usuario
            const contenedorInformacionUsuario = document.createElement('div');
            contenedorInformacionUsuario.classList.add('informacion-usuario');
    
            const parrafoNombre = document.createElement('p');
            parrafoNombre.textContent = `${usuario.informacionUsuario.nombre} ${usuario.informacionUsuario.apellido}`;
    
            const parrafoCorreo = document.createElement('p');
            parrafoCorreo.textContent = `${usuario.informacionUsuario.correo}`;
    
            const parrafoTelefono = document.createElement('p');
            parrafoTelefono.textContent = `${usuario.informacionUsuario.telefono}`;
    
            contenedorInformacionUsuario.appendChild(parrafoNombre);
            contenedorInformacionUsuario.appendChild(parrafoCorreo);
            contenedorInformacionUsuario.appendChild(parrafoTelefono);
    
            //Detalles Informacion Entrega
    
            const contenedorInformacionEntrega = document.createElement('div');
            contenedorInformacionEntrega.classList.add('informacion-entrega');
    
            const parrafoLocalidad = document.createElement('p');
            parrafoLocalidad.textContent = `${estado}-${ciudad}-${modalidad}`;
    
            const parrafoDireccion = document.createElement('p');
            parrafoDireccion.textContent = `${direccion} #${postal}`;
    
            const parrafoReferencias = document.createElement('p');
            parrafoReferencias.textContent = referencias;
    
            contenedorInformacionEntrega.appendChild(parrafoLocalidad);
            contenedorInformacionEntrega.appendChild(parrafoDireccion);
            contenedorInformacionEntrega.appendChild(parrafoReferencias);
    
            //Detalles Informacion Pago 
    
            const contenedorInformacionPago = document.createElement('div');
            contenedorInformacionPago.classList.add('informacion-pago');
    
            const parrafoTotal = document.createElement('p');
            parrafoTotal.textContent = `Total: $${parseInt(total)+parseInt(envio)}.00`;
    
            const parrafoComision = document.createElement('p');
            parrafoComision.textContent = `Comision: $${comision_paypal}`;
    
            const parrafoTransacion = document.createElement('p');
            parrafoTransacion.textContent = `Id: ${id_transacion}`;
    
            const parrafoEnvio = document.createElement('p');
            parrafoEnvio.textContent = `Envio: $${envio}`;
    
            contenedorInformacionPago.appendChild(parrafoTotal);
            contenedorInformacionPago.appendChild(parrafoComision);
            contenedorInformacionPago.appendChild(parrafoEnvio);
            contenedorInformacionPago.appendChild(parrafoTransacion);
    
            //Detalles Informacion Envio
    
            const contenedorInformacionEnvio = document.createElement('div');
            contenedorInformacionEnvio.classList.add('informacion-envio');
    
            const parrafoFecha = document.createElement('p');
            parrafoFecha.textContent = `${fecha.split('T')[0]}`;
    
            const parrafoEstadoPedido = document.createElement('p');
            parrafoEstadoPedido.textContent = estado_pedido;
    
            const parrafoGuia = document.createElement('p');
            parrafoGuia.textContent = `#${numero_guia} - Paqueteria:${paqueteria}`;
    
            contenedorInformacionEnvio.appendChild(parrafoFecha);
            contenedorInformacionEnvio.appendChild(parrafoEstadoPedido);
            contenedorInformacionEnvio.appendChild(parrafoGuia);
    
            //Detalles Informacion Productos
    
            const contenedorInformacionProducto = document.createElement('div');
            contenedorInformacionProducto.classList.add('informacion-producto');
    
            const parrafoProductos = document.createElement('p');
            parrafoProductos.textContent = `${productos.length} productos listados - ${Number(peso)/1000}kg`;
    
            const botonVerListaProductos = document.createElement('button');
            botonVerListaProductos.type = 'button';
            botonVerListaProductos.id = 'ver-lista-productos';
            botonVerListaProductos.classList.add('boton', 'boton-normal');
            botonVerListaProductos.textContent = 'VER PRODUCTOS';
    
            contenedorInformacionProducto.appendChild(parrafoProductos);
            contenedorInformacionProducto.appendChild(botonVerListaProductos);
    
            //BOTONES
    
            const contenedorBotones = document.createElement('div');
            contenedorBotones.classList.add('contenedor-boton');
    
            const botonEditar = document.createElement('button');
            botonEditar.type = 'button';
            botonEditar.id = 'editar';
            botonEditar.textContent = 'EDITAR';
            botonEditar.classList.add('boton', 'boton-editar');
    
            contenedorBotones.appendChild(botonEditar);
    
            contenedorPedido.appendChild(contenedorInformacionUsuario);
            contenedorPedido.appendChild(contenedorInformacionEntrega);
            contenedorPedido.appendChild(contenedorInformacionPago);
            contenedorPedido.appendChild(contenedorInformacionEnvio);
            contenedorPedido.appendChild(contenedorInformacionProducto);
            contenedorPedido.appendChild(contenedorBotones);
    
            contenedor.appendChild(contenedorPedido);
    
            botonVerListaProductos.onclick = e =>{ventanaProductos(productos)};
            botonEditar.onclick = e =>{editarPedido(pedido)};
    
        });
    
        buscadorPedidos();
    }else{

        const parrafoDenegacion = document.createElement('p');
        parrafoDenegacion.textContent = 'No hay pedidos realizados actualmente';

        contenedor.appendChild(parrafoDenegacion);

    }

}

async function insertarIngresosComisiones( objeto ){

    let sumaIngreso = 0;
    let sumaComision = 0;
    const parrafoIngreso = document.querySelector('#ingreso');
    const parrafoComision = document.querySelector('#comision');

    if(objeto){
        objeto.forEach(async pedido =>{
            const { total, envio, comision_paypal } = pedido;
            sumaIngreso += parseInt(total)+parseInt(envio);
            sumaComision += parseFloat(comision_paypal);
    
            parrafoIngreso.textContent = `$${sumaIngreso}.00`;
            parrafoComision.textContent = `$${sumaComision}`;
        });
    }else{
        parrafoIngreso.textContent = `$0.00`;
        parrafoComision.textContent = `$0.00`;
    }

}

async function editarPedido( objeto ){

    const botonEditar = await ventanaEditarPedido(objeto);
    const objetoFinal = await validacionesPedidoEditar(objeto);
    const identificador = parseInt(objeto.id);
    
    botonEditar.addEventListener('click', e =>{

        e.preventDefault();

        Swal.fire({
            title: 'Estas segur@ de relizar esta accion?',
            text: "Se editara un pedido al confirmar esta accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, editar pedido!'
        }).then(async (result) => {
            if (result.isConfirmed) {

                const resultado = await edicionPedido(objetoFinal, identificador);
                if(resultado.req.status === 200){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${resultado.res.informacion}`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                    setTimeout(() => {
                        location.reload();
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
        })
          

    });

}

export async function insertarOptionFecha(){
    const fechas = await obtenerFechasPedido();
    const contenedor = document.querySelector('#fecha-pedido');
    if(fechas){
        fechas.forEach(async fecha =>{
    
            const option = document.createElement('option');
            option.value = fecha;
            option.textContent = fecha;
            contenedor.appendChild(option);
        });
        filtradorFecha();
    }
}

async function filtradorFecha(){

    const selectFecha = document.querySelector('#fecha-pedido');
    const pedidos = document.querySelectorAll('.contenedor-pedido');

    selectFecha.addEventListener('input', e =>{

        if(e.target.value === ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Seleccione una fecha!'
            });
        }else if(e.target.value === 'all'){

            pedidos.forEach(async pedido =>{

                pedido.style.display = 'grid'; 

            });

        }else{

            const fecha = e.target.value.trim();

            pedidos.forEach(async pedido =>{

                pedido.style.display = 'none';  

                if(pedido.childNodes[3].childNodes[0].textContent.replace(/\s/g, " ").search(fecha) != -1){
                    pedido.style.display = 'grid';
                }

            });


        }

    });

}

export async function buscadorPedidos(){

    const usuarios = document.querySelectorAll('.contenedor-pedido');
    const inputBuscador = document.querySelector('#buscador');
    const buscadorBoton = document.querySelector('#buscador-boton');

    inputBuscador.addEventListener('keypress', e =>{

        const texto = e.target.value.trim();
        const expresion = new RegExp(`${texto}g`, "i");

        if(e.keyCode === 13){

            if(texto === ''){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ingresa un valor para buscar!'
                });
            }else{

                usuarios.forEach(usuario => {
    
                    usuario.style.display = 'none';
    
                    if(usuario.childNodes[0].childNodes[0].textContent.replace(/\s/g, " ").search(texto) != -1){
                        usuario.style.display = 'grid';
                    }
                    if(usuario.childNodes[0].childNodes[1].textContent.replace(/\s/g, " ").search(texto) != -1){
                        usuario.style.display = 'grid';
                    }
                    if(usuario.childNodes[0].childNodes[2].textContent.replace(/\s/g, " ").search(texto) != -1){
                        usuario.style.display = 'grid';
                    }

                    if(usuario.childNodes[1].childNodes[0].textContent.replace(/\s/g, " ").search(texto) != -1){
                        usuario.style.display = 'grid';
                    }
                    if(usuario.childNodes[1].childNodes[1].textContent.replace(/\s/g, " ").search(texto) != -1){
                        usuario.style.display = 'grid';
                    }
                    if(usuario.childNodes[1].childNodes[2].textContent.replace(/\s/g, " ").search(texto) != -1){
                        usuario.style.display = 'grid';
                    }

                    if(usuario.childNodes[2].childNodes[0].textContent.replace(/\s/g, " ").search(texto) != -1){
                        usuario.style.display = 'grid';
                    }
                    if(usuario.childNodes[2].childNodes[1].textContent.replace(/\s/g, " ").search(texto) != -1){
                        usuario.style.display = 'grid';
                    }
                    if(usuario.childNodes[2].childNodes[2].textContent.replace(/\s/g, " ").search(texto) != -1){
                        usuario.style.display = 'grid';
                    }

                    if(usuario.childNodes[3].childNodes[0].textContent.replace(/\s/g, " ").search(texto) != -1){
                        usuario.style.display = 'grid';
                    }
                    if(usuario.childNodes[3].childNodes[1].textContent.replace(/\s/g, " ").search(texto) != -1){
                        usuario.style.display = 'grid';
                    }
                    if(usuario.childNodes[3].childNodes[2].textContent.replace(/\s/g, " ").search(texto) != -1){
                        usuario.style.display = 'grid';
                    }
            
                });
            }

        }

    });

    inputBuscador.addEventListener('input', e => {
        if(e.target.value === ''){
            usuarios.forEach(usuario => {

                usuario.style.display = 'grid';
        
            });
        }
    });

    buscadorBoton.addEventListener('click', e =>{

        if(inputBuscador.value === ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ingresa un valor para buscar!'
            });
        }else{

            const texto = inputBuscador.value.trim();

            usuarios.forEach(usuario => {
    
                usuario.style.display = 'none';

                if(usuario.childNodes[0].childNodes[0].textContent.replace(/\s/g, " ").search(texto) != -1){
                    usuario.style.display = 'grid';
                }
                if(usuario.childNodes[0].childNodes[1].textContent.replace(/\s/g, " ").search(texto) != -1){
                    usuario.style.display = 'grid';
                }
                if(usuario.childNodes[0].childNodes[2].textContent.replace(/\s/g, " ").search(texto) != -1){
                    usuario.style.display = 'grid';
                }

                if(usuario.childNodes[1].childNodes[0].textContent.replace(/\s/g, " ").search(texto) != -1){
                    usuario.style.display = 'grid';
                }
                if(usuario.childNodes[1].childNodes[1].textContent.replace(/\s/g, " ").search(texto) != -1){
                    usuario.style.display = 'grid';
                }
                if(usuario.childNodes[1].childNodes[2].textContent.replace(/\s/g, " ").search(texto) != -1){
                    usuario.style.display = 'grid';
                }

                if(usuario.childNodes[2].childNodes[0].textContent.replace(/\s/g, " ").search(texto) != -1){
                    usuario.style.display = 'grid';
                }
                if(usuario.childNodes[2].childNodes[1].textContent.replace(/\s/g, " ").search(texto) != -1){
                    usuario.style.display = 'grid';
                }
                if(usuario.childNodes[2].childNodes[2].textContent.replace(/\s/g, " ").search(texto) != -1){
                    usuario.style.display = 'grid';
                }

                if(usuario.childNodes[3].childNodes[0].textContent.replace(/\s/g, " ").search(texto) != -1){
                    usuario.style.display = 'grid';
                }
                if(usuario.childNodes[3].childNodes[1].textContent.replace(/\s/g, " ").search(texto) != -1){
                    usuario.style.display = 'grid';
                }
                if(usuario.childNodes[3].childNodes[2].textContent.replace(/\s/g, " ").search(texto) != -1){
                    usuario.style.display = 'grid';
                }
        
            });

        }
        
    });

}