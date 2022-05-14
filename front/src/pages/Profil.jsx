function Profil() {
    const storage = JSON.parse(localStorage.getItem('userInfo'))
    const userFirstname = storage.user.firstname;
    const userLastname =  storage.user.lastname;


    return (
        <div>
            <div className="body-header">
                <h1>
                    {userFirstname} {userLastname}
                </h1>
           
            </div>
        </div>
    )
}

export default Profil