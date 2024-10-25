// src/Signin.js
import React, { useState } from 'react';
import Navbar from './Navbar';
import { useAuth } from '../../AuthContext'; // Import the useAuth hook
import 'bootstrap/dist/css/bootstrap.min.css';
import "./../styles/fonts/icomoon/style.css";
import "./../styles/css/owl.carousel.min.css";
import "./../styles/css/bootstrap.min.css";
import "./../styles/css/style.css";
import undrawRemotely from './../../assets/img/undraw_remotely_2j6y.svg'; 

const Signin = () => {
    const { login } = useAuth(); // Get the login function from context
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Replace with your actual API endpoint
        const response = await fetch('https://your-api-endpoint.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        
        if (response.ok) {
            login(); // Call the login function from context
            // You can also save a token or user data if needed
        } else {
            alert('Login failed. Please try again.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="content full-height">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <img src={undrawRemotely} alt="Image" className="img-fluid" />
                        </div>
                        <div className="col-md-6 contents">
                            <div className="row justify-content-center">
                                <div className="col-md-8">
                                    <div className="mb-4">
                                        <h3>Sign In</h3>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group first">
                                            <label htmlFor="username">Email</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="username"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group last mb-4">
                                            <label htmlFor="password">Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <input
                                            type="submit"
                                            value="Log In"
                                            className="btn btn-block btn-primary"
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signin;
