import { descargarCategorias } from "../consultas/v2/consultas.js";

export async function ventanaUsuarioEditar( objeto ){

    const { id ,nombre, apellido, correo, password, direccion, telefono } = objeto;

    const body = document.querySelector('body');

    const contenedorVentana = document.createElement('div');
    contenedorVentana.classList.add('ventana');

    //FORMULARIO

    const contenedorFormuario = document.createElement('form');
    contenedorFormuario.classList.add('formulario-ventana');
    contenedorFormuario.dataset.idUsuario = id;

    //Encabezado Formulario

    const encabezadoFormulario = document.createElement('h3');
    encabezadoFormulario.textContent = `Editar ${nombre}`;

    //Campo Nombre

    const contenedorNombre = document.createElement('div');
    contenedorNombre.classList.add('campo');
    const labelNombrer = document.createElement('label');
    labelNombrer.textContent = 'Nombre:';
    const inputNombre = document.createElement('input');
    inputNombre.setAttribute('type', 'text');
    inputNombre.setAttribute('placeholder', 'Ingrese un nombre');
    inputNombre.id = 'nombre';
    inputNombre.value = nombre;

    contenedorNombre.appendChild(labelNombrer);
    contenedorNombre.appendChild(inputNombre);

    //Campo Apellido

    const contenedorApellido = document.createElement('div');
    contenedorApellido.classList.add('campo');
    const labelApellido = document.createElement('label');
    labelApellido.textContent = 'Apellido :';
    const inputApellido = document.createElement('input');
    inputApellido.setAttribute('type', 'text');
    inputApellido.setAttribute('placeholder', 'Ingrese un apellido');
    inputApellido.id = 'apellido';
    inputApellido.value = apellido;

    contenedorApellido.appendChild(labelApellido);
    contenedorApellido.appendChild(inputApellido);

    //Campo Correo

    const contenedorCorreo = document.createElement('div');
    contenedorCorreo.classList.add('campo');
    const labelCorreo = document.createElement('label');
    labelCorreo.textContent = 'Correo :';
    const inputCorreo = document.createElement('input');
    inputCorreo.setAttribute('type', 'email');
    inputCorreo.setAttribute('placeholder', 'Ingrese un correo');
    inputCorreo.id = 'correo';
    inputCorreo.value = correo;

    contenedorCorreo.appendChild(labelCorreo);
    contenedorCorreo.appendChild(inputCorreo);

    //Campo Password

    const contenedorPassword = document.createElement('div');
    contenedorPassword.classList.add('campo');
    const labelPassword = document.createElement('label');
    labelPassword.textContent = 'Password :';
    const inputPassword = document.createElement('input');
    inputPassword.setAttribute('type', 'password');
    inputPassword.setAttribute('placeholder', 'Ingrese una contraseña');
    inputPassword.id = 'password';
    inputPassword.value = password;

    contenedorPassword.appendChild(labelPassword);
    contenedorPassword.appendChild(inputPassword);

    //Campo Direccion

    const contenedorDireccion = document.createElement('div');
    contenedorDireccion.classList.add('campo');
    const labelDireccion = document.createElement('label');
    labelDireccion.textContent = 'Direccion :';
    const inputDireccion = document.createElement('input');
    inputDireccion.setAttribute('type', 'text');
    inputDireccion.setAttribute('placeholder', 'Ingrese una direccion');
    inputDireccion.id = 'direccion';
    inputDireccion.value = direccion;


    contenedorDireccion.appendChild(labelDireccion);
    contenedorDireccion.appendChild(inputDireccion);

    //Campo telefono

    const contenedorTelefono = document.createElement('div');
    contenedorTelefono.classList.add('campo');
    const labelTelefono = document.createElement('label');
    labelTelefono.textContent = 'Telefono :';
    const inputTelefono = document.createElement('input');
    inputTelefono.setAttribute('type', 'tel');
    inputTelefono.setAttribute('placeholder', 'Ingrese un numero de celular');
    inputTelefono.id = 'telefono';
    inputTelefono.value = telefono;


    contenedorTelefono.appendChild(labelTelefono);
    contenedorTelefono.appendChild(inputTelefono);

    //BOTON AGREGAR

    const contenedorBoton = document.createElement('div');
    contenedorBoton.classList.add('contenedor-botones');

    const botonEditar = document.createElement('button');
    botonEditar.textContent = 'Editar';
    botonEditar.classList.add('boton', 'boton-editar');
    botonEditar.id = 'confirmar-editar';

    const botonCancelar = document.createElement('button');
    botonCancelar.textContent = 'Cancelar';
    botonCancelar.classList.add('boton', 'boton-eliminar');
    botonCancelar.id = 'cancelar';

    contenedorBoton.appendChild(botonEditar);
    contenedorBoton.appendChild(botonCancelar);

    contenedorFormuario.appendChild(encabezadoFormulario);
    contenedorFormuario.appendChild(contenedorNombre);
    contenedorFormuario.appendChild(contenedorApellido);
    contenedorFormuario.appendChild(contenedorCorreo);
    contenedorFormuario.appendChild(contenedorPassword);
    contenedorFormuario.appendChild(contenedorDireccion);
    contenedorFormuario.appendChild(contenedorTelefono);
    contenedorFormuario.appendChild(contenedorBoton);

    contenedorVentana.appendChild(contenedorFormuario);

    body.appendChild(contenedorVentana);
    body.classList.add('bloquear');

    //Eventos para Eliminar Ventana del DOOM

    botonCancelar.onclick = e =>{

        contenedorVentana.remove();
        body.classList.remove('bloquear');

    };

    contenedorVentana.onclick = e =>{

        if(e.target.classList.value === 'ventana'){
            contenedorVentana.remove();
            body.classList.remove('bloquear');
        }

    }

    return botonEditar;

}

