
const urlBase = 'https://serverreygo.herokuapp.com/';

export async function accesoToken(){

    //Formato encoded para el body
    const params = new URLSearchParams()
    params.append('grant_type', parametros.type);

    //Hasheamos el client id y secret
    const hash = btoa(`${parametros.client_id}:${parametros.secret}`);

    const req = await fetch(parametros.url, {
        mode: 'cors',
        method: 'post',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${hash}`
        },
        body: params
    });

    const res = await req.json();

    return res;

}

export async function crearPedido(objeto){

    let datos = [];
    for (let property in objeto) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(objeto[property]);
    datos.push(encodedKey + "=" + encodedValue);
    }
    datos = datos.join("&");

    const req = await fetch(`${urlBase}pedido/nuevo`,{
        mode: 'cors',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: datos
    });
    const res = await req.json();

    return { req, res };

}

export async function validacionPago(objeto) {
    let datos = [];
    for (let property in objeto) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(objeto[property]);
    datos.push(encodedKey + "=" + encodedValue);
    }
    datos = datos.join("&");

    const req = await fetch(`${urlBase}pedido/validacion`,{
        mode: 'cors',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: datos
    });
    const res = await req.json();

    return { req, res };
}