import React, { useLayoutEffect, useRef } from 'react'
import { useCounter } from '../../hooks/useCounter'
import { useFetch } from '../../hooks/useFetch'
import './examples.css'

export const MultipleCustomHooks = () => {


    const { counter, increment } = useCounter(1);
    const { loading, data } = useFetch(`https://www.breakingbadapi.com/api/quotes/${counter}`);
    const { author, quote } = !!data && data[0];
    //console.log(data);



    return (
        <div>
            <h1>Custom Hooks</h1>
            <hr></hr>


            {
                loading
                    ?
                    (
                        <div className="alert alert-info text-center">
                            loading...
                        </div>
                    )
                    :
                    (
                        <blockquote className="blockquote text-right">
                            <p className="mb-0">
                                {quote}
                            </p>
                            <br />
                            <footer className="blockquote-footer">{author}</footer>
                        </blockquote>
                    )
            }

            <button className="btn btn-primary"
                onClick={increment}>
                Siguiente Quote
            </button>
        </div>

    )
}
