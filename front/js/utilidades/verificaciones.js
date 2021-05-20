export async function verificarLength(objeto){
    if(Array.isArray(objeto)){
        return true;
    }else{
        return false
    }
}