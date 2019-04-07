import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div className="page-bg m-3 p-8">
    <div className="d-flex justify-content-center m-5 p-5">
        <div><h2>A chat, that works!</h2></div>
    </div>
    <div className="d-flex justify-content-center mb-3 pb-3">
        <div><p><Link to='/login'>Login</Link>, or <Link to='/register'>Sign Up</Link>.</p></div>
    </div>
    </div>
)

export default Home