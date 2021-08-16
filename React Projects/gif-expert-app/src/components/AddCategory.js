import React, { useState } from 'react'
import PropTypes from 'prop-types'


export const AddCategory = ({ setCategories }) => {

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(e);

        if (inputValue.trim().length > 2) {
            setCategories(item => [inputValue, ...item]);
            setInputValue('');
        }

    }
    return (
        <form onSubmit={handleSubmit}>

            <input
                placeholder="Categoría"
                type="text"
                value={inputValue}
                onChange={(e) => {
                    handleInputChange(e);

                }}
            ></input>
        </form>
    )
}


AddCategory.protoTypes = {
    setCategories: PropTypes.func.isRequired
}
