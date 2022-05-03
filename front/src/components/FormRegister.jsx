import React from "react";
import axios from 'axios'
import logo from '../assets/icon-above-font.png'
import './styles/Form-style.scss'



export default class Register extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          email: '',
          firstname:'',
          lastname:'',
          password:'',
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

    handleChange (e) {
        this.setState({email: e.target.value});
        this.setState({firstname: e.target.value});
        this.setState({lastname: e.target.value});
        this.setState({password: e.target.value});

    }
  

  handleSubmit(e){ 
      const users ={
          email: this.state.email,
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          password: this.state.password,
      }
    e.preventDefault();
    axios.post('http://localhost:8000/user/register', {users})
      .then ((response)=>{
          console.log(response)
      })
  }
    render () {
     
        return(
        <div className="base-container"ref={this.props.containerREF}>
           
            <div className="content">
                <div className="image">
                    <img src={logo} alt="logo-groupomania" />
                </div>
                <form className="form">
                    <div className="form-group">
                        <label htmlFor="email"> Email</label>
                        <input onChange={this.handleChange}type="text" name="email" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname"> Nom</label>
                        <input onChange={this.handleChange} type="text" name="lastname" placeholder="Nom" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstname"> Prénom</label>
                        <input onChange={this.handleChange} type="text" name="firstname" placeholder="Prénom" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password"> Mot de passe</label>
                        <input onChange={this.handleChange} type="password" name="password" placeholder="Mot de passe" />
                    </div> <div className="footer">
                <button onClick={this.handleSubmit} className="btn">
                    Inscription
                </button>
            </div>
                </form>
            </div>
           
        </div>
        )
    }
}