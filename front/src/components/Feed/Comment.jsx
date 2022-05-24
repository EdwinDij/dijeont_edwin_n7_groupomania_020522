import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Comment() {
    const [commentData, setCommentData] = useState([]);
    const [content, setContent] = useState('');
    const storage = JSON.parse(localStorage.getItem('userInfo'));
    let token = "Bearer" + storage.token;
    const userFirstname = storage.user.firstname;
    const userlastname = storage.user.lastname;

    //poster un commentaire

    const handleInputChange = (event) => {
        setContent(event.target.value)
    }

    useEffect(() => {
        axios.get("http://localhost:8000/comment/comment")
            .then(response => {
                console.log(response)
                setCommentData(response.data)
            })
    }, []);


    const submitCom = async () => {
        axios.post("http://localhost:8000/post/comment", {
            comment: commentData,
            firstname: userFirstname,
            lastname: userlastname,
        }, {
            headers: {
                'Authorization': token
            }

        }
        )
    }



    return (
        <div>
        <div className="commentzone">
            <textarea cols='20' rows='auto' type="text" name="comment" className="comment" onChange={handleInputChange} ></textarea>
            <input type="button" value="commenter" className="sendComment" onClick={submitCom} />
        </div>

        <div>{commentData.map(comment => <div className="comment" key={comment.posts_id}>
                <div className="user">
                <span id="firstname">{comment.firstname}</span>
                <span className="lastname">{comment.lastname}</span>
                </div>
                <p className="content">{comment.content}</p>

            </div>
            )}</div>
        </div>
    )
}
