
import React, { useState } from 'react' ;
import axios from 'axios' ;
import { useNavigate } from 'react-router-dom';
import PetForm from './PetForm';
import io from 'socket.io-client' ;

const NewPet = () => {
    const navigate = useNavigate() ;
    const [ socket ] = useState( () => io(':8000') ) ;

    const submitHandler = (pet, setErrors) => {
        axios.post('http://localhost:8000/api/pets', pet)
        .then((res) => {
            console.log(res.data)
            socket.emit('added_pet', res.data) ;
            socket.disconnect() ;
            navigate('/') ;
        })
        .catch((err) => {
            console.log('Errors from CREATE', err.response.data.error)
            setErrors(err.response.data.error.errors)
        })
    }
    return (
        <div>
            <h1>Create A Pet</h1>
            <PetForm submitHandler={ submitHandler } buttonText={ 'Add Pet' }/>
        </div>
    )
}

export default NewPet ;