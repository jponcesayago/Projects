import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { HeroList } from './HeroList'
import { getHeroById } from './../selectors/getHeroById'

export const HeroesScreen = ({ history }) => {

    const { heroeId } = useParams();
    //console.log(heroeId);

    const hero = useMemo(() => getHeroById(heroeId), [heroeId])
    if (!hero) {
        return <Redirect to="/" />
    }

    const handleReturn = () => {
        if (history.length <= 2) {
            history.push('/');
        } else {
            history.goBack();
        }

    }

    const {
        id,
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = hero;
    //console.log(hero);


    return (
        <div className="row mt-5 fadeIn">
            <div className="col-4 fadeinleft">
                <img src={`../assets/heroes/${heroeId}.jpg`} className="img-thumbnail" alt={superhero}></img>

            </div>
            <div className="col-8">
                <h3 className="">{superhero}</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Alter ego: </b> {alter_ego}</li>
                    <li className="list-group-item"><b>Publisher: </b> {publisher}</li>
                    <li className="list-group-item"><b>First appearance: </b> {first_appearance}</li>
                </ul>

                <h5 >Characters</h5>
                <p>{characters}</p>
                <button onClick={handleReturn}
                    className="btn btn-outline-info">
                    Return
                </button>
            </div>
        </div>
    )
}
