import { getSaludo } from "../../base/02-template-string";

describe('Pruebas en el archivo 02-template-string', () => {
    test('Test getSaludo 1 param(nombre) ', () => {

        const nombre = 'Fernando';

        const saludo = getSaludo(nombre);

        expect(saludo).toBe('Hola ' + nombre);
    });

    test('Test getSaludo 0 params ', () => {

        const saludo = getSaludo()

        expect(saludo).toBe('Hola Carlos')

    })

})
