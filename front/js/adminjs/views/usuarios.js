import { obtenerUsuario, obtenerUsuarios } from "../../consultas/v2/consultas.js";
import { edicionUsuario } from "../../consultas/v2/editor.js";
import { ventanaUsuarioEditar } from "../../emergentes/ventanas.js";
import { validacionesUsuarioEditar } from '../../validaciones/validaciones.js';
import { eliminacionUsuario } from '../../consultas/v2/eliminador.js';


export async function insertarUsuarios(){

    const usuarios = await obtenerUsuarios();
    const contenedor = document.querySelector('.contenedor-usuarios-registrados');

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
        contenedorBoton.classList.add('contenedor-botones');
        contenedorBoton.dataset.idUsuario = id;

        const boton = document.createElement('button');
        boton.textContent = 'Ver más';
        boton.classList.add('boton', 'boton-normal');
        boton.id = 'ver-usuario';

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList.add('boton', 'boton-eliminar');
        botonEliminar.id = 'eliminar-usuario';

        contenedorBoton.appendChild(boton);
        contenedorBoton.appendChild(botonEliminar);

        contenedorUsuario.appendChild(parrafoNombre);
        contenedorUsuario.appendChild(parrafoCorreo);
        contenedorUsuario.appendChild(parrafoDireccion);
        contenedorUsuario.appendChild(parrafoTelefono);
        contenedorUsuario.appendChild(contenedorBoton);

        contenedor.appendChild(contenedorUsuario);

        boton.addEventListener('click', e => {edicionesUsuario(boton)});
        botonEliminar.addEventListener('click', e => {eliminarUsuario(botonEliminar)});

    });

    buscadorUsuarios();

}

export async function edicionesUsuario( boton ){

    if(boton.id === 'ver-usuario'){

        const identificador = parseInt(boton.parentElement.dataset.idUsuario);
        const objeto = await obtenerUsuario(identificador);
        const botonEditar = await ventanaUsuarioEditar(objeto);
        const resultado = await validacionesUsuarioEditar( objeto );

        botonEditar.addEventListener('click', e => {

            if(e.target.id === 'confirmar-editar'){

                e.preventDefault();

                Swal.fire({
                    title: 'Estas segur@ de realizar esta accion?',
                    text: "Se editara un usuario!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, editar usuario!'
                }).then(async result => {

                    if (result.isConfirmed) {

                        const resultadoInsercion = await edicionUsuario(resultado, identificador);

                        if(resultadoInsercion.req.status === 200){
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: `${resultadoInsercion.res.informacion}`,
                                showConfirmButton: false,
                                timer: 2000
                            });
                            setTimeout(() => {
                                location.reload();
                            }, 2100);
                        }
        
                        if(resultadoInsercion.req.status === 401){
                            
                            Swal.fire({
                                position: 'top-end',
                                icon: `${resultadoInsercion.res.respuesta}`,
                                title: `${resultadoInsercion.res.informacion}, ${resultadoInsercion.res.extra}`,
                                showConfirmButton: false,
                                timer: 2000
                            })
        
                            setTimeout(() => {
                                localStorage.removeItem('informacion');
                                window.location = 'sesion.html';
                            }, 2100);
                        }
        
                        if(resultadoInsercion.req.status === 400){
                            Swal.fire({
                                icon: 'error',
                                title: `${resultadoInsercion.res.respuesta}`,
                                text: `${resultadoInsercion.res.informacion}`
                            })
                        }


                    }

                });


            }

        });

    }

}

export async function eliminarUsuario(boton){

    const identificador = parseInt(boton.parentElement.dataset.idUsuario);

    if(boton.id === 'eliminar-usuario'){

        Swal.fire({
            title: 'Estas segur@ de realizar esta acción?',
            text: "Se eliminara un usuario al confirmar esta accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar usuario!'
          }).then(async (result) => {
            if (result.isConfirmed) {

                const resultado = await eliminacionUsuario(identificador);

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
          

    }

}

export async function buscadorUsuarios(){

    const usuarios = document.querySelectorAll('.ultimo-agregado-usuario');
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
    
                    if(usuario.childNodes[0].textContent.replace(/\s/g, " ").search(texto) != -1){
                        usuario.style.display = 'block';
                    }
                    if(usuario.childNodes[1].textContent.replace(/\s/g, " ").search(texto) != -1){
                        usuario.style.display = 'block';
                    }
                    if(usuario.childNodes[2].textContent.replace(/\s/g, " ").search(texto) != -1){
                        usuario.style.display = 'block';
                    }
                    if(usuario.childNodes[3].textContent.replace(/\s/g, " ").search(texto) != -1){
                        usuario.style.display = 'block';
                    }
            
                });
            }

        }

    });

    inputBuscador.addEventListener('input', e => {
        if(e.target.value === ''){
            usuarios.forEach(usuario => {

                usuario.style.display = 'block';
        
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

                if(usuario.childNodes[0].textContent.replace(/\s/g, " ").search(texto) != -1){
                    usuario.style.display = 'block';
                }
                if(usuario.childNodes[1].textContent.replace(/\s/g, " ").search(texto) != -1){
                    usuario.style.display = 'block';
                }
                if(usuario.childNodes[2].textContent.replace(/\s/g, " ").search(texto) != -1){
                    usuario.style.display = 'block';
                }
                if(usuario.childNodes[3].textContent.replace(/\s/g, " ").search(texto) != -1){
                    usuario.style.display = 'block';
                }
        
            });

        }
        
    });

}