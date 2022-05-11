import React from "react";
import logo from '../../assets/icon-bg-remove.png'
import '../styles/Feed.scss'
import Cards from './CommentCards.jsx'

function Feed() {

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
            <input type='text'
                className="input-post"
                placeholder="Ecrivez votre commentaire..." />
            <input type='submit' className="Btn" />
<Cards/>
        </div>
    )
}

export default Feed