export async function ventanaAdministradorEditar( objeto ){

    const { nombre, correo, password, url } = objeto;
    const contenedor = document.querySelector('body');

    const contenedorVentana = document.createElement('div');
    contenedorVentana.classList.add('ventana');

    //Formulario
    const contenedorFormuario = document.createElement('form');
    contenedorFormuario.classList.add('formulario-ventana');

    const encabezadoFormulario = document.createElement('h3');
    encabezadoFormulario.textContent = `Editar ${nombre}`;

    //Campo Nombre

    const contenedorNombre = document.createElement('div');
    contenedorNombre.classList.add('campo');
    const labelNombrer = document.createElement('label');
    labelNombrer.textContent = 'Nombre:';
    const inputNombre = document.createElement('input');
    inputNombre.setAttribute('type', 'text');
    inputNombre.setAttribute('placeholder', 'Ingrese un nombre');
    inputNombre.id = 'nombre-editar';
    inputNombre.value = nombre;

    contenedorNombre.appendChild(labelNombrer);
    contenedorNombre.appendChild(inputNombre);

    //Campo Correo

    const contenedorCorreo = document.createElement('div');
    contenedorCorreo.classList.add('campo');
    const labelCorreo = document.createElement('label');
    labelCorreo.textContent = 'Correo :';
    const inputCorreo = document.createElement('input');
    inputCorreo.setAttribute('type', 'email');
    inputCorreo.setAttribute('placeholder', 'Ingrese un correo');
    inputCorreo.id = 'correo-editar';
    inputCorreo.value = correo;

    contenedorCorreo.appendChild(labelCorreo);
    contenedorCorreo.appendChild(inputCorreo);

    //Campo Password

    const contenedorPassword = document.createElement('div');
    contenedorPassword.classList.add('campo');
    const labelPassword = document.createElement('label');
    labelPassword.textContent = 'Password :';
    const inputPassword = document.createElement('input');
    inputPassword.setAttribute('type', 'password');
    inputPassword.setAttribute('placeholder', 'Ingrese una contraseña');
    inputPassword.id = 'password-editar';
    inputPassword.value = password;

    contenedorPassword.appendChild(labelPassword);
    contenedorPassword.appendChild(inputPassword);

    //Campo URL de Imagenes

    const contenedorURL = document.createElement('div');
    contenedorURL.classList.add('subir-imagen');
    const imagenURL = document.createElement('img');
    imagenURL.src = url;
    imagenURL.id = 'imagen-subida-url';
    const contenedorCampoURL = document.createElement('div');
    contenedorCampoURL.classList.add('campo-imagen');
    const labelURL = document.createElement('label');
    labelURL.textContent = 'Seleccione una imagen :';
    const botonImagen = document.createElement('button');
    botonImagen.type = 'button';
    botonImagen.id = 'imagen-editar';
    botonImagen.classList.add('boton', 'boton-normal');
    botonImagen.textContent = 'Editar Imagen';

    contenedorCampoURL.appendChild(labelURL);
    contenedorCampoURL.appendChild(botonImagen);

    contenedorURL.appendChild(imagenURL);
    contenedorURL.appendChild(contenedorCampoURL);

    //BOTONES

    const contenedorBoton = document.createElement('div');
    contenedorBoton.classList.add('contenedor-botones');

    const botonEditar = document.createElement('button');
    botonEditar.textContent = 'Editar';
    botonEditar.classList.add('boton', 'boton-editar');
    botonEditar.id = 'confirmar-editar';

    const botonCancelar = document.createElement('button');
    botonCancelar.textContent = 'Cancelar';
    botonCancelar.classList.add('boton', 'boton-eliminar');
    botonCancelar.id = 'cancelar';

    contenedorBoton.appendChild(botonEditar);
    contenedorBoton.appendChild(botonCancelar);

    contenedorFormuario.appendChild(encabezadoFormulario);
    contenedorFormuario.appendChild(contenedorURL);
    contenedorFormuario.appendChild(contenedorNombre);
    contenedorFormuario.appendChild(contenedorCorreo);
    contenedorFormuario.appendChild(contenedorPassword);
    contenedorFormuario.appendChild(contenedorBoton);

    contenedorVentana.appendChild(contenedorFormuario);
    contenedor.appendChild(contenedorVentana);
    contenedor.classList.add('bloquear');

    //Eventos para Eliminar Ventana del DOOM

    botonCancelar.onclick = e =>{

        contenedorVentana.remove();
        contenedor.classList.remove('bloquear');

    };

    contenedorVentana.onclick = e =>{

        if(e.target.classList.value === 'ventana'){
            contenedorVentana.remove();
            contenedor.classList.remove('bloquear');
        }

    }

    return botonEditar;

}

