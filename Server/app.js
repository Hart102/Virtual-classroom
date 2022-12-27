// mongodb://localhost:27017
const express =  require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const PATH = require('path');
const cors = require('cors');
// const MongoClient  = require('mongodb').MongoClient
const { MongoClient, ServerApiVersion } = require('mongodb');

const UUID = require('uuid');

const { sign_up_auth, sign_in_auth, timeFunction } = require('./Module')
https://downloads.mongodb.com/compass/mongosh-1.6.0-win32-x64.zip


// DATABASE CONNECTION 
var usersCollections;
var linkCollection;
// var uri = "mongodb+srv://virtual_class:<12345>@cluster0.h2m6wq5.mongodb.net/?retryWrites=true&w=majority"
let uri = 'mongodb://localhost:27017'
const dbConnection = (DbName) => { MongoClient.connect(uri, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        // DBNAME 
        const db = client.db(DbName)
        // COLLECTION NAME 
        usersCollections = db.collection('User')
        linkCollection = db.collection('link_collection')
        return usersCollections, linkCollection;
    })
    .catch(error => console.error(error))
}
dbConnection('VirtualClassroom')




app.use(cors());
const io = new Server(server); //Initializing Socket

let current_user,
room_users = [];


io.on('connection', (socket) => {
    socket.on('Signup', (userdetails) => { // HANDLING SIGN UP 

        const { error, value } = sign_up_auth.validate(userdetails) 
        if (error) {
            io.sockets.emit('Signup', error.message)

        }else{
            usersCollections.insertOne(value).then(result => { // INSERTING USER TO DATABASE 
                if (result.acknowledged) {
                    io.sockets.emit('Signup', 'true')
                }
            }).catch(error => console.error(error))
        }
        
    })


    //******************* HANDLING USER LOGIN **********************
    socket.on('Login', (userdetails) => { 
        const { error, value } = sign_in_auth.validate(userdetails)

        if (error) {
            socket.emit('LoginMsg', {msg: error.message})
            
        }else{

            usersCollections.findOne({ firstname: value.firstname, password: value.password }).then(results => {
                if (results == null) {
                    socket.emit('LoginMsg', {msg: 'user does not exist'})
                }else{
                    current_user = {...results, socket_id: socket.id, role: userdetails.role} // ASSINING A SOCKET ID AND ROLE TO EVERY ACTIVE USER
                    socket.emit('LoginMsg', {msg:'true', role: userdetails.role})
                }

            }).catch(error => {
                if (error) {
                    socket.emit('LoginMsg', {msg: 'an error occured'})
                }
            })

            // users_collections.find({ firstname: value.firstname,  }).toArray().then(result => console.log(result))
            // .catch(err => console.log(err))
        }
    })


    //************************ GENERATING EVENT LINK ************************
    socket.on('GenerateMeetingLink', () => { 
        const eventlink = UUID.v4(),
        eventTime = timeFunction();

        io.sockets.emit('GenerateMeetingLink', eventlink)
        const eventdetails = {
            eventTime,
            eventlink
        }

        linkCollection.insertOne(eventdetails) // INSERTING GENERATED EVENT LINK TO THE DATABASE FOR LATER USE 
        // .then(result => {console.log(result)}) 
        .catch(error => console.error(error))
    })


    //  ********************HANDLING JION EVENT *******************************
    let user;
    socket.on('joinEvent', (eventlink) => { 
        current_user = {...current_user, event_room: eventlink}; //ASSIGNING AN EVENT ROOM TO USERS BASES ON THE EVENT LINK THEY PROVIDED
        user = current_user;
        const { event_room } = current_user;
        
        
        linkCollection.find({ eventlink: event_room }).toArray().then(res => { // VERIFYING EVENT LINK AND EVENT ROOM FROM THE DATABASE
            if (res.length > 0) {
                const { socket_id, firstname, lastname, event_room } = current_user;
                user = {socket_id, firstname, lastname, event_room};
                
                socket.join(event_room); // USER TO A ROOMS THEY SPECIIED BASED ON THE LINK
                room_users.push(user)

                return io.sockets.to(event_room).emit('active_users', { 
                user, room_users, event_room, msg: `Welcome to ${event_room} virtual class`});

            }else{
                io.sockets.emit('active_users', {error: 'incorrect link'})
            }
        }).catch(err => {
            if (err) {
                io.sockets.emit('active_users', {error: 'connection error'})
            }
        })
    })




    //***************** USER LOGOUT ***************************
    socket.on('logout', (socket_id) => { 

        const user_Disconnect = (socket_id, room_users, msg) => {
            const index = room_users.findIndex((p_user) => p_user.socket_id === socket_id),
            { event_room } = current_user;

          
            if (index !== -1) { // LOGOUT FUNCTION
                room_users.splice(index, 1)[0];
                return io.sockets.to(event_room).emit('active_users', {
                    user,  
                    room_users,
                    event_room,
                    msg: msg
                });
            }
        }
        user_Disconnect(socket_id, room_users, `Welcome to our virtual class`) 
    })

})


    





server.listen(5000, function(){
    console.log('listening on localhost:5000');
});
