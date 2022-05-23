import React from "react";
import axios from "axios";
//import { useState } from "react";
import logo from '../../assets/icon-bg-remove.png'
import '../styles/Feed.scss'
import Cards from './CommentCards.jsx'
import { Link } from "react-router-dom";


export default class Feed extends React.Component {


    constructor(props) {
        super(props)
        const storage = JSON.parse(localStorage.getItem('userInfo'))

        this.state = {
            firstname: storage.user.firstname,
            lastname: storage.user.lastname,
            token: storage.token,
            data: storage || [],
            content: '',
            file: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.submitPost = this.submitPost.bind(this)
        this.handleImage = this.handleImage.bind(this)
    }

    handleInputChange(e) {
        this.setState({ content: e.target.value })
    }
    handleImage(e) {
        this.setState({ file: e.target.value})
    }

    async submitPost() {
        await axios.post('http://localhost:8000/post/', {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            content: this.state.content,
            file: this.state.file,
        }, {
            headers: this.state.token
        })
       window.location.reload()
    }

    /*const [content, setContent] = useState([""]);
    const [media, setMedia] = useState("")

    //récupérer mon token jwt
    const storage = JSON.parse(localStorage.getItem('userInfo'))
    let token = "Bearer" + storage.token;
    const userFirstname = storage.user.firstname;
    const userlastname = storage.user.lastname;

    //poster un commentaire
      const submitPost =  () => {
          
          axios.post('http://localhost:8000/post/', {
            firstname: userFirstname,
            lastname: userlastname,
            content: content,
            media: media,
        }, {
            headers: {
                'Authorization': token
            }
        
        })
        
    }
*/
    render() {
        return (
            <div className="container-app">
                <div className="header">
                    <img className="logo" src={logo} alt="logo groupomania" />
                    <div className="profil">
                        <Link to="/profil"> <span className='firstname'>{this.state.firstname}</span> </Link>
                        <Link to="/profil"> <span className='lastname'>{this.state.lastname}</span> </Link>
                        <Link to="/profil"> <img className='img-progil' alt="img de profil" /> </Link>
                    </div>
                </div>
                <div className="inputPost">
                    <textarea onChange={this.handleInputChange}
                        cols="40"
                        rows="5"
                        type="text"
                        name="Post"
                        className="inputPost"
                        placeholder="Partagez quelque chose">
                    </textarea>
                    <div className="inputSend">
                        <button onClick={this.submitPost} className="sendBtn" value="envoyer">
                            Envoyer
                        </button>
                        <input type="file"
                            name="file"
                            accept="image/*, video/*"
                            onChange={this.handleImage} />
                    </div>

                </div>

                <Cards />
            </div>
        )
    }


}
