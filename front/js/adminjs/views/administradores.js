import { obtenerAdministrador, obtenerAdministradores } from '../../consultas/v2/consultas.js';
import { validacionesAdministrador, validacionesAdministradorEditar } from '../../validaciones/validaciones.js';
import { creacionAdministrador } from '../../consultas/v2/creador.js';
import { ventanaAdministradorEditar } from '../../emergentes/ventanas.js';
import { edicionAdministrador } from '../../consultas/v2/editor.js';
import { eliminacionAdministrador } from '../../consultas/v2/eliminador.js';

export async function insertarAdministradores(){

    const administradores = await obtenerAdministradores();
    const contenedor = document.querySelector('.contenedor-administrador-registrados');

    if(administradores.length > 0){

        administradores.forEach(async administrador => {

            const { nombre, correo, password, url, id } = administrador;

            const contenedorAdministrador = document.createElement('div');
            contenedorAdministrador.classList.add('contenedor-administrador');
            contenedorAdministrador.dataset.idAdministrador = id;
    
            const imagenAdministrador = document.createElement('img');
            imagenAdministrador.src = url;

            const contenedorInformacionAdmin = document.createElement('div');
            contenedorInformacionAdmin.classList.add('detalle-administrador');

            const parrafoNombre = document.createElement('p');
            parrafoNombre.textContent = `${nombre}`;

            const parrafoCorreo = document.createElement('p');
            parrafoCorreo.textContent = `${correo}`;

            const parrafoPassword = document.createElement('p');
            parrafoPassword.textContent = `${password}`;

            const contenedorBoton = document.createElement('div');
            contenedorBoton.classList.add('contenedor-boton');
            contenedorBoton.dataset.idAdministrador = id;

            const boton = document.createElement('button');
            boton.textContent = 'Ver más';
            boton.classList.add('boton', 'boton-normal');
            boton.id = 'ver-administrador';

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.classList.add('boton', 'boton-eliminar');
            botonEliminar.id = 'eliminar-administrador';

            contenedorBoton.appendChild(boton);
            contenedorBoton.appendChild(botonEliminar);

            contenedorInformacionAdmin.appendChild(parrafoNombre);
            contenedorInformacionAdmin.appendChild(parrafoCorreo);
            contenedorInformacionAdmin.appendChild(parrafoPassword);

            contenedorAdministrador.appendChild(imagenAdministrador);
            contenedorAdministrador.appendChild(contenedorInformacionAdmin);
            contenedorAdministrador.appendChild(contenedorBoton);

            contenedor.appendChild(contenedorAdministrador);

        });

        editarAdministrador();
        eliminarAdministrador();
        buscadorAdministradores();

    }else{

        const parrafoDenegacion = document.createElement('div');
        parrafoDenegacion.classList.add('denegacion-pedido');
        parrafoDenegacion.innerHTML = `
            <i class="fab fa-accusoft"></i>
            <p>¡Aun no hay administradores registrados!</p>`
        ;

        contenedor.appendChild(parrafoDenegacion);

    }

}

export async function agregarAdministrador(){

    const boton = document.querySelector('#agregar');
    const administradores = await obtenerAdministradores();
    const admin = await validacionesAdministrador();

    boton.addEventListener('click', e => {

        e.preventDefault();

        let validacion = true;

        administradores.forEach(async administrador => {
                if(administrador.correo === admin.correo){
                    validacion = false;
                }
        });

        if(!validacion || validacion === false){
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: `Ya se encuentre registrado este correo`,
                    showConfirmButton: false,
                    timer: 2000
                });
                return;
        }else{

             
            Swal.fire({
                title: 'Estas segur@?',
                text: "Se agregara un nuevo administrador!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, agregar administrador!'
            }).then(async (result) => {
                if (result.isConfirmed) {

                    const resultado = await creacionAdministrador(admin);
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

async function editarAdministrador(  ){

    const botones = document.querySelectorAll('#ver-administrador');
    botones.forEach(async boton =>{

        boton.addEventListener('click', async e => {

            e.preventDefault();
            const identificador = parseInt(e.target.parentElement.dataset.idAdministrador);
            const administrador = await obtenerAdministrador(identificador);
            const botonEditar = await ventanaAdministradorEditar(administrador);
            const admin = await validacionesAdministradorEditar(administrador);
            
            botonEditar.addEventListener('click', e => {

                e.preventDefault();
                Swal.fire({
                    title: 'Estas segur@?',
                    text: "Se editara el administrador al confirmar esta accion!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, editar informacion!'
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                        
                        const resultado = await edicionAdministrador(admin, identificador);
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

            });
    
        });

    });

}

async function eliminarAdministrador(){

    const botones = document.querySelectorAll('#eliminar-administrador');

    botones.forEach(async boton =>{

        boton.addEventListener('click', e =>{

            const identificador = parseInt(e.target.parentElement.dataset.idAdministrador);
            
            Swal.fire({
                title: 'Estas segur@?',
                text: "Se eliminara un administrador al confirmar esta accion!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar administrador!'
              }).then(async (result) => {
                if (result.isConfirmed) {

                    const resultado = await eliminacionAdministrador(identificador);
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

    }); 


}

export async function buscadorAdministradores(){

    const usuarios = document.querySelectorAll('.contenedor-administrador');
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
                        usuario.style.display = 'flex';
                    }
                    if(usuario.childNodes[1].textContent.replace(/\s/g, " ").search(texto) != -1){
                        usuario.style.display = 'flex';
                    }
                    if(usuario.childNodes[2].textContent.replace(/\s/g, " ").search(texto) != -1){
                        usuario.style.display = 'flex';
                    }
            
                });
            }

        }

    });

    inputBuscador.addEventListener('input', e => {
        if(e.target.value === ''){
            usuarios.forEach(usuario => {

                usuario.style.display = 'flex';
        
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
                    usuario.style.display = 'flex';
                }
                if(usuario.childNodes[1].textContent.replace(/\s/g, " ").search(texto) != -1){
                    usuario.style.display = 'flex';
                }
                if(usuario.childNodes[2].textContent.replace(/\s/g, " ").search(texto) != -1){
                    usuario.style.display = 'flex';
                }
        
            });

        }
        
    });

}