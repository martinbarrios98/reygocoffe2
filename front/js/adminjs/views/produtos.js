import { descargarCategorias, descargarProductos, obtenerProducto } from "../../consultas/v2/consultas.js";
import { creacionProducto } from "../../consultas/v2/creador.js";
import { edicionProducto } from "../../consultas/v2/editor.js";
import { eliminacionProducto } from "../../consultas/v2/eliminador.js";
import { ventanaProductoEditar } from "../../emergentes/ventanas.js";
import { validacionesProducto, validacionesProductoEditar } from "../../validaciones/validaciones.js";


export async function insertarProductos(){

    const contenedor = document.querySelector('.contenedor-productos-registrados');
    const productos = await descargarProductos();

    productos.forEach(async producto =>{

        const { nombre, id, precio, descripcion, url, categoria_nombre } = producto;

        const contenedorProducto = document.createElement('div');
        contenedorProducto.classList.add('contenedor-producto');
        contenedorProducto.dataset.idProducto = id;

        const imagen = document.createElement('img');
        imagen.src = url;
        imagen.alt = `imagen-${nombre}`;

        const contenedorDetalles = document.createElement('div');
        contenedorDetalles.classList.add('detalles-producto');

        const parrafoNombre = document.createElement('p');
        parrafoNombre.textContent = nombre;

        const parrafoCategoria = document.createElement('p');
        parrafoCategoria.textContent = categoria_nombre;

        const parrafoDescripcion = document.createElement('p');
        parrafoDescripcion.textContent = descripcion;

        const parrafoPrecio = document.createElement('p');
        parrafoPrecio.textContent = `$${precio}`;

        contenedorDetalles.appendChild(parrafoNombre);
        contenedorDetalles.appendChild(parrafoCategoria);
        contenedorDetalles.appendChild(parrafoDescripcion);
        contenedorDetalles.appendChild(parrafoPrecio);

        const contenedorBoton = document.createElement('div');
        contenedorBoton.classList.add('contenedor-boton');
        contenedorBoton.dataset.idProducto = id;

        const boton = document.createElement('button');
        boton.textContent = 'Ver más';
        boton.classList.add('boton', 'boton-normal');
        boton.id = 'ver-producto';

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList.add('boton', 'boton-eliminar');
        botonEliminar.id = 'eliminar-producto';

        contenedorBoton.appendChild(boton);
        contenedorBoton.appendChild(botonEliminar);

        contenedorProducto.appendChild(imagen);
        contenedorProducto.appendChild(contenedorDetalles);
        contenedorProducto.appendChild(contenedorBoton);

        contenedor.appendChild(contenedorProducto);

    });

    buscadorProductos();
    eliminarProducto();
    editarProducto();

}

export async function insertarOptionCategorias(){
    const contenedor = document.querySelector('#categoria');
    const categorias = await descargarCategorias();
    const contenedor2 = document.querySelector('#categoria-producto');

    categorias.forEach(async categoria => {

        const { nombre, id } = categoria;

        const option = document.createElement('option');
        option.value = id;
        option.textContent = nombre;

        contenedor.appendChild(option);

    });

    categorias.forEach(async categoria => {

        const { nombre, id } = categoria;

        const option = document.createElement('option');
        option.value = id;
        option.textContent = nombre;

        contenedor2.appendChild(option);

    });
    
    insertarProductosOption();
}

