import React, { useRef } from 'react'

export const FocusScreen = () => {

    const inputRef = useRef();

    const handleClick = () => {

        inputRef.current.select();

    }
    return (
        <div>
            <h1>Focus Screen</h1>
            <hr></hr>
            <input
                ref={inputRef}
                className="form-control"
                placeholder="Su nombre" />

            <button
                className="btn btn-outline-primary mt-5"
                onClick={handleClick}>
                Focus
            </button>

        </div>
    )
}
