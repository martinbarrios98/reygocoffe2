const urlBase = 'https://serverreygo.herokuapp.com/';

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

export async function obtenerUsuarios(){
    const req = await fetch(`${urlBase}usuarios`, {
        method: 'get',
        mode: 'cors'
    });
    const res = await req.json();
    const usuarios = await res.usuarios;
    return usuarios;
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

export async function obtenerPedidos(){
    const req = await fetch(`${urlBase}pedidos`,{
        mode: 'cors',
        method: 'get'
    });

    const res = await req.json();
    const pedidos = await res.pedidos;
    return {
        res,
        pedidos
    }
}

export async function obtenerPedidosUsuario(id){

    const resultado = await obtenerPedidos();
    const pedidos = await resultado.pedidos;

    let informacion = [];

    pedidos.forEach(async pedido =>{

        if(pedido.usuario.id === id){
            informacion.push(pedido);
        }

    });

    return informacion;

}

export async function obtenerUltimosUsuarios(){

    const req = await fetch(`${urlBase}usuarios/ultimos`, {
        method: 'get',
        mode: 'cors'
    });
    
    const res = await req.json();
    const usuarios = res.usuarios;

    return usuarios;

}

export async function obtenerUltimosPedidos(){

    const req = await fetch(`${urlBase}pedidos/ultimos`, {
        method: 'get',
        mode: 'cors'
    });
    
    const res = await req.json();
    const pedidos = res.pedidos;

    return pedidos;

}

export async function obtenerAdministradores(){

    const req = await fetch(`${urlBase}administradores`, {
        method: 'get',
        mode: 'cors'
    });
    
    const res = await req.json();
    const administradores = res.administradores;

    return administradores;

}

export async function obtenerAdministrador(id){

    const req = await fetch(`${urlBase}administradores/unico/${id}`, {
        method: 'get',
        mode: 'cors'
    });
    
    const res = await req.json();
    const administrador = res.administrador;

    return administrador;

}

export async function obtenerPedido(id){

    const req = await obtenerPedidos();
    const pedidos = await req.pedidos;

    let pedido;

    pedidos.forEach(async ped =>{

        if(parseInt(ped.id) === parseInt(id)){
            pedido = ped;
        }

    });

    return pedido;

}

export async function obtenerFechasPedido(){
    const req = await obtenerPedidos();
    const pedidos = await req.pedidos;

    const fechas = [];

    if(pedidos){
        pedidos.forEach(async pedido =>{
    
            fechas.push(pedido.fecha.split('T')[0]);
    
        });
    }

    return fechas;
}