
describe('Pruebas en el archivo demo', () => {
    test('deben ser iguales los string ', () => {

        const mensaje = 'Hola Mundo';

        const mensaje2 = "Hola Mundo!";

        expect(mensaje).toBe(mensaje2);
    });
})
