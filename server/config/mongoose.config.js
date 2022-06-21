
const mongoose = require('mongoose') ;
const pracDb = 'pracDb' ;

mongoose.connect(`mongodb://localhost/${ pracDb }`, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDb') 
    }) 
    .catch((err) => {
        console.log('DB Connection Error', err) ;
    }) ;
