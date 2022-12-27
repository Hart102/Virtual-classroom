import io from 'socket.io-client'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import * as CustomModule from '../../components/ValidateForm/Validate'

import '../MeetingRoom/MeetingRoom.css'
import img from '../../asserts/Images/class_design2.jpg'
import img1 from '../../asserts/Images/profile-image-1.png'
import img2 from '../../asserts/Images/profile-image-2.png'
import img3 from '../../asserts/Images/profile-image-3.png'

const MeetingRoom = () => {
  let location = useLocation(),
  navigation = useNavigate(),
  time = CustomModule.timeFunction();

  const socket = io.connect('http://localhost:5000', CustomModule.connectionOptions)
  const room = location.state.event_room;
  //////////////////////////////// LOGOUT FUNCTION
  const log_out = socket_id => navigation('/') && socket_id != undefined ? socket.emit('logout', socket_id) : null
 

  return (

    <section className=''>
        <h1>Chat Room</h1>
      <ul>
        {
          location.state !== null && location.state.room_users.map(user => user.event_room == room &&
            <div key={location.state.user.socket_id}>
              <li className='font-weight-bold'>{user.firstname}</li>
              <p className='text-primary text-capitalize'>{user.firstname} joined at {time}</p>
            </div>
          )
        }
      </ul>
      <button className=" btn-danger py-2 px-4" onClick={() => log_out(location.state.user.socket_id)}>END EVENT</button>
    </section>
  )
}
export default MeetingRoom
// 0de3dc44-e124-47d9-8fda-6d977b6a34d8