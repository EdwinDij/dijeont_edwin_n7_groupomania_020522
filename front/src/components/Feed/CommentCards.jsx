import axios from "axios";
import React, { useEffect, useState } from "react";
import Comment from './Comment'

export default function Cards() {
    const storage = JSON.parse(localStorage.getItem('userInfo'));
    const userFirstname = storage.user.firstname;
    const userLastname = storage.user.lastname;
    const userId = storage.user.id;
    const isAdmin = storage.user.isAdmin;
    let token = "Bearer " + storage.token
    const [dataPost, setDataPost] = useState([]);
    const [dataCom, setDataCom] = useState([]);
    const [content, setContent] = useState('');

 //gestion des posts
    useEffect(() => {
        axios.get("http://localhost:8000/post/")
            .then(response => {
                console.log(response)
                setDataPost(response.data)
            })
    }, []);

    const deletePost = id => e => {
        e.preventDefault();
        e.stopPropagation();

        fetch(('http://localhost:8000/post/delete/'+ id), {
            method: "delete",
            headers: {
                "Content-type": 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                id: dataPost.id
            })
            
        })
        const filterPost = dataPost.filter(e => {
            return e.id !==id;
        });
        setDataPost(filterPost);
        //console.log(dataPost)
        //console.log(id)

    }
//gestion des commentaires

    const handleInputChange = (event) => {
        setContent(event.target.value)
    }
//récupération des commentaires
    useEffect(() => {
        axios.get("http://localhost:8000/comment/")
            .then(response => {
                console.log(response)
                setDataCom(response.data)
            })
    }, []);


    const submitCom = ()=> {
  
        fetch(('http://localhost:8000/comment/'), {
            method: "post",
            headers: {
                "Content-type": 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                firstname: userFirstname,
                lastname: userLastname,
                content: content,
                postId: dataPost,
            })
        })
        console.log(dataPost)
    


    }
    return (
        <div>{dataPost.map(post => <div className="cards" key={post.id}>
            <div className="profilUser">
                <span id="firstname">{post.firstname} </span>
                <span id="lastname">{post.lastname}</span>
                <button className="deleteBtn" onClick={deletePost(post.id)}>...</button>
            </div>
            <img src={post.image_path} alt="" />
            <p className="text-content">{post.content}</p>
           
            <div>
                
        <div className="commentzone">
            <textarea cols='20' rows='auto' type="text" name="comment" className="comment" onChange={handleInputChange} ></textarea>
            <input type="button" value="commenter" className="sendComment" onClick={submitCom} />
        </div>

        <div>{dataCom.map(comment => <div className="comment" key={comment.posts_id}>
                <div className="user">
                <span id="firstname">{comment.firstname}</span>
                <span className="lastname">{comment.lastname}</span>
                </div>
                <p className="content">{comment.content}</p>

            </div>
            )}</div>
        </div>
        </div>
        )}</div>
    )
}

