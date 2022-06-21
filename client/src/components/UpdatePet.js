
import { useEffect, useState } from 'react' ;
import axios from 'axios' ;
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import PetForm from './PetForm' ;

const UpdatePet = () => {
    const navigate = useNavigate() ;
    const { id } = useParams() ;
    const  [ oldPet, setOldPet ] = useState({}) ;
    const { state } = useLocation() ;

    useEffect(() => {
        if (!state) {
            axios.get(`http://localhost:8000/api/pets/${id}`)
            .then((res) => {
                console.log(res.data) ;
                setOldPet(res.data) ;
            })
            .catch((err) => {
                console.log("Error from UPDATE", err)
            }) ;
        } else {
            setOldPet(state) ;
        }
    }, []) ;

    const submitHandler = (pet, setErrors) => {
        axios.put(`http://localhost:8000/api/pets/${id}`, pet)
        .then((res) => {
            console.log(res.data) ;
            navigate('/') ;
        })
        .catch((err) => {
            setErrors(err.response.data.error.errors)
        })
    } ;

    return oldPet ? (
        <div>
            <h3>Edit Pet</h3>
            <div>
                <PetForm submitHandler={ submitHandler } buttonText={'Edit Pet'} oldPet={ oldPet } />
            </div>
        </div>
    ) : null ;
}

export default UpdatePet ;