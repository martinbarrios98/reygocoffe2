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