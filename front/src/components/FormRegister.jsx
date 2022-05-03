import React, { useState } from "react";
import axios from 'axios'
import logo from '../assets/icon-above-font.png'
import './styles/Form-style.scss'



function Register() {
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("")
    const [password, setPassword] = useState("")

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
    }
    return (
        <div className="base-container">

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
                    </div> <div className="footer">
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