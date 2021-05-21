export function alertaNotificacion ( mensaje, mensaje2, tipo ){

    const contenedorBody = document.querySelector('body');

    if(document.querySelector('.notificacion')){
        document.querySelector('.notificacion').remove();
    }

    //Creacion del nodo de notificacion
    const contenedorNotificacion = document.createElement('div');
    if(tipo === 'error'){
        contenedorNotificacion.classList.add('error');
    }else if(tipo === 'exito'){
        contenedorNotificacion.classList.add('exito');
    }
    contenedorNotificacion.classList.add('notificacion');
    //Nodo titulo
    const contenedorTitulo = document.createElement('p');
    contenedorTitulo.textContent = mensaje;
    contenedorTitulo.classList.add('titulo-notificacion');
    //Nodo Parrafo
    const contenedorParrafo = document.createElement('p');
    contenedorParrafo.textContent = mensaje2;
    contenedorParrafo.classList.add('parrafo-notificacion');
    //appends para notificacion
    contenedorNotificacion.appendChild(contenedorTitulo);
    contenedorNotificacion.appendChild(contenedorParrafo);
    //append al body
    contenedorBody.appendChild(contenedorNotificacion);
    
    //Efecto para notificacion
    setTimeout(() => {
        contenedorNotificacion.classList.add('visible');
        setTimeout(() => {
            contenedorNotificacion.classList.remove('visible')
            setTimeout(() => {
                contenedorNotificacion.remove()
            }, 500);
        }, 2000);
    }, 100);
    

}

export function ventanaImagenMax(src){

    const contenedorBody = document.querySelector('body');

    //Crear nodo imagen max

    let nodoImg = document.createElement('div');
    nodoImg.classList.add('img-max');

    //Nodo Imagen
    let nodoImgHijo = document.createElement('img');
    nodoImgHijo.src = src;

    //Boton Cerrar Imagen Max

    let btnCerrar = document.createElement('p');
    btnCerrar.classList.add('btn-cerrar');
    btnCerrar.innerHTML = 'X';


    //Proceder a agregar con appendchild

    nodoImg.appendChild(nodoImgHijo); // Agregar img a div imagen-max
    nodoImg.appendChild(btnCerrar);

    //Agregamos el nodo completo al HTML

    contenedorBody.classList.add('bloquear');
    contenedorBody.appendChild(nodoImg);

    //Funciones para cerrar imagen max
    nodoImg.onclick = function (){
        nodoImg.remove();
        contenedorBody.classList.remove('bloquear');
    }
    btnCerrar.onclick = function (){
        nodoImg.remove();
        contenedorBody.classList.remove('bloquear');
    }
}