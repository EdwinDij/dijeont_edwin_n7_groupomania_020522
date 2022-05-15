import axios from "axios";
import React from "react";

export default class Cards extends React.Component {
    state = {
        users: [],
    }


    componentDidMount() {
        axios.get("http://localhost:8000/post/")
            .then(response => {
                console.log(response)
                console.log(response.data)
                const users = response.data;
                this.setState({ users });
            })
    }

  
    render() {
        return this.state.users.map(item => (
            <div className="cards" key={item.id}>
                <div className="profilUser">
                    <span id="firstname">{item.firstname}</span>
                    <span id="lastname">{item.lastname}</span>
                </div>
                    <img src={item.image_path} className="img-content"  alt="" />
                    <p className="text-content">{item.content}</p>
                <div className="commentBtn">
                    <input type="button" value="commenter" className="comment" />
                </div>
            </div>
        ))
    }
}
