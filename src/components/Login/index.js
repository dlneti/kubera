import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../actions/auth';
import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

const Login = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");


    const handleSubmit = () => {
        console.log("Submitting")

        // dispatch login to firebase

        console.log({email, password})
        dispatch(loginUser(email, password))

    }

    console.log(email, password);

    const handleChange = ({ target }) => {
        // console.log(target, target.value);

        const inputType = target.type
        // console.log(inputType)

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
            <Container >
                <form>
                    <h3>Sign In</h3>
                    {auth.loginError === true && <h1>Wrong password</h1>}

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" onChange={handleChange}/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" onChange={handleChange} />
                    </div>

                    <a href="#" className="btn btn-primary btn-block" onClick={handleSubmit}>Submit</a>
                    <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p>
                </form>
            </Container>
        )
    }
    
}

export default Login;