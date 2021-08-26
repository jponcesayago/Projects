import { heroes } from "../../data/heroes";

export const getHeroById = (id) => {


    return heroes.find(heroe => {
        return heroe.id === id;
    })
}
