import React, { useState } from 'react'

export const useForm = (inisialState = {}) => {


    const [values, setValues] = useState(inisialState)

    const reset = () => {
        setValues(inisialState);
    }

    const handleInputChange = ({ target }) => {
        //console.log(target.value);
        setValues(
            {
                ...values,
                [target.name]: target.value
            }
        )
    }

    return [values, handleInputChange, reset];
}
