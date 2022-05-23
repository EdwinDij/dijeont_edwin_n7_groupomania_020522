import axios from "axios";
import React, { useEffect, useState } from "react";
import Comment from './Comment'

export default function Cards() {
    const storage = JSON.parse(localStorage.getItem('userInfo'))
    const userFirstname = storage.user.firstname;
    const userLastname = storage.user.lastname;
    const userId = storage.user.id;
    const isAdmin = storage.user.isAdmin;
    const token = storage.user.token
    const [dataPost, setDataPost] = useState([])



    useEffect(() => {
        axios.get("http://localhost:8000/post/")
            .then(response => {
                console.log(response)
                setDataPost(response.data)
            })
    }, []);

    const deletePost = posts_id => e => {
        e.preventDefault();
        e.stopPropagation();
        const filterPost = dataPost.filter(e => {
            return e.posts_id !==id;
        });
        setDataPost(filterPost);

        fetch(('http://localhost:8000/post/delete' + dataPost.posts_id), {
            method: "delete",
            headers: {
                "Content-type": 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                id: dataPost.posts_id
            })
        })

    }



    return (
        <div>{dataPost.map(post => <div className="cards" key={post.posts_id}>
            <div className="profilUser">
                <span id="firstname">{post.firstname} </span>
                <span id="lastname">{post.lastname}</span>
                <button className="deleteBtn" onClick={deletePost(post.posts_id)}>...</button>
            </div>
            <img src={post.image_path} alt="" />
            <p className="text-content">{post.content}</p>
            <Comment />
        </div>
        )}</div>
    )
}


/*export default class Cards extends React.Component {


    
    deletePost () {
        axios.post ("http://localhost:8000/post/deletePost")
        .then(response => {
            console.log(response)
        })
    }

    deleteUser () {
        const storage = JSON.parse(localStorage.getItem('userInfo'))
        const isAdmin = storage.user.isAdmin

        if (isAdmin === 1) {
        axios.post ("http://localhost:8000/user/adminDelete",{
            firstname : this.state.posts.firstname,
            lastname : this.state.posts.lastname,
        })
        .then(response => {
            console.log(response)
        })
    
    } else {
        alert("vous n'avez pas les droits")
    }
    }

    render() {
    
        return (this.state.posts.sort((b, a) => new Date(a.post_date).getTime() - new Date(b.post_date).getTime())
            .map(item => (
                <div className="cards" key={item.posts_id}>
                    <div className="profilUser">
                        <span id="firstname" onClick={this.deleteUser}>{item.firstname}</span>
                        <span id="lastname">{item.lastname}</span>

                        image de profil ici 
                        <button onClick={this.deletePost}>...</button>
                    </div>
                    <img src={item.image_path} className="img-content" alt="" />
                    <p className="text-content">{item.content}</p>
                    <Comment/>
                </div>

            ))
        )
        
    }
}
*/