const urlBase = 'http://localhost:3000/';

export async function inicio(){
    const req = await fetch(urlBase,{
        mode: 'cors'
    });
    const res = req.json();
    return res;
}

export async function descargarCategorias(){
    const req = await fetch(`${urlBase}categorias`, {
        mode: 'cors'
    });
    const res = await req.json();
    const categorias = await res.categorias;
    return categorias;
}

export async function descargarCategoria(id){
    const req = await fetch(`${urlBase}categorias/${id}`, {
        mode: 'cors'
    });
    const res = await req.json();
    const categoria = await res.categoria;
    return categoria;
}

export async function descargarProductos(){

    const req = await fetch(`${urlBase}productos`, {
        method: 'get',
        mode: 'cors'
    });

    const res = await req.json();
    const productos = await res.productos;

    return productos;

}

export async function descargarProductosCat( id ){

    const req = await fetch(`${urlBase}productos/${id}`,{
        mode: 'cors'
    });

    const res = await req.json();
    const productos = await res.productos;

    return productos;

} 

export async function obtenerUltimosProductos(){
    const req = await fetch(`${urlBase}products/ultimos`, {
        method: 'get',
        mode: 'cors'
    });
    const res = await req.json();
    const productos = await res.productos;
    return productos;
}

export async function obtenerUsuario(id){
    const req = await fetch(`${urlBase}usuarios/unico/${id}`, {
        method: 'get',
        mode: 'cors'
    });
    const res = await req.json();
    const usuario = await res.usuario;
    return usuario;
}

export async function obtenerProducto(id){
    const req = await fetch(`${urlBase}productos/unico/${id}`, {
        method: 'get',
        mode: 'cors'
    });
    const res = await req.json();
    const producto = await res.producto;
    return producto;
}