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
      // <section className="chat_container">
      //   <div className="top_bar font-weight-bold text-dark bg-white py-3 border-bottom">
      //     <div className="container">
      //       VIRTUAL
      //     </div>
      //   </div>

      //   <div className="main d-lg-flex justify-content-between">
      //     {/* /////////////////// TUTOR CONTAINER /////////////////////// */}
      //     <div className="container_one d-lg-block d-none">
      //       <div className="tutors_container">
      //         <div className="tutor_img">
      //           <img src={img} alt="" className="img-fluid" />
      //         </div>
      //       </div>
      //     </div>

      //     <div className="container_two bg-white">
      //       {/* ///////////////////////// PARTICIPANT'S ////////////////////////////// */}
      //       <div className="participants_container d-lg-flex d-none">
      //         <div className="participants_img mx-2">
      //           <img src={img1} className="img-fluid" />
      //         </div>
      //         <div className="participants_img mx-2">
      //           <img src={img2} className="img-fluid" />
      //         </div>
      //         <div className="participants_img mx-2">
      //           <img src={img3} className="img-fluid" />
      //         </div>
      //         <div className="participants_img mx-2">
      //           <img src={img1} className="img-fluid" />
      //         </div>
      //         <div className="participants_img mx-2">
      //           <img src={img} className="img-fluid" />
      //         </div>
      //         <div className="participants_img mx-2">
      //           <img src={img} className="img-fluid" />
      //         </div>
      //         <div className="participants_img mx-2">
      //           <img src={img} className="img-fluid" />
      //         </div>
      //         <div className="participants_img mx-2">
      //           <img src={img} className="img-fluid" />
      //         </div>
      //         <div className="participants_img mx-2">
      //           <img src={img} className="img-fluid" />
      //         </div>
      //         <div className="participants_img mx-2">
      //           <img src={img} className="img-fluid" />
      //         </div>
      //         <div className="participants_img mx-2">
      //           <img src={img} className="img-fluid" />
      //         </div>
      //       </div>


        
      //       {/* ///////////////////  WHITE BOARD  //////////////////////////// */}
      //       <div className="board bg-white border-top p-5 mt-3">
      //         <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad eos delectus minima sint sapiente sed ut impedit excepturi repellat esse? Itaque necessitatibus nihil numquam! Asperiores incidunt possimus explicabo minus recusandae?</p>
      //       </div>
      //     </div>

      //     <div className="more_menu bg-danger">
      //       <ul className="list-unstyled">
      //         <li>Participants</li>
      //         <li>end event</li>
      //         <li>Participants</li>
      //         <li>end event</li>
      //         <li>Participants</li>
      //         <li>end event</li>
      //         <li>Participants</li>
      //         <li>end event</li>
      //         <li>Participants</li>
      //         <li>end event</li>
      //         <li>Participants</li>
      //         <li>end event</li>
      //         <li>Participants</li>
      //         <li>end event</li>
      //         <li>Participants</li>
      //         <li>end event</li>
      //       </ul>
      //     </div>
      //   </div>



      //   {/* /////////////////////// TASK BAR /////////////////////////// */}
      //   <div className="task_bar bg-white border-top">
      //     <div className="container d-flex align-items-aling-items-baseline justify-content-between">
      //       <ul className="list-unstyled d-flex justify-content-end align-items-center col-md-8">
      //         <li className="nav-link">
      //           <i className="fa fa-video"></i>
      //         </li>
      //         <li className="nav-link">
      //           <i className="fa fa-camera"></i>
      //         </li>
      //         <li className="nav-link">
      //           <i className="fa fa-microphone"></i>
      //         </li>
              
      //         <li className="nav-link">
      //           <i className="font-weight-bold">...</i>
      //         </li>
      //       </ul>
      //     </div>
      //   </div>
      // </section>


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