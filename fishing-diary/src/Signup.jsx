import {useState} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Signup(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/register', {name, email, password})
        .then (res => {console.log(res)
        navigate('/login')
        })
        .catch(err => console.log(err))
}

    return(
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            name="Name"
                            className="form-control rounded-0"
                            autoComplete="off"
                            placeholder="Enter Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
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
                            onChange={(e) => setEmail(e.target.value)}
                        />
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
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Register
                    </button>
                </form>
                    <p className="text-center mt-2">Already have an account?</p>
                    <Link to="/login" className="btn btn-light border w-100 rounded-0 bg-light text-decoration-none">
                        Login
                    </Link>
            </div>
        </div>
    )
}

export default Signup;