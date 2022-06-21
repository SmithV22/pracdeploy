
const Pet = require('../models/pet.model') ;

module.exports = {
    createPet: async (req, res) => {
        const petNameFind = await Pet.findOne({ petName: req.body.petName }) ;
        if (!petNameFind) {
        Pet.create(req.body)
        .then((newPet) => {
            res.status(201).json(newPet) ;
        })
        .catch((err) => {
            res.status(400)
            .json({ message: 'Something went wrong in CREATE', error: err }) ;
        })
    } else {
        ((err) => {
            res.status(400)
            .json({ message: 'Name is already taken. Please choose another one.'}) ;
        })
    }
    },
    
    getPets: (req, res) => {
        Pet.find({})
        .then((pets) => {
            res.json(pets) ;
        })
        .catch(err => {
            res.status(400)
            .json({ message: 'Something went wrong in FINDALL', error: err }) ;
        })
    },

    getPetById: (req, res) => {
        Pet.findOne({ _id: req.params.id })
        .then((pet) => {
            res.status(201).json(pet) ;
        })
        .catch(err => {
            res.status(400)
            .json({ message: 'Something went wrong in FINDONE', error: err }) ;
        })
    },
    
    updatePet: (req, res) => {
        Pet.findByIdAndUpdate( req.params.id, req.body, { new: true, runValidators: true})
        .then((pet) => {
            res.json(pet) ;
        })
        .catch(err => {
            res.status(400)
            .json({ message: 'Something went wrong in UPDATE', error: err }) ;
        })
    },

    deletePet: (req, res) => {
        Pet.deleteOne({ _id: req.params.id })
        .then((pet) => {
            res.json(pet) ;
        })
        .catch(err => {
            res.status(400)
            .json({ message: 'Something went wrong in DELETE', error: err }) ;
        })
    },
    
} ;