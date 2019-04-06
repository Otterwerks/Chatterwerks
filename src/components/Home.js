import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div>
        <row>
            <div className="col-sm"></div>
            <div className="col-sm"><h2>A chat, that works!</h2></div>
            <div className="col-sm"></div>
        </row>
        <row>
            <div className="col-md"></div>
            <div className="col-md">
                <p><Link to='/login'>Login</Link>, or <Link to='/register'>Sign Up</Link>.</p>
            </div>
            <div className="col-md"></div>
        </row>
    </div>
)

export default Home