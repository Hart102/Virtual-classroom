import '../components/RoomComponents/RoomComponents.css'

import io from 'socket.io-client'
import { useDispatch } from 'react-redux'
import { menuAction } from '../Actions'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

////////////////////////////////////////////////////////////////
import * as CustomModule from '../components/ValidateForm/Validate'
import Menu from '../components/RoomComponents/Menu'
import GenerateLink from '../components/RoomComponents/GenerateLink'
import JoinMeeting from '../components/RoomComponents/JoinMeeting'



const ClassRoom = ()  => {
  let location = useLocation(),
  navigation = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.state == null){
      navigation('/')
    }
  },[])


  return (
    <section className='menu_container'>
      <header className="navbar fixed-top">
        <div className="container border-bottom d-flex justify-content-between align-items-center py-4">
          <div className="font-weight-bold text-uppercase display-6 ml-2 ml-lg-0 text-white cusor" onClick={() => dispatch(menuAction(''))}>virtual classroom</div>
        </div>
      </header>
      <div className="d-flex flex-column justify-content-center py-5">
        {location.state !== null &&
          <Menu role={location.state.role}/>
        }
        <GenerateLink />
        <JoinMeeting />
      </div>
    </section>


  )
}

export default ClassRoom

