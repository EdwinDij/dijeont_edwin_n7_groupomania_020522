import React, { useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";


//BOUTTON MODIFIER UN POST
const UpdateButton = ({ post }) => {
    const [showEdit, setShowEdit] = useState(false);
    const [textEdit, setTextEdit] = useState("");
    const id = post.id
    const BASE_URL = process.env.REACT_APP_API_URL;


    const updatePost = () => {

        const data = { 
            message: textEdit,
        };

           axios.put(`${BASE_URL}api/post/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
                },
                body: {
                    message: textEdit,
                }
           })
          
           .then (() => {
            console.log(data)
            console.log(post)
            console.log(post.message)
            if (post.message === data.message || data.message === "") {
                alert ("Veuillez entrer un message valide")
            }else{
            Swal.fire({
                title: "Post modifié",
                text: "Le post a été modifié",
                icon: "success",
                confirmButtonText: "Ok",
            })
            .then(() => {
                setShowEdit(false);
                setTextEdit("");
                window.location = "/";
            
            })                
    }})
       }
    
    return (
        <div className="edit-btn">

                <i className="fas fa-edit" onClick={(e) => {
                e.preventDefault();
                setShowEdit(!showEdit)
            }}></i>
            {showEdit && (
                <div className="edit">
                    <input
                        type="text"
                        name="EditMessage"
                        className="EditMessage"
                        placeholder="Modifier votre message"
                        onChange={(e) => setTextEdit(e.target.value)}
                        value={textEdit}
                    ></input>
                    <button type="submit"className="edit-validate" onClick={updatePost}>
                        Valider
                    </button>
                </div>
            )}
        </div>
    )
}
export default UpdateButton;