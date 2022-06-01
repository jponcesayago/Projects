import React, { useLayoutEffect, useRef } from 'react'
import { useCounter } from '../../hooks/useCounter'
import { useFetch } from '../../hooks/useFetch'
import './layout.css'

export const LayoutEffect = () => {


    const { counter, increment } = useCounter(1);
    const { loading, data } = useFetch(`https://www.breakingbadapi.com/api/quotes/${counter}`);
    const { author, quote } = !!data && data[0];
    //console.log(data);

    const pTag = useRef();

    useLayoutEffect(() => {
        console.log(pTag.current.getBoundingClientRect());
    }, [quote])

    return (
        <div>
            <h1>Layout Effect</h1>
            <hr></hr>


            <blockquote className="blockquote text-right">
                <p ref={pTag} className="mb-0">
                    {quote}
                </p>
                <br />
                <footer className="blockquote-footer">{author}</footer>
            </blockquote>


            <button className="btn btn-primary"
                onClick={increment}>
                Siguiente Quote
            </button>
        </div>

    )
}
