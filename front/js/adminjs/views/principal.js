import { obtenerUltimosUsuarios, obtenerUsuarios, obtenerUltimosPedidos, obtenerPedidos, obtenerAdministradores, descargarProductos } from '../../consultas/v2/consultas.js';

export async function insertarUltimosUsuarios(){

    const usuarios = await obtenerUltimosUsuarios();
    const longitud = usuarios.length;
    const contenedor = document.querySelector('.contenido-ultimos-usuarios');

    usuarios.forEach(async usuario => {
 
            const { nombre, apellido, correo, direccion, telefono, password, id } = usuario;

            const contenedorUsuario = document.createElement('div');
            contenedorUsuario.classList.add('ultimo-agregado-usuario');
            contenedorUsuario.dataset.idUsuario = id;

            const parrafoNombre = document.createElement('p');
            parrafoNombre.textContent = `${nombre} ${apellido}`;

            const parrafoCorreo = document.createElement('p');
            parrafoCorreo.textContent = correo;

            const parrafoDireccion = document.createElement('p');
            parrafoDireccion.textContent = direccion;

            const parrafoTelefono = document.createElement('p');
            parrafoTelefono.textContent = telefono;

            const contenedorBoton = document.createElement('div');
            contenedorBoton.classList.add('contenedor-boton');
            contenedorBoton.dataset.idUsuario = id;

            const boton = document.createElement('button');
            boton.textContent = 'Ir a usuarios';
            boton.classList.add('boton', 'boton-normal');
            boton.id = 'ver-usuario';

            contenedorBoton.appendChild(boton);

            contenedorUsuario.appendChild(parrafoNombre);
            contenedorUsuario.appendChild(parrafoCorreo);
            contenedorUsuario.appendChild(parrafoDireccion);
            contenedorUsuario.appendChild(parrafoTelefono);
            contenedorUsuario.appendChild(contenedorBoton);

            contenedor.appendChild(contenedorUsuario);

            boton.addEventListener('click', e =>{

                e.preventDefault();

                window.location = 'usuarios.html';

            });

    });

}

export async function insertarUltimosPedidos(){

    const pedidos = await obtenerUltimosPedidos();
    const contenedor = document.querySelector('.contenido-ultimos-pedidos');

    pedidos.forEach(async pedido => {

        const { id ,usuario, envio, total, direccion, estado, ciudad, fecha, referencias, postal } = pedido;
        const { informacionUsuario } = usuario;

        const contenedorPedido = document.createElement('div');
        contenedorPedido.dataset.idPedido = id;
        contenedorPedido.classList.add('contenedor-ultimo-pedido');

        const parrafoUsuario = document.createElement('p');
        parrafoUsuario.innerHTML = `${informacionUsuario.nombre} ${informacionUsuario.apellido} - <span>${informacionUsuario.correo}</span>`;

        const parrafoDireccion = document.createElement('p');
        parrafoDireccion.innerHTML = `${direccion}-${referencias}: <span># ${postal}</span>`;

        const parrafoLocalidad = document.createElement('p');
        parrafoLocalidad.textContent = `${estado} - ${ciudad}`;

        const parrafoTotal = document.createElement('p');
        parrafoTotal.textContent = `$ ${parseInt(total)+parseInt(envio)}.00`;
        parrafoTotal.classList.add('precio');

        const parrafoFecha = document.createElement('p');
        parrafoFecha.textContent = `${fecha.split('T')[0]} - ${fecha.split('T')[1].split('Z')[0]}`;

        const contenedorBoton = document.createElement('div');
        contenedorBoton.classList.add('contenedor-boton');
        contenedorBoton.dataset.idUsuario = id;

        const boton = document.createElement('button');
        boton.textContent = 'Ir a pedidos';
        boton.classList.add('boton', 'boton-normal');
        boton.id = 'ver-pedido';

        contenedorBoton.appendChild(boton);

        contenedorPedido.appendChild(parrafoUsuario);
        contenedorPedido.appendChild(parrafoDireccion);
        contenedorPedido.appendChild(parrafoLocalidad);
        contenedorPedido.appendChild(parrafoTotal);
        contenedorPedido.appendChild(parrafoFecha);
        contenedorPedido.appendChild(contenedorBoton);

        contenedor.appendChild(contenedorPedido);

        boton.addEventListener('click', e =>{

            e.preventDefault();

            window.location = 'pedidos.html';

        });

    });

}

export async function insertarContadores(){

    const resultados = await Promise.all([obtenerPedidos(), obtenerUsuarios(), obtenerAdministradores(), descargarProductos()]);
    const contadorPedidos = document.querySelector('#contador-pedidos');
    const contadorUsuarios = document.querySelector('#contador-usuarios');
    const contadorProductos = document.querySelector('#contador-productos');
    const contadorAdmin = document.querySelector('#contador-admin');

    const longitudPedidos = resultados[0].pedidos.length;
    const longitudUsuarios = resultados[1].length;
    const longitudAdmin = resultados[2].length;
    const longitudProductos = resultados[3].length;

    contadorPedidos.textContent = longitudPedidos;
    contadorUsuarios.textContent = longitudUsuarios;
    contadorProductos.textContent = longitudProductos;
    contadorAdmin.textContent = longitudAdmin;

}