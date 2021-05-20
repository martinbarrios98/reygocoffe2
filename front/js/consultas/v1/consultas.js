export async function descargarDatosCategorias (){

    const req = await fetch('front/public/json/categorias.json');
    const res = await req.json();
    const categorias = await res.categorias;

    return categorias;


}

export async function descargarDatosProductos(){

    const req = await fetch('front/public/json/productos.json');
    const res = await req.json();
    const productos = await res.productos;

    return productos;

}