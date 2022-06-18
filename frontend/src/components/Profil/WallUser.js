import axios from "axios";
import React, { useEffect, useState } from "react";
import { timestampParser } from "../Utils";
import Swal from "sweetalert2";

// AFFICHAGE D'UN MUR AVEC TOUT LES UTILISATEURS ENREGISTRE DANS LA DB SQL, POUR QUE L'ADMINISTRATEUR PUISSE LES SUPPRIMER
const WallUser = () => {
  const [userList, setUserList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const BASE_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    // RECUPERATIONS DES INFORMATIONS GRACE A UN APPEL API AXIOS DANS LE BACKEND : getAllUser
    const getUsers = async () => {
      await axios({
        method: "get",
        url: `${BASE_URL}api/user/`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      }).then((res) => {
        setUserList(res.data);
      });
    };
    getUsers();
  }, [isLoaded]);

  const deleteOneUser = (userId) => {
    // SUPPRESSION D'UN UTILISATEUR DANS LA DB SQL GRACE A UN APPEL API AXIOS DANS LE BACKEND: deleteUser
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, je veux supprimer!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Supprimé!',
          'L\'utilisateur a bien été supprimé.',
          'success'
        )


        axios({
          method: "delete",
          url: `${BASE_URL}api/user/${userId}`,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }).then(() => {
          if (isLoaded) {
            setIsLoaded(false);
          } else {
            setIsLoaded(true);
          }
        });
      }
    })
  }
  return (
    <div className="allUser-container">
      <h2>Liste des utilisateurs inscrit sur Groupomania</h2>
      {userList.map((user) => {
        return (
          <div className="user-container">
            <div className="left-user">
              <img src={user.photo} alt="" />
            </div>
            <div className="right-user">
              <div className="info-user">
                <h3>{user.pseudo}</h3>
                <p>{user.email} </p>
                <p>membre depuis le {timestampParser(user.createdAt)} </p>
              </div>

              <div className="btn-delete">
                <button
                  onClick={() => {
                    deleteOneUser(user.id);
                  }}
                >
                  Suprimer l'utilisateur
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WallUser;