async function insertarProductosOption(){

    const productos = document.querySelectorAll('.contenedor-producto');
    const contenedor = document.querySelector('.contenedor-productos-registrados');
    const arregloProductos = await descargarProductos();
    const inputCategoria = document.querySelector('#categoria-producto');

    inputCategoria.addEventListener('input', e => {

        if(e.target.value === ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Seleccione una categoria!'
            });
        }else if(e.target.value === 'all'){

            contenedor.innerHTML = '';

            arregloProductos.forEach(async producto =>{

                const { nombre, id, precio, descripcion, url, categoria_nombre } = producto;
        
                const contenedorProducto = document.createElement('div');
                contenedorProducto.classList.add('contenedor-producto');
                contenedorProducto.dataset.idProducto = id;
        
                const imagen = document.createElement('img');
                imagen.src = url;
                imagen.alt = `imagen-${nombre}`;
        
                const contenedorDetalles = document.createElement('div');
                contenedorDetalles.classList.add('detalles-producto');
        
                const parrafoNombre = document.createElement('p');
                parrafoNombre.textContent = nombre;
        
                const parrafoCategoria = document.createElement('p');
                parrafoCategoria.textContent = categoria_nombre;
        
                const parrafoDescripcion = document.createElement('p');
                parrafoDescripcion.textContent = descripcion;
        
                const parrafoPrecio = document.createElement('p');
                parrafoPrecio.textContent = `$${precio}`;
        
                contenedorDetalles.appendChild(parrafoNombre);
                contenedorDetalles.appendChild(parrafoCategoria);
                contenedorDetalles.appendChild(parrafoDescripcion);
                contenedorDetalles.appendChild(parrafoPrecio);
        
                const contenedorBoton = document.createElement('div');
                contenedorBoton.classList.add('contenedor-boton');
                contenedorBoton.dataset.idProducto = id;
        
                const boton = document.createElement('button');
                boton.textContent = 'Ver más';
                boton.classList.add('boton', 'boton-normal');
                boton.id = 'ver-producto';
        
                const botonEliminar = document.createElement('button');
                botonEliminar.textContent = 'Eliminar';
                botonEliminar.classList.add('boton', 'boton-eliminar');
                botonEliminar.id = 'eliminar-producto';
        
                contenedorBoton.appendChild(boton);
                contenedorBoton.appendChild(botonEliminar);
        
                contenedorProducto.appendChild(imagen);
                contenedorProducto.appendChild(contenedorDetalles);
                contenedorProducto.appendChild(contenedorBoton);
        
                contenedor.appendChild(contenedorProducto);
        
            });

            buscadorProductos();
            eliminarProducto();
            editarProducto();

        }else{

            contenedor.innerHTML = '';

            arregloProductos.forEach(async producto =>{

                if(parseInt(producto.categoria) === parseInt(e.target.value)){


                    const { nombre, id, precio, descripcion, url, categoria_nombre } = producto;
        
                    const contenedorProducto = document.createElement('div');
                    contenedorProducto.classList.add('contenedor-producto');
                    contenedorProducto.dataset.idProducto = id;
            
                    const imagen = document.createElement('img');
                    imagen.src = url;
                    imagen.alt = `imagen-${nombre}`;
            
                    const contenedorDetalles = document.createElement('div');
                    contenedorDetalles.classList.add('detalles-producto');
            
                    const parrafoNombre = document.createElement('p');
                    parrafoNombre.textContent = nombre;
            
                    const parrafoCategoria = document.createElement('p');
                    parrafoCategoria.textContent = categoria_nombre;
            
                    const parrafoDescripcion = document.createElement('p');
                    parrafoDescripcion.textContent = descripcion;
            
                    const parrafoPrecio = document.createElement('p');
                    parrafoPrecio.textContent = `$${precio}`;
            
                    contenedorDetalles.appendChild(parrafoNombre);
                    contenedorDetalles.appendChild(parrafoCategoria);
                    contenedorDetalles.appendChild(parrafoDescripcion);
                    contenedorDetalles.appendChild(parrafoPrecio);
            
                    const contenedorBoton = document.createElement('div');
                    contenedorBoton.classList.add('contenedor-boton');
                    contenedorBoton.dataset.idProducto = id;
            
                    const boton = document.createElement('button');
                    boton.textContent = 'Ver más';
                    boton.classList.add('boton', 'boton-normal');
                    boton.id = 'ver-producto';
            
                    const botonEliminar = document.createElement('button');
                    botonEliminar.textContent = 'Eliminar';
                    botonEliminar.classList.add('boton', 'boton-eliminar');
                    botonEliminar.id = 'eliminar-producto';
            
                    contenedorBoton.appendChild(boton);
                    contenedorBoton.appendChild(botonEliminar);
            
                    contenedorProducto.appendChild(imagen);
                    contenedorProducto.appendChild(contenedorDetalles);
                    contenedorProducto.appendChild(contenedorBoton);
            
                    contenedor.appendChild(contenedorProducto);

                }
        
            });

            buscadorProductos();
            eliminarProducto();
            editarProducto();

        }

    });
    

}

