import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios'
import '../style/App.css'
import { useHistory  } from 'react-router-dom';

export default function Register() {
    
    // route params
    let history = useHistory();

    // states
    const [firstnameReg, setFirstNameReg] = useState('');
    const [lastnameReg, setLastNameReg] = useState('');
    const [usernameReg, setUserNameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [repasswordReg, setRePasswordReg] = useState('');
    const [statusMsg, setStatus] = useState('');

    // refs
    const fnameInput = useRef();
    const lnameInput = useRef();
    const userInput = useRef();
    const passwordInput = useRef();
    const repasswordInput = useRef();

    // set input focus
    useEffect( ()=> {
        fnameInput.current.focus();
    }, [fnameInput]);

    // handle register new user
    const register = () => {
        setStatus('')
        if (firstnameReg === '' || lastnameReg === '' || usernameReg === ''
            || passwordReg === '' || repasswordReg === '') {
            setStatus('Please fill out all required fields.')
        } else if (passwordReg !== repasswordReg) {
            setStatus('Passwords did not match.')
            passwordInput.current.value = '';
            repasswordInput.current.value = '';
            passwordInput.current.focus();
        } else {
            Axios.post('/user/register', {
                firstname: firstnameReg,
                lastname: lastnameReg,
                username: usernameReg,
                password: passwordReg
            }).then((resp) => {
                console.log(resp.data);
                history.push('/login')
            });
        };
    };

    // handle enter key press
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            register();
        };
    };

    return (
        <div className="landing-content">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div>
                            <div className="row justify-content-center mb-5">
                                <h1>Register</h1>
                            </div>
                            <div className="row justify-content-center mr-5 pr-5">
                                <h5 className="mr-5 pr-4">Create an account below:</h5>
                            </div>
                            <div className="form">
                                <form>
                                    <div className="form-row">
                                        <div className="form-group col-lg-12">
                                            <input type="text" placeholder="First Name" maxLength="25" ref={fnameInput}
                                                onChange={(e) => {
                                                    let name = e.target.value;
                                                    const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1)
                                                    setFirstNameReg(nameCapitalized);
                                                }} required/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-lg-12">
                                            <input type="text" placeholder="Last Name" maxLength="25" ref={lnameInput}
                                                onChange={(e) => {
                                                    let name = e.target.value;
                                                    const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1)
                                                    setLastNameReg(nameCapitalized);
                                                }} required/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-lg-12">
                                            <input type="text" placeholder="Username" maxLength="25" ref={userInput}
                                                onChange={(e) => {
                                                    setUserNameReg(e.target.value);
                                                }} required/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-lg-12">
                                            <input type="password" placeholder="Password" maxLength="25" ref={passwordInput}
                                                onChange={(e) => {
                                                    setPasswordReg(e.target.value);
                                                }} required/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-lg-12">
                                            <input type="password" placeholder="Re-enter Password" ref={repasswordInput}
                                                onKeyDown={handleKeyDown} onChange={(e) => {
                                                    setRePasswordReg(e.target.value);
                                                }} required/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <button className="main-button btn btn-block btn-primary" type="button" onClick={
                                                register}>Login</button>
                                            <div className="statusMsg">
                                                {statusMsg}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
