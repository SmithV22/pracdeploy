
const mongoose = require('mongoose') ;
const PetSchema = mongoose.Schema(
    {
        petName: {
            type: String,
            required: [true, 'Please enter a Name'],
            minLength: [3, 'Name must be longer than 3 characters'],
        },
        petType: {
            type: String,
            requried: [true, 'Please enter a pet type'],
            enum: [
                "Dog",
                "Cat",
                "Bird",
                "Lizzard",
                "Rabbit",
                "Other", ]
        },
        description: {
            type: String,
            required: [true, 'Please describe your pet'],
            minLength: [3, 'Description must be longer than 3 characters']
        },
        skills: {
            type: [String],
            validate: [arrayLimit, 'Pets can have up to 3 skills']
        },
    },
    {
        timestamps: true
    }
) ;
    function arrayLimit(val) {
        return val.length <=3 ;
    } 

const Pet = mongoose.model('Pet', PetSchema) ;
module.exports = Pet ;