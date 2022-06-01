import React, { useReducer } from 'react'
import './styles.css';
import { todoReducer } from './todoReducer';

const initialState = [
    {
        id: new Date().getTime(),
        desc: 'Aprender React',
        done: false
    }
]
export const TodoApp = () => {

    const [todos, dispatch] = useReducer(todoReducer, initialState);


    const handleSubmit = (e) => {
        e.preventDefault();
        const newTodo = {
            id: new Date().getTime(),
            desc: 'Nueva Tarea',
            done: false
        };

        const action = {
            type: 'add',
            payload: newTodo
        };

        dispatch(action);
    }


    return (
        <div>
            <h1>TodoApp ({todos.length})</h1>
            <hr />

            <div className="row">
                <div className="col-7">
                    <ul className="list-group list-group-flush">
                        {
                            todos.map((todo, i) => {
                                return (

                                    <li className="list-group-item"
                                        key={todo.id}>


                                        <p className="text-center">
                                            {i + 1}. {todo.desc}
                                        </p>
                                        <button className="btn btn-danger">
                                            Borrar
                                        </button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="col-5">
                    <h4>Agregar TODO</h4>
                    <hr />

                    <form onSubmit={handleSubmit}>
                        <input
                            className="form-control"
                            type="text"
                            name="description"
                            placeholder="Aprender ...."
                            autoComplete="false">
                        </input>
                        <button type="submit"
                            className="btn btn-outline-primary mt-2 btn-block buttonClass" >
                            Agregar
                        </button>
                    </form>
                </div>

            </div>

        </div>


    )
}
