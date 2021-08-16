import { getUser, getUsuarioActivo } from '../../base/05-funciones'

describe('Pruebas en el archivo 05-funciones', () => {
    test('Test getUser 0 param ', () => {

        const userTest = {
            uid: 'ABC123',
            username: 'El_Papi1502'
        };

        const user = getUser();

        expect(user).toEqual(userTest);
    });

    test('Test getUsuarioActivo 1 param ', () => {

        const userTest = {
            uid: 'ABC567',
            username: 'Juan'
        };

        const user = getUsuarioActivo('Juan');

        expect(user).toEqual(userTest);
    });




})
