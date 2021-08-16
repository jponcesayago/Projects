

const personajes = ['Goku', 'Vegeta', 'Trunks'];
const [, , p3] = personajes;
console.log(p3);


export const retornaArreglo = () => {
    return ['ABC', 123];
}

export const [letras, numeros] = retornaArreglo();
console.log(letras, numeros);


// Tarea
// 1. el primer valor del arr se llamará nombre
// 2. se llamará setNombre
export const useState = (valor) => {
    return [valor, () => { console.log('Hola Mundo') }];
}
