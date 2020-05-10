import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../actions/auth';
import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Header from './Header';

const Login = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");


    const handleSubmit = event => {
        event.preventDefault()                  // prevent default button action
        dispatch(loginUser(email, password))    // dispatch login to firebase
    }

    const handleChange = ({ target }) => {
        const inputType = target.type

        if (inputType === 'email') {
            setEmail(target.value)
        } else if (inputType === 'password') {
            setPassword(target.value)
        }
    }
    
    if (auth.isAuthenticated) {
        return <Redirect to="/" />
    } else {
        // Login page
        return (
                <div>
                    <Header />

                    <div className="login-container">
                        <div className="login shadow-wide">
                            <form> 
                                <h1 className="login-item">Log In</h1>
                                {auth.loginError === true && <span className="login-item" style={{color: "#f44336"}}>Email or password are incorrect!</span>}

                                <input type="email" className="login-item" placeholder="Email" onChange={handleChange}/>

                                <input type="password" className="login-item" placeholder="Password" onChange={handleChange} />

                                <button href="#" className="login-item shadow-low" onClick={handleSubmit}>Log in</button>
                                <span className="login-item">
                                    <a href="#">Forgot password?</a>
                                </span>
                            </form>
                        </div>
                    </div>
                </div>
                
        )
    }
    
}

export default Login;