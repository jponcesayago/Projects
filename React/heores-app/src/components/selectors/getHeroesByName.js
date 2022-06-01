import { heroes } from "../../data/heroes";

export const getHeroesByName = (superhero = '') => {

    if (superhero === '') {
        return [];
    }

    return heroes.filter(heroe => {
        return heroe.superhero.toLocaleLowerCase().includes(superhero);
    })
}
