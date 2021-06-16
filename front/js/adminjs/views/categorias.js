import { descargarCategoria, descargarCategorias, descargarProductosCat } from "../../consultas/v2/consultas.js";
import { creacionCategoria } from "../../consultas/v2/creador.js";
import { validacionesCategoria, validacionesCategoriaEditar } from "../../validaciones/validaciones.js";
import { ventanaCategoriaEditar } from '../../emergentes/ventanas.js';
import { edicionCategoria } from "../../consultas/v2/editor.js";
import { eliminacionCategoria } from "../../consultas/v2/eliminador.js";


export async function insertarCategorias(){

    const categorias = await descargarCategorias();
    const contenedor = document.querySelector('.contenedor-categorias');

    if(categorias.length < 0 || !categorias.length){


        const parrafoDenegacion = document.createElement('p');
        parrafoDenegacion.textContent = 'No hay categorias insertadas';

        contenedor.appendChild(parrafoDenegacion);


    }else{

        categorias.forEach(async categoria =>{

            const { id ,nombre, url } = categoria;

            const contenedorCategoria = document.createElement('div');
            contenedorCategoria.classList.add('contenedor-categoria');
            contenedorCategoria.id = id;

            const parrafoNombre = document.createElement('p');
            parrafoNombre.textContent = nombre;

            const imagen = document.createElement('img');
            imagen.src = url;
            imagen.alt = `imagen-${nombre}`;

            const contenedorBoton = document.createElement('div');
            contenedorBoton.classList.add('contenedor-boton');
            contenedorBoton.dataset.idCategoria = id;

            const boton = document.createElement('button');
            boton.textContent = 'Ver más';
            boton.classList.add('boton', 'boton-normal');
            boton.id = 'ver-categoria';

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.classList.add('boton', 'boton-eliminar');
            botonEliminar.id = 'eliminar-categoria';

            contenedorBoton.appendChild(boton);
            contenedorBoton.appendChild(botonEliminar);

            contenedorCategoria.appendChild(imagen);
            contenedorCategoria.appendChild(parrafoNombre);
            contenedorCategoria.appendChild(contenedorBoton);

            contenedor.appendChild(contenedorCategoria);

        });

        buscadorCategoria();
        editarCategoria();
        eliminarCategoria();

    }

}

export async function agregarCategorias(){

    const boton = document.querySelector('#agregar');
    const categoria = await validacionesCategoria();

    boton.addEventListener('click', e =>{

        e.preventDefault();

        Swal.fire({
            title: 'Estas segur@ de realizar esta accion?',
            text: "Se creara una categoria nueva al confirmar esta accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, agregar nueva categoria!'
        }).then(async result => {
            if (result.isConfirmed) {

                const resultado = await creacionCategoria(categoria);

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

async function editarCategoria(){

    const botontes = document.querySelectorAll('#ver-categoria');

    botontes.forEach(async boton =>{
        boton.addEventListener('click', async e =>{
            e.preventDefault();

            const identificador = parseInt(boton.parentElement.dataset.idCategoria);
            const objeto = await descargarCategoria(identificador);
            const botonEditar = await ventanaCategoriaEditar(objeto);
            const objeto2 = await validacionesCategoriaEditar(objeto);
            
            botonEditar.addEventListener('click', async e =>{
                e.preventDefault();
                Swal.fire({
                    title: 'Estas segur@ de realizar esta accion?',
                    text: "Se editara una categoria al confirmar esta accion!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, editar categoria!'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        
                        const resultado = await edicionCategoria(objeto2, identificador);
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
    });

}

async function eliminarCategoria(){

    const botones = document.querySelectorAll('#eliminar-categoria');

    botones.forEach(async boton =>{

        boton.addEventListener('click', async e =>{

            e.preventDefault();
            Swal.fire({
                title: 'Estas segur@?',
                text: "No podras deshacer esta accion!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'SI, eliminar categoria!'
            }).then(async (result) => {
                if (result.isConfirmed) {

                    const identificador = parseInt(boton.parentElement.dataset.idCategoria);
                    const productosCat = await descargarProductosCat(identificador);

                    if(!productosCat){
                        const resultado = await eliminacionCategoria(identificador);
    
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
                    }else{
                        Swal.fire({
                            icon: 'warning',
                            title: 'Oops...',
                            text: 'Esta categoria tiene agregada productos, no se puede eliminar'
                        });
                    }

                }
            })

        });

    });

}

async function buscadorCategoria(){

    const usuarios = document.querySelectorAll('.contenedor-categoria');
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

                    if(usuario.childNodes[1].textContent.replace(/\s/g, " ").search(texto) != -1){
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

                if(usuario.childNodes[1].textContent.replace(/\s/g, " ").search(texto) != -1){
                    usuario.style.display = 'block';
                }
        
            });

        }
        
    });

}