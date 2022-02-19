import React, { useState } from 'react';
import './LandingPage.css';
import Login from './Login';
import MainHeader from '../UI/MainHeader';
import SignUp from './SignUp';

function LandingPage(props) {

    const [activeRegister, setActiveRegister] = useState(false);
    const turnRegister =(state)=> {
        setActiveRegister(state);
    }
    return (<div>
            <MainHeader/>
            <div className='land-container'>
                <div className='land-split left'>
                    <p></p>
                </div>
                <div className='land-split right'>
                    {!activeRegister && <Login makeRegisterOn= {turnRegister}/>}
                    {activeRegister && <SignUp makeRegisterOn= {turnRegister}/>}
                </div>
            </div>
            </div>
    );
}

export default LandingPage;