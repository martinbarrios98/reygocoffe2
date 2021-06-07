const urlBase = 'https://serverreygo.herokuapp.com/';

export async function eliminacionUsuario( id ){
    const informacion = JSON.parse(localStorage.getItem('sesion_in_admin'));
    const token = informacion.token;

    const req = await fetch(`${urlBase}usuarios/eliminar/${id}`,{
        mode: 'cors',
        method: 'delete',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'token': token
        }
    });
    const res = await req.json();

    return { req, res };
    
}

export async function eliminacionAdministrador( id ){
    const informacion = JSON.parse(localStorage.getItem('sesion_in_admin'));
    const token = informacion.token;
    const req = await fetch(`${urlBase}administradores/eliminar/${id}`,{
        mode: 'cors',
        method: 'delete',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'token': token
        }
    });
    const res = await req.json();

    return { req, res };
}

export async function eliminacionProducto(id){
    const informacion = JSON.parse(localStorage.getItem('sesion_in_admin'));
    const token = informacion.token;
    const req = await fetch(`${urlBase}productos/eliminar/${id}`,{
        mode: 'cors',
        method: 'delete',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'token': token
        }
    });
    const res = await req.json();

    return { req, res };
}