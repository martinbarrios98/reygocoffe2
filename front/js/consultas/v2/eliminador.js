const urlBase = 'https://serverreygo.herokuapp.com/';

export async function eliminacionUsuario( id ){

    const req = await fetch(`${urlBase}usuarios/eliminar/${id}`,{
        mode: 'cors',
        method: 'delete',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    });
    const res = await req.json();

    return { req, res };
    
}

export async function eliminacionAdministrador( id ){
    const req = await fetch(`${urlBase}administradores/eliminar/${id}`,{
        mode: 'cors',
        method: 'delete',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    });
    const res = await req.json();

    return { req, res };
}

export async function eliminacionProducto(id){
    const req = await fetch(`${urlBase}productos/eliminar/${id}`,{
        mode: 'cors',
        method: 'delete',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    });
    const res = await req.json();

    return { req, res };
}