import React, { useState } from "react";
import axios from 'axios';
import logo from '../assets/icon-above-font.png';
import './styles/Form-style.scss';




function Login() {

    localStorage.clear()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const submit = () => {
        axios.post('http://localhost:8000/user/login', {
            email: email,
            password: password,
        })
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    localStorage.setItem('userInfo', JSON.stringify (response.data))
                    document.location.href='/feed'
                } else{
                    setErrorMessage(response.data.msg)
                }
    })
}
    return (
        <div className="base-container">
            <span className="errors">
                {errorMessage}
            </span>

            <div className="content">
                <div className="image">
                    <img src={logo} alt="logo-groupomania" />
                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="Email"> Email</label>
                        <input onChange={(event) => {
                            setEmail(event.target.value)}} type = "text" name = "Email" placeholder = "Email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password"> Mot de passe</label>
                        <input onChange={(event) => {
                            setPassword(event.target.value)}} type = "password" name = "password" placeholder = "Mot de passe" />
                    </div>
                </div>
            </div>
            <div className="footer">
                <button onClick={submit} className="btn">
                    Connexion
                </button>
            </div>
        </div>
    )
}


export default Login