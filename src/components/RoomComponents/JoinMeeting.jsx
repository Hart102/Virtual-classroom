import io from 'socket.io-client'
import { menuAction } from '../../Actions';
import { useDispatch, useSelector } from 'react-redux'
import Button from '../Button'
import * as CustomModule from '../ValidateForm/Validate'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


// joinEvent
const JoinMeeting = () => {
  let navigation = useNavigate()

  const menuActionTracker = useSelector(state => state.MenuActionTracker),
  socket = io.connect('http://localhost:5000', CustomModule.connectionOptions),
  dispatch = useDispatch(),
  [eventLink, setEventLink] = useState(''),
  [errorMsg, setError] = useState('');


  const joinEvent = () => { // SUBMIT EVENT LINK FUNCTION
    if (eventLink !== '') {
      socket.emit('joinEvent', eventLink)
      socket.on('active_users', (res) => {res.error ? setError(res.error) : navigation('/meeting/newclass', {state: res})})

      
    }else{
      setError('event link must be provided')
    }
  }

  return (
    <section className={menuActionTracker == 'JOIN_MEETING' ? 'Join-meeting' : 'active Join-meeting'}>
        
        <form className="form-group p-4 bg-white">
          <div className="closing_tab d-flex justify-content-end">
            <div className="fa fa-times text-dark cusor p-2" onClick={() => dispatch(menuAction(''))}></div>
          </div>

          <input type="text" className="form-control p-3 border bg-white my-4" placeholder='Enter Event Link' onChange={(e) => {
              setEventLink(e.target.value)
              setError('')
            }}/>
          <button className="btn py-3 col-md-12 btn-success font-weight-bold border-bottom shadow" onClick={(e) => {
            e.preventDefault()
            joinEvent()
          }}>JOIN MEETING</button>
          <div className={errorMsg == "" ? "active alert" : "alert text-warning text-capitalize text-center p-2 mt-3"}>{errorMsg}</div>
        </form>
    </section>
  )
}

export default JoinMeeting