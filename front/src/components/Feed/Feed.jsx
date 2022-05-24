import React from "react";

//import { useState } from "react";
import logo from '../../assets/icon-bg-remove.png'
import '../styles/Feed.scss'
import Cards from './CommentCards.jsx'
import { Link } from "react-router-dom";
import { useState } from "react";


export default function Feed () {


    const [content, setContent] = useState("");
    const [media, setMedia] = useState("")

    const storage = JSON.parse(localStorage.getItem('userInfo'))
    let token = "Bearer" + storage.token;
    const userFirstname = storage.user.firstname;
    const userlastname = storage.user.lastname;

    const handleInputChange = (e) => {
        setContent(e.target.value)
    }

    const handleFileChange = (e) => {
        setMedia(e.target.value)
    }
    //poster un commentaire

      const submitPost =  () => {
         fetch(('http://localhost:8000/post/'), {
             method: "post",
             headers: {
                "Content-type": 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                firstname: userFirstname,
                lastname: userlastname,
                content: content,
                image_path: media
            })
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
                    <textarea 
                        cols="40"
                        rows="5"
                        type="text"
                        name="Post"
                        className="inputPost"
                        placeholder="Partagez quelque chose"
                        onChange={handleInputChange}>
                    </textarea>
                    <div className="inputSend">
                        <button onClick={submitPost} className="sendBtn" value="envoyer">
                            Envoyer
                        </button>
                        <input type="file"
                            name="file"
                            accept="image/*, video/*"
                            onChange={handleFileChange}
                             />
                    </div>

                </div>

                <Cards />
            </div>
        )
    }
