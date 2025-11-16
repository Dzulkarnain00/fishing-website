import React, {useState} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please enter both email and password");
            return;
        }
        axios.post('http://localhost:3001/login', {email, password})
            .then (res => {
                console.log(res)
                if(res.data.message === "Success") {
                    const {accessToken, refreshToken} = res.data;
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    localStorage.setItem('userEmail', email);
                    navigate('/');
                } else {
                    alert(res.data.message || "Login failed");
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="Email"
                            name="Email"
                            className="form-control rounded-0"
                            autoComplete="off"
                            placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="Password"
                            name="Password"
                            className="form-control rounded-0"
                            autoComplete="off"
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Login
                    </button>
                </form>
                <p className="text-center mt-2">Don't have an account?</p>
                <Link to="/register" className="btn btn-light border w-100 rounded-0 bg-light text-decoration-none">
                    Sign Up
                </Link>
            </div>
        </div>
    )
}

export default Login;