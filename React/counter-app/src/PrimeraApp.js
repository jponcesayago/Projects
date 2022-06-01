//Funtional Components
import React, { Fragment } from 'react';
import PropTypes from 'prop-types'


const PrimeraApp = ({ saludo = "Hola Mundo", subtitulo }) => {



    return (
        <>
            <h1>{saludo}</h1>
            <p>{subtitulo}</p>
        </>

    );

}

PrimeraApp.protoTypes = {
    saludo: PropTypes.string.isRequired
}

PrimeraApp.defaultProps = {
    subtitulo: "Hola soy un subtitulo"
}
export default PrimeraApp;
