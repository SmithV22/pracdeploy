
import React, { useState } from 'react' ;
import axios from 'axios';
import io from 'socket.io-client';

const DeleteButton = (props) => {
    const { id, handleDelete } = props
    const [ socket ] = useState( () => io(':8000') ) ;

    const deleteHandler = () => {
        axios
        .delete(`http://localhost:8000/api/pets/${id}`)
        .then((res) => {
            console.log(res) ;
            handleDelete(id) ;
        })
        .catch((err) => {
            console.log(err) ;
        }) ;
    } ;

    return (
        <button onClick={deleteHandler}>Adopt</button>
    )
}

export default DeleteButton ;