
const cors = require('cors') ;
const express = require('express') ;
const app = express() ;
const socketio = require('socket.io')

app.use(cors()) ;
app.use(express.json()) ;
app.use(express.urlencoded({ extended: true })) ;

require('./config/mongoose.config') ;
require('./routes/pet.routes')(app) ;

const server = app.listen(8000, () => {
    console.log("Listening at Port 8000!")
})

const io = socketio(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: [ 'GET', 'POST' ],
        allowedHeaders: ['*'],
    }
}) ;

io.on('connection', (socket) => {
    console.log('Server side of socket id: ' + socket.id) ;
    socket.on('added_pet', (data) => {
        socket.broadcast.emit('pet_added', data) ;
    }) ;

    socket.on('deleted_pet', (data) => {
        console.log('pet deleted - pet id: ' + data) ;
        socket.broadcast.emit('pet_deleted', data) ;
    })

    })

