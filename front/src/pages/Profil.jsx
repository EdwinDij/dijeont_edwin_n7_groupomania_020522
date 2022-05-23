import React from 'react'

function Profil() {
    const storage = JSON.parse(localStorage.getItem('userInfo'))
    const userFirstname = storage.user.firstname;
    const userLastname = storage.user.lastname;
    const userId = storage.user.id;
    let token = "Bearer" + storage.token;


    const deleteUser = () => {
        fetch(('http://localhost:8000/auth/delete/' + userId), {
            method: "delete",
            headers: {
                "Content-type": 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                id: userId,
            })

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