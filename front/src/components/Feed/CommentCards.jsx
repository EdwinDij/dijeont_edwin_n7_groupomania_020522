import axios from "axios";
import React from "react";
import Comment from './Comment'

export default class Cards extends React.Component {

    constructor(props){
        super(props);
    this.state = {posts: []}
    }
//récupérer les commentaires
    componentDidMount() {
        axios.get("http://localhost:8000/post/")
            .then(response => {
                console.log(response)
                console.log(response.data)
                const posts = response.data;
                this.setState({ posts });
            })
    }
    


    render() {
        return (this.state.posts.sort((b, a) => new Date(a.post_date).getTime() - new Date(b.post_date).getTime())
            .map(item => (
                <div className="cards" key={item.posts_id}>
                    <div className="profilUser">
                        <span id="firstname">{item.firstname}</span>
                        <span id="lastname">{item.lastname}</span>
                        {/*image de profil ici */}
                        <button onClick={this.setState}>...</button>
                    </div>
                    {/*<img src={item.image_path} className="img-content" alt="" />*/}
                    <p className="text-content">{item.content}</p>
                    <Comment/>
                </div>
            ))
        )
    }
}
