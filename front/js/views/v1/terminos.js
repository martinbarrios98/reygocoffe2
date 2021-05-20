import { alertaNotificacion } from '../../emergentes/emergentes.js';

export async function insertarInformacion (){
    const contenedorNavegadorEnlaces = document.querySelectorAll('.navegador-terminos a');
    const contenedorInformacion = document.querySelector('.contenedor-informacion-navegador');


    contenedorNavegadorEnlaces.forEach( async enlace =>{

        enlace.addEventListener('click', e =>{

            e.preventDefault();
            const contenedorEnlace = e.target;

            if(document.querySelector('.activo')){
                const activos = document.querySelectorAll('.activo');
                activos.forEach(async activo =>{
                    activo.classList.remove('activo');
                });
            }

            contenedorEnlace.classList.add('activo');
            contenedorInformacion.classList.add('activo-contenedor');
            const enlaceActivo = e.target.textContent.trim();
            
            if(enlaceActivo === 'Envios a todo México'){

                contenedorInformacion.innerHTML = '';

                const encabezado = document.createElement('h3');
                encabezado.textContent = 'ENVÍOS A TODO MÉXICO';

                const descripcion = document.createElement('div');
                descripcion.innerHTML = `
                    <p>*Aplican restricciones a zonas urbanas que nos limitan las paqueterías.</p>
                `;



                contenedorInformacion.appendChild(encabezado);
                contenedorInformacion.appendChild(descripcion);

            }

            if(enlaceActivo === 'Politicas de Garantia'){

                contenedorInformacion.innerHTML = '';

                const encabezado = document.createElement('h3');
                encabezado.textContent = 'POLÍTICAS DE GARANTÍA REYGO COFFE';

                const descripcion = document.createElement('ul');
                descripcion.classList.add('lista-garantia');
                descripcion.innerHTML = `
                    <li>
                        <p>1. En caso de requerir una garantía, enviar un correo a reygo_coffe_info@hotmai.com.mx, especificando los siguientes datos:</p>
                    </li>
                    <li>
                        <p>2. Las garantías están sujetas a las políticas del fabricante.</p> 
                    </li>
                    <li>
                        <p>3. La garantía aplica contra defectos de fabricación y partes de manufactura.</p>  
                    </li>
                    <li>
                        <p>4. No aplica garantía en caso de haber acudido a un técnico NO certificado (ajeno a Reygo Coffe) o haber intervenido el equipo de manera propia.</p> 
                    </li>
                    <li>
                        <p>5. No aplica garantía al mal uso del producto.</p> 
                    </li>
                `;



                contenedorInformacion.appendChild(encabezado);
                contenedorInformacion.appendChild(descripcion);
                
            }

            if(enlaceActivo === 'Politica de Entregas'){

                contenedorInformacion.innerHTML = '';

                const encabezado = document.createElement('h3');
                encabezado.textContent = 'POLÍTICA DE ENTREGA DE MERCANCÍA COMPRA EN LÍNEA REYGO COFFE';

                const descripcion = document.createElement('ul');
                descripcion.classList.add('lista-entraga');
                descripcion.innerHTML = `
                    <li class="sin-pandding" >
                        <p>Entregas Locales</p>
                        <p>Con el fin de dar un mejor servicio, Reygo Coffe especifica el modo de entrega a clientes locales.
                        Se consideran clientes locales las siguientes zonas: Teapa:Tabasco , Pichucalco:Tabasco , Jalapa:Tabasco , Villahermosa:Tabasco .</p> 
                    </li>
                    <li>
                        <p>1. Una vez recibido el pedido, la entrega se programará en un periodo de 24 horas; las entregas son a partir de las 10:00 a.m. hasta las 5:00 p.m.</p>
                    </li>
                    <li>
                        <p>2. La mercancía será descargada a pie de camioneta, no se realizarán movimientos en segundos pisos, aeropuertos o centros comerciales que cuenten con un horario de entrega específico.</p>
                    </li>
                    <li>
                        <p>3. Al entregar la mercancía se solicitará firma de la factura (se requerirá nombre, fecha y firma)..</p>
                    </li>
                    <li>
                        <p>4. Todas las entregas de compra en línea deberán estar previamente pagadas, ya que el repartidor no aceptará efectivo.</p>
                    </li>
                    <li>
                        <p>5. Para entregas locales a domicilio, el monto de compra debe ser mayor a $1,000.00 netos, de lo contrario la mercancía se recolecta en matriz o sucursal; se considera entrega local las siguientes zonas: Teapa:Tabasco , Pichucalco:Tabasco , Jalapa:Tabasco , Villahermosa:Tabasco.</p>
                    </li>
                    <li class="sin-pandding">
                        <p>Entrega Foráneas</p>
                        <p>En caso de entregas foráneas, Reygo Coffe o la paquetería seleccionada seguirá las siguientes especificaciones:</p> 
                    </li>
                    <li>
                        <p>1. Es importante mencionar que para poder cumplir con la entrega, es necesario que la dirección de facturación y del destinatario contenga datos completos:</p>
                        <div class="lista-secundaria">
                            <p>Nombre de calle y numeración correcta.</p>
                            
                            <p>Colonia, ciudad y estado.</p>
                            
                            <p>Código postal.</p>
                            
                            <p>Nombre y teléfono de contacto.</p>
                            
                            <p>Referencias del domicilio.</p>
                        </div>
                    </li>
                    <li>
                        <p>2. La mercancía será descargada a pie de camioneta. No se desempacará ni se subirá a ningún nivel (no se hacen entregas en aeropuertos, centros comerciales, segundos pisos y no incluyen maniobra o entrega con horario).</p>
                    </li>
                    <li>
                        <p>3. Se recolectará firma de recibido ya sea en la guía de embarque o algún documento anexo por parte de Odisa o la paquetería.</p>
                    </li>
                    <li>
                        <p>4. Actualmente no se encuentra disponible la entrega de órdenes en direcciones internacionales.</p>
                    </li>
                    <li>
                        <p>5. Los artículos son empaquetados para su cuidado y protección, por lo que no contamos con envolturas particulares de la marca.</p>
                    </li>
                    <li>
                        <p>6. Los tiempos de entrega dependerán del código postal al que se envíen..</p>
                    </li>
                    <li class="sin-pandding">
                        <p>En caso de más información puede comunicarse al número 01 333 777 4303 departamento de Atención a Clientes Web.</p>
                    </li>

                `;



                contenedorInformacion.appendChild(encabezado);
                contenedorInformacion.appendChild(descripcion);

            }

            if(enlaceActivo === 'FAQ'){

                contenedorInformacion.innerHTML = '';

                const encabezado = document.createElement('h3');
                encabezado.textContent = 'PREGUNTAS FRECUENTES';

                const descripcion = document.createElement('ul');
                descripcion.classList.add('lista-preguntas');
                descripcion.innerHTML = `
                    <li>
                        <p>¿Cómo funcionan las devoluciones?</p>
                        <p>No realizamos devoluciones de efectivo o crédito, en caso de requerir una, esta solo aplica con el cambio del mismo producto o por otro del mismo importe; para más información consulta nuestras Políticas de Devolución..</p> 
                    </li>
                    <li>
                        <p>¿Cuánto tiempo tarda en llegar el envío?</p>
                        <p>El tiempo de entrega depende del código postal al que se envíe, normalmente son de 2 a 5 días habiles a excepción de zonas extendidas.</p> 
                    </li>
                    <li>
                        <p>¿Cómo puedo revisar el estado de mi orden?</p>
                        <p>Puedes revisar el estado de tu orden mediante tu cuenta, en la página de la paquetería con tu número de guía.</p>
                    </li>
                    <li>
                        <p>¿Puedo agregar o modificar mi orden?</p>
                        <p>Se podrá modificar directamente en el carrito antes de cerrar tu pedido, una vez que se cierra tu compra, será necesario comunicarse a atención al cliente: ******.</p>
                    </li>
                    <li>
                        <p>¿Puedo cancelar mi orden?</p>
                        <p>Tu pedido se podrá cancelar en un lapso de tiempo posterior a 12 horas, sí se realizó algún pago, esté quedará como saldo a favor en tu cuenta, ya que la empresa no realiza reembolsos.</p> 
                    </li>
                    <li>
                        <p>¿Hay alguna cantidad mínima para ordenar productos desde el sitio web?</p>
                        <p>No tenemos un mínimo de compra, puedes ordenar cualquier producto de nuestro sitio web.
                        En compras mayores a $1,000.00 MXN la entrega será gratuita dentro de la zonas de Teapa:Tabasco , Pichucalco:Tabasco , Jalapa:Tabasco , Villahermosa:Tabasco. Para más información consulta nuestras políticas de entrega.</p> 
                    </li>
                    <li>
                        <p>Mi orden no llegó completa ¿qué debo hacer?</p>
                        <p>En caso de que faltara alguno de los productos que ordenaste por favor de comunícate al área de atención a clientes al ******* o envía un correo a reygo_coffe_info@hotmai.com.mx especificando el número de factura y cuales fueron los productos que recibiste.</p> 
                    </li>
                    <li>
                        <p>¿Cuánto costará el envío de mi orden?</p>
                        <p>El costo del envío dependerá del código postal del destinatario, antes de finalizar tu compra, se calculará el precio del flete conforme al domicilio de entrega que se haya registrado.</p> 
                    </li>
                    <li>
                        <p>¿Qué métodos de envío utilizan?</p>
                        <p>Nuestros envíos son realizados por medio de Estafeta</p> 
                    </li>
                    <li>
                        <p>¿Mi tarjeta de crédito y mi información personal están seguras cuando ordeno desde su sitio web?</p>
                        <p>Por cuestiones de seguridad de nuestros clientes no se guarda ningun tipo de informacion bancaria en el sitio web</p>
                    </li>
                `;



                contenedorInformacion.appendChild(encabezado);
                contenedorInformacion.appendChild(descripcion);

            }

            

        })

    })

}