export async function ventanaProductoEditar( objeto ){

    const contenedor = document.querySelector('body');
    const { id, nombre, descripcion, precio, url, categoria, categoria_nombre, disponibilidad, peso } = objeto;
    const categorias = await descargarCategorias();

    const contenedorVentana = document.createElement('div');
    contenedorVentana.classList.add('ventana');

    //Formulario
    const contenedorFormuario = document.createElement('form');
    contenedorFormuario.classList.add('formulario-ventana');

    const encabezadoFormulario = document.createElement('h3');
    encabezadoFormulario.textContent = `Editar ${nombre}`;

    //Campo Nombre

    const contenedorNombre = document.createElement('div');
    contenedorNombre.classList.add('campo');
    const labelNombrer = document.createElement('label');
    labelNombrer.textContent = 'Nombre:';
    const inputNombre = document.createElement('input');
    inputNombre.setAttribute('type', 'text');
    inputNombre.setAttribute('placeholder', 'Ingrese el nombre del producto');
    inputNombre.id = 'nombre-editar';
    inputNombre.value = nombre;

    contenedorNombre.appendChild(labelNombrer);
    contenedorNombre.appendChild(inputNombre);

    //Campo Precio 

    const contenedorPrecio = document.createElement('div');
    contenedorPrecio.classList.add('campo');
    const labelPrecio = document.createElement('label');
    labelPrecio.textContent = 'Precio: ';
    const inputPrecio = document.createElement('input');
    inputPrecio.type = 'number';
    inputPrecio.placeholder = 'Ingrese el precio del producto';
    inputPrecio.id = 'precio-editar';
    inputPrecio.value = precio;

    contenedorPrecio.appendChild(labelPrecio);
    contenedorPrecio.appendChild(inputPrecio);

    //Campo Categoria 

    const contenedorCategoria = document.createElement('div');
    contenedorCategoria.classList.add('campo');
    const labelCategoria = document.createElement('label');
    labelCategoria.textContent = 'Categoria: ';
    const selectCategoria = document.createElement('select');
    selectCategoria.id = 'categoria-editar';

    const optionDefault = document.createElement('option');
    optionDefault.textContent = 'Seleccione una categoria';
    optionDefault.value = '';
    selectCategoria.appendChild(optionDefault);

    categorias.forEach(async cater =>{

        const option = document.createElement('option');
        option.textContent = cater.nombre;
        option.value = cater.id;

        selectCategoria.appendChild(option);

    });

    selectCategoria.value = categoria;

    contenedorCategoria.appendChild(labelCategoria);
    contenedorCategoria.appendChild(selectCategoria);

    //Campo Descripcion 

    const contenedorDescripcion = document.createElement('div');
    contenedorDescripcion.classList.add('campo');
    const labelDescripcion = document.createElement('label');
    labelDescripcion.textContent = 'Descripcion: ';
    const textareaDescripcion = document.createElement('textarea');
    textareaDescripcion.id = 'descripcion-editar';
    textareaDescripcion.placeholder = 'Ingrese una descripcion para el producto';
    textareaDescripcion.value = descripcion;

    contenedorDescripcion.appendChild(labelDescripcion);
    contenedorDescripcion.appendChild(textareaDescripcion);

    //Campo URL de Imagenes

    const contenedorURL = document.createElement('div');
    contenedorURL.classList.add('subir-imagen');
    const imagenURL = document.createElement('img');
    imagenURL.src = url;
    imagenURL.id = 'imagen-subida-url';
    const contenedorCampoURL = document.createElement('div');
    contenedorCampoURL.classList.add('campo-imagen');
    const labelURL = document.createElement('label');
    labelURL.textContent = 'Seleccione una imagen :';
    const botonImagen = document.createElement('button');
    botonImagen.type = 'button';
    botonImagen.id = 'imagen-editar';
    botonImagen.classList.add('boton', 'boton-normal');
    botonImagen.textContent = 'Editar Imagen';

    contenedorCampoURL.appendChild(labelURL);
    contenedorCampoURL.appendChild(botonImagen);

    contenedorURL.appendChild(imagenURL);
    contenedorURL.appendChild(contenedorCampoURL);

    //Campo Disponibilidad

    const contenedorDisponibilidad = document.createElement('div');
    contenedorDisponibilidad.classList.add('campo');
    const labelDisponibilidad = document.createElement('label');
    labelDisponibilidad.textContent = 'Disponibilidad: ';
    const selectDisponibilidad = document.createElement('select');
    selectDisponibilidad.id = 'disponibilidad-editar';

    const optionDefaultDisponibilidad = document.createElement('option');
    optionDefaultDisponibilidad.textContent = 'Seleccione una opcion';
    optionDefaultDisponibilidad.value = '';

    const optionDisponible = document.createElement('option');
    optionDisponible.textContent = 'Disponible';
    optionDisponible.value = 'disponible';

    const optionNoDisponible = document.createElement('option');
    optionNoDisponible.textContent = 'No disponible';
    optionNoDisponible.value = 'no disponible';
    selectDisponibilidad.appendChild(optionDefaultDisponibilidad);
    selectDisponibilidad.appendChild(optionDisponible);
    selectDisponibilidad.appendChild(optionNoDisponible);

    contenedorDisponibilidad.appendChild(labelDisponibilidad);
    contenedorDisponibilidad.appendChild(selectDisponibilidad);

    selectDisponibilidad.value = disponibilidad;

    //Campo Peso

    const contenedorPeso = document.createElement('div');
    contenedorPeso.classList.add('campo');
    const labelPeso = document.createElement('label');
    labelPeso.textContent = 'Peso (g):';
    const inputPeso = document.createElement('input');
    inputPeso.setAttribute('type', 'text');
    inputPeso.setAttribute('placeholder', 'Ingrese el peso del producto');
    inputPeso.id = 'peso-editar';
    inputPeso.value = peso;

    contenedorPeso.appendChild(labelPeso);
    contenedorPeso.appendChild(inputPeso);

    //BOTONES

    const contenedorBoton = document.createElement('div');
    contenedorBoton.classList.add('contenedor-botones');

    const botonEditar = document.createElement('button');
    botonEditar.textContent = 'Editar';
    botonEditar.classList.add('boton', 'boton-editar');
    botonEditar.id = 'confirmar-editar';

    const botonCancelar = document.createElement('button');
    botonCancelar.textContent = 'Cancelar';
    botonCancelar.classList.add('boton', 'boton-eliminar');
    botonCancelar.id = 'cancelar';

    contenedorBoton.appendChild(botonEditar);
    contenedorBoton.appendChild(botonCancelar);

    contenedorFormuario.appendChild(encabezadoFormulario);
    contenedorFormuario.appendChild(contenedorURL);
    contenedorFormuario.appendChild(contenedorNombre);
    contenedorFormuario.appendChild(contenedorPrecio);
    contenedorFormuario.appendChild(contenedorCategoria);
    contenedorFormuario.appendChild(contenedorPeso);
    contenedorFormuario.appendChild(contenedorDisponibilidad);
    contenedorFormuario.appendChild(contenedorDescripcion);
    contenedorFormuario.appendChild(contenedorBoton);

    contenedorVentana.appendChild(contenedorFormuario);
    contenedor.appendChild(contenedorVentana);
    contenedor.classList.add('bloquear');

    //Eventos para Eliminar Ventana del DOOM

    botonCancelar.onclick = e =>{

        contenedorVentana.remove();
        contenedor.classList.remove('bloquear');

    };

    contenedorVentana.onclick = e =>{

        if(e.target.classList.value === 'ventana'){
            contenedorVentana.remove();
            contenedor.classList.remove('bloquear');
        }

    }

    return botonEditar;

}

