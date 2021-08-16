import { getHeroeById, getHeroesByOwner } from '../../base/08-imp-exp'
import heroes from '../../data/heroes.js';

describe('Pruebas en el archivo 08-imp-exp', () => {
    test('Test getHeroeById  return heroe by id', () => {

        const id = 1;

        const heroe = getHeroeById(id);

        const heroeData = heroes.find(h => h.id === id);

        expect(heroe).toEqual(heroeData);
    });


    test('Test getHeroeById  return bye id undefined ', () => {

        const id = 10;

        const heroe = getHeroeById(id);

        const heroeData = heroes.find(h => h.id === id);

        expect(heroe).toBe(undefined);
    });


    test('Test getHeroesByOwner by id  return array o objects ', () => {

        const owner = 'DC';

        const heroe = getHeroesByOwner(owner);

        const heroeData = heroes.filter(h => h.owner === owner);

        expect(heroe).toEqual(heroeData);
    });

    test('Test getHeroesByOwner by owner array length 0 ', () => {

        const owner = 'DC';

        const heroe = getHeroesByOwner(owner);

        const heroeData = heroes.filter(h => h.owner === owner);

        expect(heroe).toEqual([]);
    });

})
