import React from "react";
import axios from "axios";
import { useState } from "react";

export default function Comment () {
    const [comment, setComment] = useState("")

    const storage = JSON.parse(localStorage.getItem('userInfo'))
    let token = "Bearer" + storage.token;
    const userFirstname = storage.user.firstname;
    const userlastname = storage.user.lastname;

    const submitCom = async () => {
        axios.post("http://localhost:8000/post/comment", {
            comment: comment,
            firstname: userFirstname,
            lastname: userlastname,
        }, {
            headers: {
                'Authorization': token
            }
            
        }
     )}
    


    return(
        <div className="commentzone">
        <textarea cols='20' rows='auto' type= "text" name="comment" className="comment" onChange={(event) =>
                    setComment(event.target.value)} ></textarea>
        <input type="button" value="commenter" className="sendComment" onClick={submitCom}/>
        </div>
    )
}
