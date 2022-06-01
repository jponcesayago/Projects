import { retornaArreglo } from '../../base/07-deses-arr'

describe('Pruebas en el archivo 07-deses-arr', () => {
    test('Test retornaArreglo 0 param ', () => {

        const [letras, numeros] = retornaArreglo();

        expect(letras).toBe('ABC');
        expect(typeof letras).toBe('string');
        expect(numeros).toBe(123);
        expect(typeof numeros).toBe('number');
    });






})
