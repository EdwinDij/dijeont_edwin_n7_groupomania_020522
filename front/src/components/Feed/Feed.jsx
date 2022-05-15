import React from "react";
import axios from "axios";
import { useState } from "react";
import logo from '../../assets/icon-bg-remove.png'
import '../styles/Feed.scss'
import Cards from './CommentCards.jsx'

function Feed() {
    const [content, setContent] = useState("");
//récupérer mon token jwt
    const storage = JSON.parse(localStorage.getItem('userInfo'))
    let token = "Bearer" + storage.token;
    const userFirstname = storage.user.firstname;
    const userlastname =  storage.user.lastname;


    const submitPost = () => {
        axios.post('http://localhost:8000/post/', {
            firstname: userFirstname,
            lastname: userlastname,
            content: content,

        },{
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
                    <span className='firstname'>{userFirstname}</span>
                    <span className='lastname'>{userlastname}</span>
                    <img className='img-progil' alt="img de profil" />
                </div>
            </div>
            <div className="inputPost">
            <input onChange={(event)=>
            setContent(event.target.value)}
            type= "text" 
            name= "Post"/>
            </div>
            <div className="inputSend">
                <button onClick={submitPost} className="sendBtn"  value="envoyer">
                    Envoyer
                    </button>
            </div>
            <Cards />
        </div>
    )
}

export default Feed