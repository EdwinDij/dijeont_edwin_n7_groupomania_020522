import React from "react";
import axios from 'axios'
import logo from '../assets/icon-above-font.png'
import './styles/Form-style.scss'


export default class Login extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password:'',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (e) {
        this.setState({email: e.target.value});
        this.setState({password: e.target.value});
  
    }

    handleSubmit(e){ 
        const users ={
            email: this.state.email,
            password: this.state.password,
        }
      e.preventDefault();
      axios.post('http://localhost:8000/api/auth/signin', {users})
        .then (res => {
            console.log(res);
            console.log(res.data)
        })
    }

    render () {

      
        return(
        <div className="base-container" ref={this.props.containerREF}>
            <div className="content">
                <div className="image">
                    <img src={logo} alt="logo-groupomania" />
                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="Email"> Email</label>
                        <input onChange={this.handleChange} type="text" name="Email" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password"> Mot de passe</label>
                        <input onChange={this.handleChange} type="password" name="password" placeholder="Mot de passe" />
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type='submit' className="btn">
                    Connexion
                </button>
            </div>
        </div>
        )
    }
}