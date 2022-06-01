import React, { useMemo } from 'react'
import { getHeroesByPublisher } from '../selectors/getHeroesByPublisher'
import { HeroCard } from './HeroCard';
import './heroes.css';
import './../../styles.css';

export const HeroList = ({ publisher }) => {

    const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher])

    console.log(heroes);


    return (

        <div className="card-columns fadeIn">
            {
                heroes.map(
                    (hero) => (
                        < HeroCard key={hero.id}{...hero} />
                    ))
            }
        </div>


    )
}