export async function ventanaProductos( objeto){

    const contenedor = document.querySelector('body');
    const contenedorVentana = document.createElement('div');
    contenedorVentana.classList.add('ventana');

    const contenedorProductos = document.createElement('div');
    contenedorProductos.classList.add('ventana-contenido-productos');

    const encabezado = document.createElement('h3');
    encabezado.textContent = 'Lista de Productos';

    contenedorProductos.appendChild(encabezado);

    objeto.forEach(async producto => {

        const { informacionProducto, cantidad } = producto;
        const { nombre, precio, descripcion, url } = informacionProducto;

        const contenedorProducto = document.createElement('div');
        contenedorProducto.classList.add('ventana-producto');

        const imagen = document.createElement('img');
        imagen.src = url;

        const parrafoNombre = document.createElement('p');
        parrafoNombre.innerHTML = `<span>${cantidad}x</span> ${nombre}`;

        const parrafoDescripcion = document.createElement('p');
        parrafoDescripcion.textContent = `${descripcion} - $${precio}`;
        
        contenedorProducto.appendChild(imagen);
        contenedorProducto.appendChild(parrafoNombre);
        contenedorProducto.appendChild(parrafoDescripcion);

        contenedorProductos.appendChild(contenedorProducto);

    });

    //BOTONES

    const contenedorBoton = document.createElement('div');
    contenedorBoton.classList.add('contenedor-boton');;

    const botonCancelar = document.createElement('button');
    botonCancelar.textContent = 'Cerrar';
    botonCancelar.classList.add('boton', 'boton-eliminar');
    botonCancelar.id = 'cancelar';

    contenedorBoton.appendChild(botonCancelar);
    contenedorProductos.appendChild(contenedorBoton);

    contenedorVentana.appendChild(contenedorProductos);
    contenedor.appendChild(contenedorVentana);
    contenedor.classList.add('bloquear');

    //Eventos para Eliminar Ventana del DOOM

    botonCancelar.onclick = e =>{

        contenedorVentana.remove();
        contenedor.classList.remove('bloquear');

    };

    contenedorVentana.onclick = e =>{

        if(e.target.classList.value === 'ventana'){
            contenedorVentana.remove();
            contenedor.classList.remove('bloquear');
        }

    }

}

