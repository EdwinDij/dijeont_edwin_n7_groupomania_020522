import React from "react";
import axios from "axios";
import { useState } from "react";
import logo from '../../assets/icon-bg-remove.png'
import '../styles/Feed.scss'
import Cards from './CommentCards.jsx'

function Feed() {
    const [content, setContent] = useState("");

    const submitPost = () => {
        axios.post('http://localhost:8000/post/', {
            content: content,
        })
    }

    return (
        <div className="container-app">
            <div className="header">
                <img className="logo" src={logo} alt="logo groupomania" />
                <div className="profil">
                    <span className='firstname'>edwin</span>
                    <span className='lastname'>dijezaeazeae</span>
                    <img className='img-progil' alt="img de profil" />
                </div>
            </div>
            <div className="inputPost">
            <input onChange={(event)=>
            setContent(event.target.value)}
            type= "text" 
            name= "Post"/>
            </div>
            <Cards />
        </div>
    )
}

export default Feed