import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import useSignup from '../../hook/useSignup'; // Import the custom hook
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const mutation = useSignup(); // Use the custom hook
    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({ name, email, password }); // Trigger the mutation
    };

    return (
        <>
            <Navbar />
            <section style={{ backgroundColor: '#eee' }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: '25px' }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign Up</p>
                                            <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                                                <div className="form-floating mb-4">
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        id="floatingName" 
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)} 
                                                        placeholder="Your Name" 
                                                        required 
                                                    />
                                                    <label htmlFor="floatingName">Your Name</label>
                                                </div>
                                                <div className="form-floating mb-4">
                                                    <input 
                                                        type="email" 
                                                        className="form-control" 
                                                        id="floatingEmail" 
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)} 
                                                        placeholder="Your Email" 
                                                        required 
                                                    />
                                                    <label htmlFor="floatingEmail">Your Email</label>
                                                </div>
                                                <div className="form-floating mb-4">
                                                    <input 
                                                        type="password" 
                                                        className="form-control" 
                                                        id="floatingPassword" 
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)} 
                                                        placeholder="Password" 
                                                        required 
                                                    />
                                                    <label htmlFor="floatingPassword">Password</label>
                                                </div>
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button 
                                                        type="submit" 
                                                        className="btn btn-primary btn-lg" 
                                                        disabled={mutation.isLoading} // Disable button while loading
                                                    >
                                                        {mutation.isLoading ? 'Signing Up...' : 'Sign Up'}
                                                    </button>
                                                </div>
                                            </form>
                                            <div className="text-center">
                                                <p>
                                                    Already have an account? <Link to="/signin">Sign In</Link>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Signup;
