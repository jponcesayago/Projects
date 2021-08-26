import React from 'react'
import { Link } from 'react-router-dom'

export const RegisterScreen = () => {
    return (
        <>
            <h3 className="auth__title">Register</h3>
            <form>
                <input className="auth__input" type="text"
                    placeholder="Name"
                    name="name" />
                <input className="auth__input" type="text"
                    placeholder="email"
                    name="email" />
                <input className="auth__input"
                    type="password"
                    placeholder="passwotd"
                    name="password" />
                <input className="auth__input"
                    type="password"
                    placeholder="Confirm"
                    name="confirm" />
                <button type="submit" className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>



                <Link to="/auth/login" className="link mt-5">
                    Already registered?
                </Link>
            </form>
        </>
    )
}