async function buscadorProductos(){

    const usuarios = document.querySelectorAll('.contenedor-producto');
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

                    if(usuario.childNodes[1].childNodes[0].textContent.replace(/\s/g, " ").search(texto) != -1){
                        usuario.style.display = 'flex';
                    }
                    if(usuario.childNodes[1].childNodes[1].textContent.replace(/\s/g, " ").search(texto) != -1){
                        usuario.style.display = 'flex';
                    }
                    if(usuario.childNodes[1].childNodes[2].textContent.replace(/\s/g, " ").search(texto) != -1){
                        usuario.style.display = 'flex';
                    }
                    if(usuario.childNodes[1].childNodes[3].textContent.replace(/\s/g, " ").search(texto) != -1){
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

                if(usuario.childNodes[1].childNodes[0].textContent.replace(/\s/g, " ").search(texto) != -1){
                    usuario.style.display = 'flex';
                }
                if(usuario.childNodes[1].childNodes[1].textContent.replace(/\s/g, " ").search(texto) != -1){
                    usuario.style.display = 'flex';
                }
                if(usuario.childNodes[1].childNodes[2].textContent.replace(/\s/g, " ").search(texto) != -1){
                    usuario.style.display = 'flex';
                }
                if(usuario.childNodes[1].childNodes[3].textContent.replace(/\s/g, " ").search(texto) != -1){
                    usuario.style.display = 'flex';
                }
        
            });

        }
        
    });

}

export async function agregarProducto(){

    const botonAgregar = document.querySelector('#agregar');
    const producto = await validacionesProducto();

    botonAgregar.addEventListener('click', e =>{

        e.preventDefault();
        Swal.fire({
            title: 'Estas segur@?',
            text: "Se creara un producto al confirmar esta accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, agregar producto!'
        }).then(async (result) => {
            if (result.isConfirmed) {
              
                const resultado = await creacionProducto(producto);
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

export async function eliminarProducto(){

    const botones = document.querySelectorAll('#eliminar-producto');

    botones.forEach(async boton =>{

        boton.addEventListener('click', e =>{
            e.preventDefault();
            
            const identificador = parseInt(e.target.parentElement.dataset.idProducto);

            Swal.fire({
                title: 'Estas segur@ de realizar esta accion?',
                text: "Se eliminara un producto al confirmar esta accion!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar producto!'
              }).then(async (result) => {
                if (result.isConfirmed) {
                    
                    const resultado = await eliminacionProducto(identificador);
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

export async function editarProducto(){

    const botones = document.querySelectorAll('#ver-producto');

    botones.forEach(async boton =>{

        boton.addEventListener('click', async e =>{

            const identificador = parseInt(e.target.parentElement.dataset.idProducto);
            const producto = await obtenerProducto(identificador);
            const botonEditar = await ventanaProductoEditar(producto);
            const objeto = await validacionesProductoEditar(producto);

            botonEditar.addEventListener('click', e =>{

                e.preventDefault();

                Swal.fire({
                    title: 'Estas segur@ de realizar esta accion?',
                    text: "Se editara un producto al confirmar esta accion!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, editarlo!'
                }).then(async (result) => {
                    if (result.isConfirmed) {

                        const resultado = await edicionProducto(objeto, identificador);
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