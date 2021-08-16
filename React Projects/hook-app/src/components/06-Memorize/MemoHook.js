import React, { useMemo, useState } from 'react'
import { useCounter } from '../../hooks/useCounter'


export const MemoHook = () => {

    const { counter, increment } = useCounter(5000);

    const [show, setShow] = useState(true);

    const procesoPesado = (iteraciones) => {

        for (let i = 0; i < iteraciones; i++) {
            console.log('Ahi vamos....')
        }

        return `${iteraciones} iteraciones realizadas`;
    }

    const memoProcesoPesado = useMemo(() => procesoPesado(counter), [counter]);

    return (
        <div>
            <h1>Memo Hook</h1>
            <h3>Memorize <small>{counter}</small></h3>
            <hr />

            <p> {memoProcesoPesado}</p>

            <button
                className="btn btn-primary"
                onClick={increment} >
                +1
            </button>

            <button className="btn btn-outline-primary"
                onClick={() => {
                    setShow(!show)
                }}>
                Show/Hide {JSON.stringify(show)}
            </button>
        </div>
    )
}
