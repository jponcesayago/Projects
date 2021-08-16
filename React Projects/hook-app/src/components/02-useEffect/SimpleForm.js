import React, { useEffect, useState } from 'react';
import './effects.css';
import { Message } from './Message';

export const SimpleForm = () => {

    const [formState, setformState] = useState({
        name: '',
        email: ''
    });

    const { name, email } = formState;

    useEffect(() => {
        console.log('name')
    }, [name]); // Dispara la renderización ante el cambio de una variable!

    const handleInputChange = ({ target }) => {
        //console.log(target.value);
        setformState(
            {
                ...formState,
                [target.name]: target.value
            }
        )
    }
    return (
        <>
            <h1>usEffect</h1>
            <hr />
            <div className="form-group">
                <input
                    type="text" name="name"
                    className="form-control"
                    placeholder="Tu nombre"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}>

                </input>
            </div>

            <div className="form-group">
                <input
                    type="text" name="email"
                    className="form-control"
                    placeholder="email@gmail.com"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}>

                </input>
            </div>

            {(name === 'juan') && <Message />}
        </>
    )
}
