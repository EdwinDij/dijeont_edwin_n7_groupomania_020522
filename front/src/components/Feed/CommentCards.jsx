import axios from "axios";
import React from "react";
import logo from '../../assets/icon.png'

export default class Cards extends React.Component {
    state = {
        users: [],
    }


    componentDidMount() {
        axios.get("http://localhost:8000/post/" )
            .then(response => {
                console.log(response)
                console.log(response.data)
                const users = response.data;
                this.setState({ users });
                
            })
    }

    render() {
        return (
        <div className="cards">
                <div className="profilUser">
                    <img src="" alt="" className="img-profil" />
                    {this.state.users.map(users => (<span id="firstname" key= {users.id}> {users.firstname}</span>))}
                    {this.state.users.map(users => (<span id="lasttname" key= {users.id}> {users.lastname} </span>))}
                </div>
                <div className="content">
                    {this.state.users.map( users => (<img src={users.image_path} alt="" />))}
                   {this.state.users.map( users =><p className="text-content">{users.content}</p>)}
                </div>
                <div className="commentBtn">
                    <input type="button" value="commenter" className="comment" />
                </div>
            </div>
        )
    }
}