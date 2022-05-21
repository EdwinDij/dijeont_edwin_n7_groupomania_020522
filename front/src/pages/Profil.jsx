import axios from "axios";

function Profil() {
    const storage = JSON.parse(localStorage.getItem('userInfo'))
    const userFirstname = storage.user.firstname;
    const userLastname = storage.user.lastname;
    const userId = storage.user.id;
    let token = "Bearer" + storage.token;
  
    const deleteUser = () => {
    axios.delete('http://localhost:8000/auth/delete', {
        firstname: userFirstname,
        lastname: userLastname
    },{
        headers: {
            'Authorization': token
        }
    })
        .then((response) => {
            console.log(userId)
            console.log(response)
        })

    }
    return (
        <div>
            <div className="body-header">
                <h1 className="userInfo">
                    {userFirstname} {userLastname}
                </h1>
                <button onClick={deleteUser}>
                    Suprrimer le compte
                </button>
            </div>
        </div>
    )
}

export default Profil