import React from "react";
import axios from "axios";
import { useState } from "react";
import logo from '../../assets/icon-bg-remove.png'
import '../styles/Feed.scss'
import Cards from './CommentCards.jsx'
import {Link} from "react-router-dom";


 function Feed() {
    const [content, setContent] = useState([""]);
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

    return (
        <div className="container-app">
            <div className="header">
                <img className="logo" src={logo} alt="logo groupomania" />
                <div className="profil">
                    <Link to="/profil"> <span className='firstname'>{userFirstname}</span> </Link>
                    <Link to="/profil"> <span className='lastname'>{userlastname}</span> </Link>
                    <Link to="/profil"> <img className='img-progil' alt="img de profil" /> </Link>
                </div>
            </div>
            <div className="inputPost">
                <textarea onChange={(event) =>
                    setContent(event.target.value)}
                    cols="40"
                    rows="5"
                    type="text"
                    name="Post"
                    className="inputPost"
                    placeholder="Partagez quelque chose">
                </textarea>
                <div className="inputSend">
                <button onClick={submitPost} className="sendBtn" value="envoyer">
                    Envoyer
                </button>
                <input type="file" 
                name="media" 
                accept="image/*, 
                video/*" 
                onChange={(e) =>
                setMedia(e.target.value)}/>
            </div>
        
            </div>

            <Cards />
        </div>
    )
}

export default Feed