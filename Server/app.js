// mongodb://localhost:27017
const express =  require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const PATH = require('path');
const cors = require('cors');
const MongoClient  = require('mongodb').MongoClient
const UUID = require('uuid');

const { sign_up_auth, sign_in_auth, timeFunction } = require('./Module')


// DATABASE CONNECTION 
let users_collections,
link_collection;
const dbConnection = (DbName) => { MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        // DBNAME 
        const db = client.db(DbName)
        // COLLECTION NAME 
        users_collections = db.collection('User')
        link_collection = db.collection('link_collection')
        return users_collections, link_collection;
    })
    .catch(error => console.error(error))
}
dbConnection('VirtualClassroom')




app.use(cors());
const io = new Server(server); //Initializing Socket

let current_user,
room_users = [];


io.on('connection', (socket) => {
    //////////////////////////////////////////////////////////////////////
    socket.on('Signup', (userdetails) => { // HANDLING SIGN UP 

        const { error, value } = sign_up_auth.validate(userdetails) 
        if (error) {
            io.sockets.emit('Signup', error.message)

        }else{
            users_collections.insertOne(value).then(result => { // INSERTING USER TO DATABASE 
                if (result.acknowledged) {
                    io.sockets.emit('Signup', 'true')
                }
            }).catch(error => console.error(error))
        }
        
    })



    ////////////////////////////////////////////////////////////////////////////
    socket.on('Login', (userdetails) => { // HANDLING USER LOGIN
        const { error, value } = sign_in_auth.validate(userdetails)
        if (error) {
            socket.emit('LoginMsg', {msg: error.message})
            
        }else{

            users_collections.findOne({ firstname: value.firstname, pwd: value.password }).then(results => {
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
        }
    })



    //////////////////////////////////////////////////////////////////////////
    socket.on('GenerateMeetingLink', () => { // GENERATING EVENT LINK
        const eventlink = UUID.v4(),
        eventTime = timeFunction();

        io.sockets.emit('GenerateMeetingLink', eventlink)
        const eventdetails = {
            eventTime,
            eventlink
        }

        link_collection.insertOne(eventdetails) // INSERTING GENERATED EVENT LINK TO THE DATABASE FOR LATER USE 
        // .then(result => {console.log(result)}) 
        .catch(error => console.error(error))
    })



    //////////////////////////////////////////////////////////////////////////
    let user;
    socket.on('joinEvent', (eventlink) => { // HANDLING JION EVENT
        current_user = {...current_user, event_room: eventlink}; //ASSIGNING AN EVENT ROOM TO USERS BASES ON THE EVENT LINK THEY PROVIDED
        user = current_user;
        const { event_room } = current_user;
        
        
        link_collection.find({ eventlink: event_room }).toArray().then(res => { // VERIFYING EVENT LINK AND EVENT ROOM FROM THE DATABASE
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




    ////////////////////////////////////////////////////// USER LOGOUT
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
    console.log('listening on localhost:5500');
});




// #105933  // mouau green
// #f5e405 mouau yellow
// #f3f3f3 mouau ash





// if (res.length > 0) {
    //         if (current_user.event_room == 'ss1') { // ADDING USER TO A SPECIFIC EVENT ROOM BASE ON HIS/HER CLASS
    //             SS1_EVENT_ROOM.push(current_user)
    //             io.sockets.emit('active_users', {
    //                 current_user, 
    //                 users: SS1_EVENT_ROOM, 
    //                 msg: `Welcome to ${current_user.event_room} virtual class`
    //             })
                
    //         }else if (current_user.event_room == 'ss2') {
    //             SS2_EVENT_ROOM.push(current_user)
    //             io.sockets.emit('active_users', {
    //                 current_user, 
    //                 users: SS2_EVENT_ROOM, 
    //                 msg: `Welcome to ${current_user.event_room} virtual class`
    //             })
                
    //         }else{
    //             SS3_EVENT_ROOM.push(current_user)
    //             io.sockets.emit('active_users', {
    //                 current_user, 
    //                 users: SS3_EVENT_ROOM, 
    //                 msg: `Welcome to ${current_user.event_room} virtual class`
    //             })
    //         }
    //     }else{
    //         io.sockets.emit('active_users', {error: 'incorrect link'})
    //     }

    // io.in(event_room).fetchSockets().then(res => console.log(res[0].id))













//     var clients = io.sockets.adapter.rooms['Room Name'].sockets;   

// //to get the number of clients
// var numClients = (typeof clients !== 'undefined') ? Object.keys(clients).length : 0;

// for (var clientId in clients ) {

//      //this is the socket of each client in the room.
//      var clientSocket = io.sockets.connected[clientId];

//      //you can do whatever you need with this
//      clientSocket.emit('new event', "Updates");

// }