export async function ventanaEditarPedido( objeto ){

    const { id, ciudad, estado, comision_paypal, id_transacion, envio, total, estado_pedido, fecha, numero_guia, paqueteria, postal, referencias, usuario, productos, direccion } = objeto;

    const body = document.querySelector('body');

    const contenedorVentana = document.createElement('div');
    contenedorVentana.classList.add('ventana');

    //FORMULARIO

    const contenedorFormuario = document.createElement('form');
    contenedorFormuario.classList.add('formulario-ventana');
    contenedorFormuario.dataset.idPedido = id;

    //Encabezado Formulario

    const encabezadoFormulario = document.createElement('h3');
    encabezadoFormulario.textContent = `Editar Pedido #${id}`;

    //Campo Numero Guia

    const contenedorNumeroGuia = document.createElement('div');
    contenedorNumeroGuia.classList.add('campo');
    const labelNumeroGuia = document.createElement('label');
    labelNumeroGuia.textContent = 'Numero de Guia:';
    const inputNumeroGuia = document.createElement('input');
    inputNumeroGuia.setAttribute('type', 'text');
    inputNumeroGuia.setAttribute('placeholder', 'Ingrese el numero de guia');
    inputNumeroGuia.id = 'numero-guia';
    inputNumeroGuia.value = numero_guia;

    contenedorNumeroGuia.appendChild(labelNumeroGuia);
    contenedorNumeroGuia.appendChild(inputNumeroGuia);

    //Campo Paqueteria

    const contenedorPaqueteria = document.createElement('div');
    contenedorPaqueteria.classList.add('campo');
    const labelPaqueteria = document.createElement('label');
    labelPaqueteria.textContent = 'Paqueteria :';
    const inputPaqueteria = document.createElement('input');
    inputPaqueteria.setAttribute('type', 'text');
    inputPaqueteria.setAttribute('placeholder', 'Ingrese la paqueteria de envio');
    inputPaqueteria.id = 'paqueteria';
    inputPaqueteria.value = paqueteria;

    contenedorPaqueteria.appendChild(labelPaqueteria);
    contenedorPaqueteria.appendChild(inputPaqueteria);

    //Campo Estado Pedido

    const contenedorEstadoPedido = document.createElement('div');
    contenedorEstadoPedido.classList.add('campo');
    const labelEstadoPedido = document.createElement('label');
    labelEstadoPedido.textContent = 'Estado de Pedido :';
    const inptuEstadoPedido = document.createElement('select');
    inptuEstadoPedido.id = 'estado-pedido';
    
    const optionPagado = document.createElement('option');
    optionPagado.value = 'Pagado';
    optionPagado.textContent = 'Pagado';

    const optionEmpaquetando = document.createElement('option');
    optionEmpaquetando.value = 'Empaquetando';
    optionEmpaquetando.textContent = 'Empaquetando';

    const optionEnviado = document.createElement('option');
    optionEnviado.value = 'Enviado';
    optionEnviado.textContent = 'Enviado';

    const optionEntregado = document.createElement('option');
    optionEntregado.value = 'Entregado';
    optionEntregado.textContent = 'Entregado';

    inptuEstadoPedido.appendChild(optionPagado);
    inptuEstadoPedido.appendChild(optionEmpaquetando);
    inptuEstadoPedido.appendChild(optionEnviado);
    inptuEstadoPedido.appendChild(optionEntregado);

    contenedorEstadoPedido.appendChild(labelEstadoPedido);
    contenedorEstadoPedido.appendChild(inptuEstadoPedido);

    inptuEstadoPedido.value = `${estado_pedido.trim()}`;

    //BOTON AGREGAR

    const contenedorBoton = document.createElement('div');
    contenedorBoton.classList.add('contenedor-botones');

    const botonEditar = document.createElement('button');
    botonEditar.textContent = 'Editar';
    botonEditar.classList.add('boton', 'boton-editar');
    botonEditar.id = 'confirmar-editar';

    const botonCancelar = document.createElement('button');
    botonCancelar.textContent = 'Cancelar';
    botonCancelar.classList.add('boton', 'boton-eliminar');
    botonCancelar.id = 'cancelar';

    contenedorBoton.appendChild(botonEditar);
    contenedorBoton.appendChild(botonCancelar);

    contenedorFormuario.appendChild(encabezadoFormulario);
    contenedorFormuario.appendChild(contenedorNumeroGuia);
    contenedorFormuario.appendChild(contenedorPaqueteria);
    contenedorFormuario.appendChild(contenedorEstadoPedido)
    contenedorFormuario.appendChild(contenedorBoton);

    contenedorVentana.appendChild(contenedorFormuario);

    body.appendChild(contenedorVentana);
    body.classList.add('bloquear');

    //Eventos para Eliminar Ventana del DOOM

    botonCancelar.onclick = e =>{

        contenedorVentana.remove();
        body.classList.remove('bloquear');

    };

    contenedorVentana.onclick = e =>{

        if(e.target.classList.value === 'ventana'){
            contenedorVentana.remove();
            body.classList.remove('bloquear');
        }

    }

    return botonEditar;

}

