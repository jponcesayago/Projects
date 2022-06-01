import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types'
import { AddCategory } from './components/AddCategory'
import { GiftGrid } from './components/GiftGrid'

const GifExpertApp = () => {

    const [categories, setCategories] = useState(['One Punch'])


    return (
        <>
            <h2>GifExpertApp</h2>
            <AddCategory setCategories={setCategories} />
            <hr></hr>


            <ol>
                {
                    categories.map(
                        item => {
                            //return <li key={item}  >{item}</li>
                            return <GiftGrid
                                key={item}
                                category={item}
                            />
                        }
                    )
                }
            </ol>
        </>

    );

}


export default GifExpertApp;
