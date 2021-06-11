const urlBase = 'https://serverreygo.herokuapp.com/';

export async function edicionUsuario(objeto, id){

    let datos = [];
    for (let property in objeto) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(objeto[property]);
    datos.push(encodedKey + "=" + encodedValue);
    }
    datos = datos.join("&");

    const req = await fetch(`${urlBase}usuarios/editar/${id}`,{
        mode: 'cors',
        method: 'put',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: datos
    });
    const res = await req.json();

    return { req, res };

    

}

export async function edicionAdministrador(objeto, id){
    const informacion = JSON.parse(localStorage.getItem('sesion_in_admin'));
    const token = informacion.token;
    let datos = [];
    for (let property in objeto) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(objeto[property]);
    datos.push(encodedKey + "=" + encodedValue);
    }
    datos = datos.join("&");

    const req = await fetch(`${urlBase}administradores/editar/${id}`,{
        mode: 'cors',
        method: 'put',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'token': token
        },
        body: datos
    });
    const res = await req.json();

    return { req, res };
}

export async function edicionProducto(objeto, id){
    const informacion = JSON.parse(localStorage.getItem('sesion_in_admin'));
    const token = informacion.token;
    let datos = [];
    for (let property in objeto) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(objeto[property]);
    datos.push(encodedKey + "=" + encodedValue);
    }
    datos = datos.join("&");

    const req = await fetch(`${urlBase}productos/editar/${id}`,{
        mode: 'cors',
        method: 'put',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'token': token
        },
        body: datos
    });
    const res = await req.json();

    return { req, res };
}

export async function edicionPedido(objeto, id){
    const informacion = JSON.parse(localStorage.getItem('sesion_in_admin'));
    const token = informacion.token;
    let datos = [];
    for (let property in objeto) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(objeto[property]);
    datos.push(encodedKey + "=" + encodedValue);
    }
    datos = datos.join("&");

    const req = await fetch(`${urlBase}pedidos/editar/${id}`,{
        mode: 'cors',
        method: 'put',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'token': token
        },
        body: datos
    });
    const res = await req.json();

    return { req, res };

}

export async function edicionCategoria(objeto, id){
    const informacion = JSON.parse(localStorage.getItem('sesion_in_admin'));
    const token = informacion.token;
    let datos = [];
    for (let property in objeto) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(objeto[property]);
    datos.push(encodedKey + "=" + encodedValue);
    }
    datos = datos.join("&");

    const req = await fetch(`${urlBase}categorias/editar/${id}`,{
        mode: 'cors',
        method: 'put',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'token': token
        },
        body: datos
    });
    const res = await req.json();

    return { req, res };
}