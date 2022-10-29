import io from 'socket.io-client'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import * as CustomModule from '../../components/ValidateForm/Validate'

import '../MeetingRoom/MeetingRoom.css'
import img from '../../asserts/Images/profile-image-1.png'

const MeetingRoom = () => {
  let location = useLocation(),
  navigation = useNavigate(),
  time = CustomModule.timeFunction();
  const socket = io.connect('http://localhost:5000', CustomModule.connectionOptions)

  const log_out = (session_pwd) => { // LOGOUT FUNCTION
    if (session_pwd != undefined) {
      socket.emit('logout', session_pwd)
    }
    navigation('/')
  }
 

  return (
    <section className=''>
      {location.state !== null && <h4 className='text-success text-uppercase'>{location.state.msg}</h4>}

      <ul>
        { location.state !== null && location.state.users.map(user =>
          <div>
            <li className='font-weight-bold'>{user.firstname}</li>
            <p className='text-primary text-capitalize'>{user.firstname} joined at {time}</p>
          </div>
        )}
      </ul>


      <button className=" btn-danger py-2 px-4" onClick={() => log_out(location.state.current_user.pwd)}>END EVENT</button>

    </section>
  )
}
export default MeetingRoom
// 0de3dc44-e124-47d9-8fda-6d977b6a34d8