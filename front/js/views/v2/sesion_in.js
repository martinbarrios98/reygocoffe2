import { alertaNotificacion } from '../../emergentes/emergentes.js';
import { ventanaUsuarioEditar } from '../../emergentes/ventanas.js';
import { validacionesUsuarioEditar } from '../../validaciones/validaciones.js';
import { edicionUsuario } from '../../consultas/v2/editor.js';
import { obtenerUsuario, obtenerPedidosUsuario } from '../../consultas/v2/consultas.js';
import { verificarLength } from '../../utilidades/verificaciones.js';


export async function iconoSesionIniciada(){
    const sesion = localStorage.getItem('sesion_in');
    const icono = document.querySelector('.fa-user');

    if(sesion){
        icono.classList.add('verde');
    }else{
        icono.classList.remove('verde');
    }
}

export async function validarSesionIniciada(){

    const sesion = localStorage.getItem('sesion_in');

    if(sesion){
        insertarInformacionUsuario();
    }else{
        window.location = 'sesion.html';
    }

}

export async function insertarInformacionUsuario(){

    const sesion = JSON.parse(localStorage.getItem('sesion_in'));
    const { usuario, token } = sesion;
    const user = await obtenerUsuario( usuario.id );
    const { id, nombre, apellido, correo, direccion, telefono, password } = user;
    const contenedor = document.querySelector('.contenido-informacion');
    const nombreUsuario = document.querySelector('#nombre-usuario');
    
    nombreUsuario.textContent = nombre;

    //Nombre
    const campo = document.createElement('div');
    campo.classList.add('campo-informacion');

    const parrafoLabel = document.createElement('p');
    parrafoLabel.textContent = 'Nombre :'
    const parrafoNombre = document.createElement('p');
    parrafoNombre.textContent = nombre;

    campo.appendChild(parrafoLabel);
    campo.appendChild(parrafoNombre);

    //Apellido

    const campoApellido = document.createElement('div');
    campoApellido.classList.add('campo-informacion');

    const labelApellido = document.createElement('p');
    labelApellido.textContent = 'Apellido :'
    const parrafoApellido = document.createElement('p');
    parrafoApellido.textContent = apellido;

    campoApellido.appendChild(labelApellido);
    campoApellido.appendChild(parrafoApellido);

    //Correo

    const campoCorreo = document.createElement('div');
    campoCorreo.classList.add('campo-informacion');

    const labelCorreo = document.createElement('p');
    labelCorreo.textContent = 'Correo :'
    const parrafoCorreo = document.createElement('p');
    parrafoCorreo.textContent = correo;

    campoCorreo.appendChild(labelCorreo);
    campoCorreo.appendChild(parrafoCorreo);

    //Direccion

    const campoDireccion = document.createElement('div');
    campoDireccion.classList.add('campo-informacion');

    const labelDireccion = document.createElement('p');
    labelDireccion.textContent = 'Direccion :'
    const parrafoDireccion = document.createElement('p');
    parrafoDireccion.textContent = direccion;

    campoDireccion.appendChild(labelDireccion);
    campoDireccion.appendChild(parrafoDireccion);

    //Telefono

    const campoTelefono = document.createElement('div');
    campoTelefono.classList.add('campo-informacion');

    const labelTelefono = document.createElement('p');
    labelTelefono.textContent = 'Telefeno :'
    const parrafoTelefono = document.createElement('p');
    parrafoTelefono.textContent = telefono;

    campoTelefono.appendChild(labelTelefono);
    campoTelefono.appendChild(parrafoTelefono);

    //Passowrd

    const campoPassword = document.createElement('div');
    campoPassword.classList.add('campo-informacion');

    const labelPassword = document.createElement('p');
    labelPassword.textContent = 'Password :'
    const parrafoPassword = document.createElement('p');
    parrafoPassword.textContent = password;

    campoPassword.appendChild(labelPassword);
    campoPassword.appendChild(parrafoPassword);

    //BotonEditar

    const contenedotBoton = document.createElement('div');
    contenedotBoton.classList.add('contenedor-boton-right');
    contenedotBoton.dataset.idUsuario = id;

    const boton = document.createElement('button');
    boton.id = 'editar';
    boton.classList.add('boton', 'boton-editar');
    boton.textContent = 'Editar mi informacion';

    contenedotBoton.appendChild(boton);

    //

    contenedor.appendChild(campo);
    contenedor.appendChild(campoApellido);
    contenedor.appendChild(campoCorreo);
    contenedor.appendChild(campoDireccion);
    contenedor.appendChild(campoTelefono);
    contenedor.appendChild(campoPassword);
    contenedor.appendChild(contenedotBoton);

    editarInformacion(user);
}

export async function cerrarSesion(){

    const boton = document.querySelector('#cerrar');

    boton.addEventListener('click', async e =>{
        if(e.target.id === 'cerrar'){

            Swal.fire({
                title: 'Estas segur@?',
                text: "Se cerrara tu sesion al confirmar!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, cerrar mi sesion!'
              }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem('sesion_in');
                    Swal.fire({
                        position: 'top-end',
                        icon: 'warning',
                        title: 'cerrando sesion!!!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => {
                        location.reload();
                    }, 1600);

                }
              });

        }
    })

}

