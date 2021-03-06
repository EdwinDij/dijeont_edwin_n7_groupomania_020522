import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
const BASE_URL = process.env.REACT_APP_API_URL;

// BOUTOTN SUPPRESSION DE POST
const DeleteButton = ({ post }) => {
  const id = post.id;

  const deletePost = async (e) => {
    // SUPPRESSION D'UN POST DANS LA DB SQL
    e.preventDefault();

    await Swal.fire({
      title: "Etes vous sûr?",
      text: "Vous allez supprimer ce post définitivement!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok !",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Supprimé", "votre Post a été supprimé", "success");
        axios({
          method: "delete",
          url: `${BASE_URL}api/post/${id}`,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }).then((response) => {
            window.location.reload();
        });
      }
    });
  };

  return <i class="far fa-trash-alt" onClick={deletePost}></i>;
};

export default DeleteButton;
