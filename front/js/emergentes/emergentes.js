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