export async function editarInformacion( objeto ){

    const boton = document.querySelector('#editar');

    boton.addEventListener('click', async e =>{

        if(e.target.id === 'editar'){

            const botonEditar = await ventanaUsuarioEditar( objeto );
            const usuario = await validacionesUsuarioEditar( objeto );

            botonEditar.addEventListener('click', async e =>{

                if(e.target.id === 'confirmar-editar'){
                    e.preventDefault();
                    Swal.fire({
                        title: 'Estas segur@?',
                        text: "Se editara su perfil al confirmar esta accion!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Si, editar mi informacion!'
                      }).then(async (result) => {
                        if (result.isConfirmed) {
                            
                            const resultado = await edicionUsuario(usuario, usuario.id);
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
                      });

                }

            });

        }

    });

}

export async function obtenerInformacionPedidoUsuario(){
    
    const sesion = JSON.parse(localStorage.getItem('sesion_in'));
    const identificadorUsuario = sesion.usuario.id;
    const resultado = await obtenerPedidosUsuario(identificadorUsuario);
    const contenedor = document.querySelector('.contenido-pedidos');

    const verificacion = await verificarLength(resultado);
    if(resultado.length === 0 || !resultado.length || resultado === undefined){



        const parrafoDenegacion = document.createElement('div');
        parrafoDenegacion.classList.add('denegacion-pedido');
        parrafoDenegacion.innerHTML = `
            <i class="fab fa-accusoft"></i>
            <p>¡Aun no tiene pedidos realizados!</p>`
        ;

        contenedor.appendChild(parrafoDenegacion);

    }else{

        resultado.forEach(async pedido => {

            const { id , ciudad, estado, estado_pedido, direccion, usuario, modalidad, numero_guia, paqueteria, postal, referencias, envio, productos, total } = pedido;
            const { informacionUsuario, direccion_extra } = usuario;
            const { nombre, apellido, correo } = informacionUsuario; 

            const contenedorPedido = document.createElement('div');
            contenedorPedido.classList.add('contenedor-pedido');
            contenedorPedido.dataset.idPedido = id;

            const encabezado = document.createElement('h4');
            encabezado.textContent = `Pedido #${id}`;

            //Detalles Primarios
            const contenedorDetallesPrimarios = document.createElement('div');
            contenedorDetallesPrimarios.classList.add('detalles-primarios');

            const parrafoNombre = document.createElement('p');
            parrafoNombre.textContent = `${nombre} ${apellido}`;
            
            const parrafoCorreo  = document.createElement('p');
            parrafoCorreo.textContent = `${correo}`;

            const parrafoCiudad = document.createElement('p');
            parrafoCiudad.textContent = `${ciudad}`;

            const parrafoEstado = document.createElement('p');
            parrafoEstado.textContent = `${estado}`;
            
            const parrafoDireccionEntrega = document.createElement('p');
            if(direccion_extra === ''){
                parrafoDireccionEntrega.innerHTML = `${direccion}-${referencias}-#${postal}`;
            }else{
                parrafoDireccionEntrega.textContent = `${direccion_extra}-${referencias}-#${postal}`;
            }

            contenedorDetallesPrimarios.appendChild(parrafoNombre);
            contenedorDetallesPrimarios.appendChild(parrafoCorreo);
            contenedorDetallesPrimarios.appendChild(parrafoCiudad);
            contenedorDetallesPrimarios.appendChild(parrafoEstado);
            contenedorDetallesPrimarios.appendChild(parrafoDireccionEntrega);

            //Detalles Secundarios

            const contenedorDetallesSecundarios = document.createElement('div');
            contenedorDetallesSecundarios.classList.add('detalles-secundarios');

            const parrafoTotal = document.createElement('p');
            parrafoTotal.textContent = `Total: $${(parseInt(total)+parseInt(envio))}`;

            const estadoPedido = document.createElement('p');
            estadoPedido.innerHTML = `Estado de Pedido: <span>${estado_pedido}</span>`;

            const parrafoModalidad = document.createElement('p');
            parrafoModalidad.textContent = `Modo de envio : ${modalidad}`;

            const parrafoNumeroGuia  = document.createElement('p');
            parrafoNumeroGuia.innerHTML = `Numero Guia: <span>${numero_guia}</span>`;

            const parrafoPaqueteria = document.createElement('p');
            parrafoPaqueteria.innerHTML = `Paqueteria: <span>${paqueteria}</span>`;

            contenedorDetallesSecundarios.appendChild(parrafoTotal);
            contenedorDetallesSecundarios.appendChild(estadoPedido);
            contenedorDetallesSecundarios.appendChild(parrafoModalidad);
            contenedorDetallesSecundarios.appendChild(parrafoNumeroGuia);
            contenedorDetallesSecundarios.appendChild(parrafoPaqueteria);

            const contenedorDetallesProductos = document.createElement('div');
            contenedorDetallesProductos.classList.add('detalles-productos');

            const encabezadoDetallesProductos = document.createElement('p');
            encabezadoDetallesProductos.textContent = 'Lista de Productos';

            contenedorDetallesProductos.appendChild(encabezadoDetallesProductos);
            productos.forEach(async producto => {
                const { informacionProducto, cantidad, precio } = producto;

                const nombreParrafoProducto = informacionProducto.nombre;

                const parrafoProducto = document.createElement('p');
                parrafoProducto.innerHTML = `${cantidad}x <span>${nombreParrafoProducto}</span>`;

                contenedorDetallesProductos.appendChild(parrafoProducto);

            });

            contenedorPedido.appendChild(encabezado);
            contenedorPedido.appendChild(contenedorDetallesPrimarios);
            contenedorPedido.appendChild(contenedorDetallesSecundarios);
            contenedorPedido.appendChild(contenedorDetallesProductos);

            contenedor.appendChild(contenedorPedido);

            scrollPedidos(contenedorPedido);

        });

    }

}

async function scrollPedidos(contenedor){
    
    contenedor.addEventListener('mouseover', ()=>{
        contenedor.style.maxHeight = `${contenedor.scrollHeight}px`;
    });

    contenedor.addEventListener('mouseleave', e =>{
        contenedor.style.maxHeight = `70px`;
    });

}