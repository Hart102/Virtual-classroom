import io from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
// import { menuAction } from '../../Actions';
import Button from '../Button'
import * as CustomModule from '../ValidateForm/Validate'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


// joinEvent
const JoinMeeting = () => {
  let navigation = useNavigate()

  const menuActionTracker = useSelector(state => state.MenuActionTracker),
  socket = io.connect('http://localhost:5000', CustomModule.connectionOptions),
  [eventLink, setEventLink] = useState(''),
  [errorMsg, setError] = useState('');


  const joinEvent = () => { // SUBMIT EVENT LINK FUNCTION
    if (eventLink !== '') {
      socket.emit('joinEvent', eventLink)
      socket.on('active_users', (res) => {res.error ? setError(res.error) : navigation('/meeting/room', {state: res})})

    }else{
      setError('event link must be provided')
    }
  }

  return (
    <section className={menuActionTracker == 'JOIN_MEETING' ? 'Join-meeting d-flex1 align-items-center1 justify-content-center1' : 'active Join-meeting'}>
        
        <form className="form-group p-5">
          <input type="text" className="form-control p-3 border bg-white my-3" placeholder='Enter Event Link' onChange={(e) => {
              setEventLink(e.target.value)
              setError('')
            }}/>
          <button className="btn py-3 btn-block btn-success font-weight-bold border-bottom shadow" onClick={(e) => {
            e.preventDefault()
            joinEvent()
          }}>JOIN MEETING</button>
          <div className={errorMsg == "" ? "active alert" : "alert text-warning text-capitalize text-center p-2 mt-3"}>{errorMsg}</div>
        </form>
    </section>
  )
}

export default JoinMeeting