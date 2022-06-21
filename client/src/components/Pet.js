
import { useEffect, useState } from 'react' ;
import { useParams, useNavigate } from 'react-router-dom' ;
import axios from 'axios';


const Pet = () => {
    const [ pet, setPet ] = useState({}) ;
    const { id } = useParams() ;
    const navigate = useNavigate() ;

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${id}`)
        .then((res) => {
            console.log(res.data) ;
            setPet(res.data) ;
        })
        .catch((err) => {
            console.log("Error from DETAILS", err)
        })
    }, []) ;

    return (
        <div>
            <h3>{ pet.petName }'s Details</h3>
            <p> Type: { pet.petType }</p>
            <p> Description: { pet.description }</p>
            <p> Skills: { pet.skills }</p>

        </div>
    )
}

export default Pet ;