import { useEffect, useState } from 'react' ;
import { Link } from 'react-router-dom' ;
import Form from 'react-bootstrap/Form' ;
import Button from 'react-bootstrap/Button' ;

const PetForm = (props) => {
    const [ errors, setErrors ] = useState({}) ;
    const { oldPet } = props ;
    const [ pet, setPet ] = useState(
        props.oldpet || {
        petName: '',
        petType: '',
        description: '',
        skills: '',
    }) ;

    useEffect(()=> {
        if (props.oldPet) {
            setPet(props.oldPet) ;
        }
    }, [props.oldPet]) ;

    const submitHandler = (e) => {
        e.preventDefault() ;
        props.submitHandler(pet, setErrors) ;
    } ;

    const changeHandler = (e) => {
        if ((e.target.name === 'skills')) {
            setPet({...pet, [ e.target.name ]: e.target.value.split(',')}) ;
        } else {
        setPet({...pet, [ e.target.name ]: e.target.value}) ;
        }
    } ;

    return (
            <div className="container">
                <div className="add">
                    <Form onSubmit={submitHandler} className="addForm">
                        <Form.Group className="mb-3">
                        { errors.petName && <p className="error">{ errors.petName.message }</p> }
                        <Form.Label>Pet Name</Form.Label>
                        <Form.Control type="text" name="petName" value={pet.petName} onChange={changeHandler} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            { errors.petType && <p className="error">{ errors.petType.message }</p> }
                            <Form.Label>Pet Type</Form.Label>
                            <Form.Select type="text" name="petType" value={pet.petType} onChange={changeHandler}>
                                <option>Please Choose One</option>
                                <option value="Dog">Dog</option>
                                <option value="Cat">Cat</option>
                                <option value="Bird">Bird</option>
                                <option value="Lizzard">Lizzard</option>
                                <option value="Rabbit">Rabbit</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            { errors.description && <p className="error">{ errors.description.message }</p> }
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" name="description" value={pet.description} onChange={changeHandler} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            { errors.skills && <p className="error">{ errors.skills.message }</p> }
                            <Form.Label>Skills</Form.Label>
                            <Form.Control type="text" name="skills" value={ pet.skills} onChange={changeHandler} />
                        </Form.Group>
                        <Button className="button"> <Link className="button-link" to='/'>Cancel</Link></Button>
                        <Button variant="primary" type="submit"> {props.buttonText}
                        </Button>
                    </Form>
                </div>
            </div>
    )
}

export default PetForm ;

