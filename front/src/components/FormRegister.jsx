import React, { useState } from "react";
import axios from 'axios'
import logo from '../assets/icon-above-font.png'
import './styles/Form-style.scss'
import { validEmail, validPassword, validFirstname, validLastname } from './regex.jsx'


function Register() {
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [firstnameError, setFirstnameError] = useState(false);
    const [lastnameError, setLastnameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const submit = () => {

        axios.post('http://localhost:8000/user/register', {
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: password,
        })
            .then((response) => {
                console.log(response)
            })

        if (!validEmail.test(email)) {
            setEmailError(true);
        }
        if (!validFirstname.test(firstname)) {
            setFirstnameError(true);
        }
        if (!validLastname.test(lastname)) {
            setLastnameError(true);
        }
        if (!validPassword.test(password)) {
            setPasswordError(true);
        }
    }
    return (
        <div className="base-container">
            {emailError && <p>Your email is invalid</p>}
            {firstnameError && <p>Your firstname is invalid</p>}
            {lastnameError && <p>Your lastname is invalid</p>}
            {passwordError && <p>Your password is invalid</p>}

            <div className="content">
                <div className="image">
                    <img src={logo} alt="logo-groupomania" />
                </div>
                <form className="form">
                    <div className="form-group">
                        <label htmlFor="email"> Email</label>
                        <input onChange={(event) => {
                            setEmail(event.target.value);
                        }} type="text" name="email" placeholder="Email" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastname"> Nom</label>
                        <input onChange={(event) => {
                            setLastname(event.target.value);
                        }} type="text" name="lastname" placeholder="Nom" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="firstname"> Prénom</label>
                        <input onChange={(event) => {
                            setFirstname(event.target.value);
                        }} type="text" name="firstname" placeholder="Prénom" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password"> Mot de passe</label>
                        <input onChange={(event) => {
                            setPassword(event.target.value);
                        }} type="password" name="password" placeholder="Mot de passe" />
                    </div>

                    <div className="footer">
                        <button onClick={submit} className="btn">
                            Inscription
                        </button>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Register