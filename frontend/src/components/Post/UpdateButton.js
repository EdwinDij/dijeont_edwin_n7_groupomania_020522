import React, { useState, useContext } from "react";
import { UidContext } from "../AppContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

//BOUTTON MODIFIER UN POST
const UpdateButton = ({ post }) => {
    const [showEdit, setShowEdit] = useState(false);
    const [message, setMessage] = useState(post.message);
    const [textEdit, setTextEdit] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const id = post.id
    const uid = useContext(UidContext);


    const updatePost = () => {

        const data = { message: textEdit };
           axios.put(`http://localhost:5000/api/post/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
                },
           })
       }
    
    return (
        <div className="edit">

            <button className="edit-btn" onClick={(e) => {
                e.preventDefault();
                setShowEdit(!showEdit)
            }}>
                <i className="fas fa-edit"></i>
            </button>
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
                    <button type="submit"className="Valider" onClick={updatePost}>
                        Valider
                    </button>
                </div>
            )}
        </div>
    )
}
export default UpdateButton;