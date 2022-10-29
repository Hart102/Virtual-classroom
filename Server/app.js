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

const { find_User, timeFunction } = require('./Module')


// DATABASE CONNECTION 
let collections;
const dbConnection = (DbName, collectionName) => { MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        // DBNAME 
        const db = client.db(DbName)
        // COLLECTION NAME 
        collections = db.collection(collectionName)
        return collections
    })
    .catch(error => console.error(error))
}
dbConnection('VirtualClassroom', 'User')




app.use(cors());
const io = new Server(server); //Initializing Socket

let current_user,

SS1_EVENT_ROOM = [], //////////////////////// EVENT ROOMS
SS2_EVENT_ROOM = [],
SS3_EVENT_ROOM = [];

io.on('connection', (socket) => {
    //////////////////////////////////////////////////////////////////////
    socket.on('Signup', (userdetails) => { // HANDLING SIGN UP 
        collections.insertOne(userdetails).then(result => { // INSERTING USER TO DATABASE 
            if (result.acknowledged) {
                io.sockets.emit('Signup', 'true')
            }
        }).catch(error => console.error(error))
    })



    ////////////////////////////////////////////////////////////////////////////
    socket.on('Login', (userdetails) => { // HANDLING USER LOGIN
        collections.findOne({ firstname: userdetails.firstname, pwd: userdetails.pwd }).then(results => {
            if (results == null) {
                socket.emit('LoginMsg', {msg: 'user does not exist'})
            }else{
                current_user = {...results, pwd: socket.id, event_room: userdetails.eventRoom} // ASSINING A SESSION ID EVENT ROOM TO EVERY ACTIVE USER
                socket.emit('LoginMsg', 'true')
            }
        }).catch(error => {
            if (error) {
                socket.emit('LoginMsg', {msg: 'an error occured'})
            }
        })
    })



    //////////////////////////////////////////////////////////////////////////
    socket.on('GenerateMeetingLink', (studentsClass) => { // GENERATING EVENT LINK
        const eventlink = UUID.v4(),
        eventTime = timeFunction();

        io.sockets.emit('GenerateMeetingLink', eventlink)
        const eventdetails = {
            studentsClass,
            eventTime,
            eventlink
        }

        collections.insertOne(eventdetails) // INSERTING GENERATED EVENT LINK TO THE DATABASE FOR LATER USE 
        // .then(result => {console.log(result)}) 
        .catch(error => console.error(error))
    })



    //////////////////////////////////////////////////////////////////////////
    socket.on('joinEvent', (eventlink) => { // HANDLING JION EVENT
        collections.find({ eventlink: eventlink, studentsClass: current_user.event_room }).toArray().then(res => { // VERIFYING EVENT LINK AND EVENT ROOM FROM THE DATABASE
            if (res.length > 0) {
                if (current_user.event_room == 'ss1') { // ADDING USER TO A SPECIFIC EVENT ROOM BASE ON HIS/HER CLASS
                    SS1_EVENT_ROOM.push(current_user)
                    io.sockets.emit('active_users', {
                        current_user, 
                        users: SS1_EVENT_ROOM, 
                        msg: `Welcome to ${current_user.event_room} virtual class`
                    })
                    
                }else if (current_user.event_room == 'ss2') {
                    SS2_EVENT_ROOM.push(current_user)
                    io.sockets.emit('active_users', {
                        current_user, 
                        users: SS2_EVENT_ROOM, 
                        msg: `Welcome to ${current_user.event_room} virtual class`
                    })
                    
                }else{
                    SS3_EVENT_ROOM.push(current_user)
                    io.sockets.emit('active_users', {
                        current_user, 
                        users: SS3_EVENT_ROOM, 
                        msg: `Welcome to ${current_user.event_room} virtual class`
                    })
                }
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
    socket.on('logout', (pwd) => { 
        const user_Disconnect = (pwd, event_room, current_user, msg) => {
            const index = event_room.findIndex((p_user) => p_user.pwd === pwd);
          
            if (index !== -1) { // LOGOUT FUNCTION
                event_room.splice(index, 1)[0];
                return io.sockets.emit('active_users', {
                    users: event_room, 
                    current_user, 
                    msg: msg
                })
            }
        }
        // SS1_EVENT_ROOM LOGOUT FUNCTION
        user_Disconnect(pwd, SS1_EVENT_ROOM, `Welcome to ${current_user.event_room} virtual class`) 
        // SS2_EVENT_ROOM LOGOUT FUNCTION
        user_Disconnect(pwd, SS2_EVENT_ROOM, `Welcome to ${current_user.event_room} virtual class`)
        // SS3_EVENT_ROOM LOGOUT FUNCTION
        user_Disconnect(pwd, SS3_EVENT_ROOM, `Welcome to ${current_user.event_room} virtual class`)
    })







    // WANT TO DELETE ANY LINK GENERATED AFTER 24HOURS 
    // const options = {
    //     hour: 'numeric', 
    //     minute: 'numeric'
    // }
    // let currentDate = new Date()
    // let expiryTime = currentDate.getTime()
    // const formattedTime = expiryTime.toLocaleString('en-US', options);
    // // console.log(formattedTime)
    
    // collections.find({ eventTime: "1:44 AM" }).toArray()
    // .then(response => console.log(response))
    // .catch(error => console.log(error))

})


    





server.listen(5000, function(){
    console.log('listening on localhost:5500');
});




// #105933  // mouau green
// #f5e405 mouau yellow
// #f3f3f3 mouau ash