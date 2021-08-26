import React, { useMemo } from 'react';
import queryString from "query-string";
import { useLocation } from 'react-router-dom';
import { heroes } from '../../data/heroes'
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import './../../styles.css';
import { getHeroesByName } from '../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {

    const location = useLocation();
    //console.log(location.search);

    const { q = '' } = queryString.parse(location.search)



    const [formValues, handleInputChange, reset] = useForm({
        searchText: q
    });

    const { searchText } = formValues;

    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

    console.log(heroesFiltered);
    const handleSearch = (e) => {
        e.preventDefault();
        //console.log(searchText);
        history.push(`?q=${searchText}`);
        //reset();
    }

    return (
        <div className="fadeIn">
            <div className="row">
                <div className="col-5">
                    <h4> Search Form</h4>
                    <hr />
                    <form onSubmit={handleSearch}>
                        <input type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            name="searchText"
                            value={searchText}
                            onChange={handleInputChange} />
                    </form>
                    <button
                        type="submit"
                        className="btn m-1 btn-block btn-outline-primary">
                        Search...
                    </button>
                </div>
                <div className="col-7">
                    <h4>Results</h4>
                    <hr />
                    {
                        (q === '') && <div className="alert alert-info">
                            Search a hero
                        </div>
                    }
                    {
                        (q !== '' && heroesFiltered.length === 0) &&
                        <div className="alert alert-danger">
                            There is no hero with {q}
                        </div>
                    }
                    {
                        heroesFiltered.map(hero => (
                            <HeroCard
                                key={hero.id}
                                {...hero}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
