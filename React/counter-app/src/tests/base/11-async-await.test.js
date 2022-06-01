import { getImagen } from '../../base/11-async-await';


describe('Pruebas en el archivo 09-async-await', () => {
    test('Test getImagen  return url', async () => {

        const id = 1;

        const url = await getImagen();


        console.log(url)
        expect(url.includes('https://')).toBe(true);
    });






})
