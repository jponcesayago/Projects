//Funtional Components
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types'

const CounterApp = ({ value }) => {

    const [counter, setCounter] = useState(value);


    //console.log(nombre, setNombre);



    const handleAdd = () => {
        setCounter(counter + 1)
    }

    const handleSubstract = () => {
        setCounter(counter - 1)
    }

    const handleReset = () => {
        setCounter(value)
    }


    return (
        <>
            <h1>CounterApp</h1>
            <p>{counter}</p>

            <button onClick={handleAdd}>+1</button>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleSubstract}>-1</button>
        </>

    );

}

CounterApp.protoTypes = {
    value: PropTypes.number.isRequired
}

CounterApp.defaultProps = {
    value: 0
}

export default CounterApp;
