const urlBase = 'https://serverreygo.herokuapp.com/';

export async function creacionUsuario(objeto){

    let datos = [];
    for (let property in objeto) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(objeto[property]);
    datos.push(encodedKey + "=" + encodedValue);
    }
    datos = datos.join("&");

    const req = await fetch(`${urlBase}usuarios/nuevo`,{
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