export async function ventanaCategoriaEditar( objeto ){

    const { id, nombre, url, descripcion } = objeto;

    const contenedor = document.querySelector('body');

    const contenedorVentana = document.createElement('div');
    contenedorVentana.classList.add('ventana');

    //FORMULARIO

    const contenedorFormuario = document.createElement('form');
    contenedorFormuario.classList.add('formulario-ventana');
    contenedorFormuario.dataset.idCategoria = id;

    //Encabezado Formulario

    const encabezadoFormulario = document.createElement('h3');
    encabezadoFormulario.textContent = `Editar ${nombre}`;

    //Campo Nombre

    const contenedorNombre = document.createElement('div');
    contenedorNombre.classList.add('campo');
    const labelNombrer = document.createElement('label');
    labelNombrer.textContent = 'Nombre:';
    const inputNombre = document.createElement('input');
    inputNombre.setAttribute('type', 'text');
    inputNombre.setAttribute('placeholder', 'Ingrese un nombre');
    inputNombre.id = 'nombre-editar';
    inputNombre.value = nombre;

    contenedorNombre.appendChild(labelNombrer);
    contenedorNombre.appendChild(inputNombre);

    //Campo Descripcion

    const contenedorDescripcion = document.createElement('div');
    contenedorDescripcion.classList.add('campo');
    const labelDescripcion = document.createElement('label');
    labelDescripcion.textContent = 'Descripcion:';
    const inputDescripcion = document.createElement('textarea');
    inputDescripcion.id = 'descripcion-editar';
    inputDescripcion.placeholder = 'Ingrese una descripcion';
    inputDescripcion.value = descripcion;

    contenedorDescripcion.appendChild(labelDescripcion);
    contenedorDescripcion.appendChild(inputDescripcion);

    //Campo URL de Imagenes

    const contenedorURL = document.createElement('div');
    contenedorURL.classList.add('subir-imagen');
    const imagenURL = document.createElement('img');
    imagenURL.src = url;
    imagenURL.id = 'imagen-subida-url';
    const contenedorCampoURL = document.createElement('div');
    contenedorCampoURL.classList.add('campo-imagen');
    const labelURL = document.createElement('label');
    labelURL.textContent = 'Seleccione una imagen :';
    const botonImagen = document.createElement('button');
    botonImagen.type = 'button';
    botonImagen.id = 'imagen-editar';
    botonImagen.classList.add('boton', 'boton-normal');
    botonImagen.textContent = 'Editar Imagen';

    contenedorCampoURL.appendChild(labelURL);
    contenedorCampoURL.appendChild(botonImagen);

    contenedorURL.appendChild(imagenURL);
    contenedorURL.appendChild(contenedorCampoURL);

    //BOTONES

    const contenedorBoton = document.createElement('div');
    contenedorBoton.classList.add('contenedor-botones');

    const botonEditar = document.createElement('button');
    botonEditar.textContent = 'Editar';
    botonEditar.classList.add('boton', 'boton-editar');
    botonEditar.id = 'confirmar-editar';

    const botonCancelar = document.createElement('button');
    botonCancelar.textContent = 'Cancelar';
    botonCancelar.classList.add('boton', 'boton-eliminar');
    botonCancelar.id = 'cancelar';

    contenedorBoton.appendChild(botonEditar);
    contenedorBoton.appendChild(botonCancelar);

    contenedorFormuario.appendChild(encabezadoFormulario);
    contenedorFormuario.appendChild(contenedorURL);
    contenedorFormuario.appendChild(contenedorNombre);
    contenedorFormuario.appendChild(contenedorDescripcion);
    contenedorFormuario.appendChild(contenedorBoton);

    contenedorVentana.appendChild(contenedorFormuario);
    contenedor.appendChild(contenedorVentana);
    contenedor.classList.add('bloquear');

    //Eventos para Eliminar Ventana del DOOM

    botonCancelar.onclick = e =>{

        contenedorVentana.remove();
        contenedor.classList.remove('bloquear');

    };

    contenedorVentana.onclick = e =>{

        if(e.target.classList.value === 'ventana'){
            contenedorVentana.remove();
            contenedor.classList.remove('bloquear');
        }

    }

    return botonEditar;


}