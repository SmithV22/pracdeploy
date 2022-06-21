import { useEffect, useState } from 'react' ;
import axios from 'axios' ;
import { Link } from 'react-router-dom' ;
import DeleteButton from './DeleteButton' ;
import Table from 'react-bootstrap/Table' ;
import io from 'socket.io-client' ;


const Display = () => {
    const [ pets, setPets ] = useState([]) ;
    const [ socket ] = useState(() => io(':8000')) ;

    useEffect(() => {
        console.log('inside of useEffect for sockets') ;
        socket.on('connect', () => {
            console.log('we are connected with the server on: ' + socket.id )
        }) ;
        socket.on("pet_added", (data) => {
            console.log(data) ;
            setPets((currentPets) => {
                return [ data, ...currentPets ] ;
            }) ;
        }) ;

        socket.on('pet_deleted', (data) => {
            setPets((currentPets) => {
                let filteredPets = currentPets.filter((pet) => {
                    return pet._id !== data ;
                })
                return filteredPets ;
            }) ;
        }) ;

        return () => socket.disconnect() ;
    }, []) ;

    useEffect(() => {
        axios.get('http://localhost:8000/api/pets')
        .then((res) => {
            setPets(res.data)
        })
        .catch((err) => {
            console.log('ERROR from GET ALL') ;
        })
    }, []) ;
    
    // const handleLike = (e) => {
    //     e.stopPropagation
    //     setDisable(true)} ; 
    // } 

    const handleDelete = (deleteId) => {
        setPets(pets.filter((pets) => pets._id !== deleteId)) ;
        socket.emit('deleted_pet', deleteId) ;
    } 
    
    
    const sortByType = [...pets].sort((a, b) =>
    a.petType > b.petType ? 1 : -1,
    );
    
    return (
        <div className="display">
            <h3 className="title">Pet List</h3>
            <div className="size">
            <Table className= "table-info" >
                <thead>
                    <tr>
                        <th>Pet Name</th>
                        <th>Pet Type</th>
                        <th>Pet Description</th>
                        <th>Pet Skills</th>
                        <th>Actions Available</th>
                    </tr>
                </thead>
                <tbody>
                    { pets.map((pet) => (
                    <tr className="table-secondary" key={ pet._id }>
                        <td>
                            <Link to={`/pets/${pet._id}`} className="link-text" >{ pet.petName } </Link>
                        </td>
                        <td>{ pet.petType }</td>
                        <td>{ pet.description }</td>
                        <td>{ pet.skills }</td>
                        <td>
                        <button className="button"><Link to={`/pets/edit/${pet._id}`} state={pet} className="link-text" >Edit</Link></button>
                        {/* <button onClick={(e) => {}}>Like</button> */}
                        <DeleteButton id={ pet._id } handleDelete={ handleDelete } className="button">Adopt</DeleteButton>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </Table>
            </div>
            <hr></hr>
            <div className="display">
            <h3 className="title">Pet List Sorted</h3>
            <div className="size">
            <Table className= "table-info" >
                <thead>
                    <tr>
                        <th>Pet Name</th>
                        <th>Pet Type</th>
                        <th>Pet Description</th>
                        <th>Pet Skills</th>
                        <th>Actions Available</th>
                    </tr>
                </thead>
                <tbody>
                    { sortByType.map((pet) => (
                    <tr className="table-secondary" key={ pet._id }>
                        <td>
                            <Link to={`/pets/${pet._id}`} className="link-text" >{ pet.petName } </Link>
                        </td>
                        <td>{ pet.petType }</td>
                        <td>{ pet.description }</td>
                        <td>{ pet.skills }</td>
                        <td>
                        <button className="button"><Link to={`/pets/edit/${pet._id}`} state={pet} className="link-text" >Edit</Link></button>
                        
                        <DeleteButton id={ pet._id } handleDelete={ handleDelete } className="button">Adopt</DeleteButton>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </Table>
            </div>
            <hr></hr>
            
        </div>
        </div>
    )
}

export default Display ;