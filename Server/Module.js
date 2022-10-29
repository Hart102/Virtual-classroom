// GET A SPECIFIC USER 
const find_User = (arrayOfUsers, pwd) => arrayOfUsers.find(user => pwd == user.pwd)


// TIME FUNCTION 
const timeFunction = () => {
  const time = new Date();
  const options = {
    hour: 'numeric', 
    minute: 'numeric'
  }
  const formattedTime = time.toLocaleString('en-US', options);
  return formattedTime
}


module.exports = {
  find_User,
  timeFunction
}










// // SOCKET CONNECTION OPTIONS


// const c_users = [];

// // JOIN THE USER TO A SPECIFIC CHAT ROOM 
// const join_User = (id, username, room) => {
//   const p_user = { id, username, room };

//   c_users.push(p_user);
//   console.log(c_users, "users");

//   return p_user;
// }

// console.log("user out", c_users);



// // GET A PARTICULAR USER ID TO RETURN THE CURRENT USER 
// const get_Current_User = (id) => {
//   return c_users.find((p_user) => p_user.id === id);
// }



// // called when the user leaves the chat and its user object deleted from array
// // THIS FUNCTION GETS CALLED THE A USER LEAVES THE CHAT ROOM AND IT DELETED FROM THE ARRAY OF ACTIVE USERS 
// const user_Disconnect = (id) => {
//   const index = c_users.findIndex((p_user) => p_user.id === id);

//   if (index !== -1) {
//     return c_users.splice(index, 1)[0];
//   }
// }

// module.exports = {
//   join_User,
//   get_Current_User,
//   user_Disconnect,
// };





 ////////////////////////////////////////////////////////////////
    // const user_Disconnect = (pwd) => {
    //     const index = SS1_EVENT_ROOM.findIndex((p_user) => p_user.pwd === pwd);
      
    //     if (index !== -1) { // LOGOUT FUNCTION FOR SS1
    //         SS1_EVENT_ROOM.splice(index, 1)[0];
    //         io.sockets.emit('active_users', {
    //             users: SS1_EVENT_ROOM, 
    //             current_user, 
    //             msg: `Welcome to ${current_user.event_room} virtual class`
    //         })
    //     }
    // }

