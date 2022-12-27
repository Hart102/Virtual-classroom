import io from 'socket.io-client'

import { useState } from 'react'
import { menuAction } from '../../Actions'
import { useSelector, useDispatch } from 'react-redux'

import Button from '../Button'
import { elementSelector } from '../ValidateForm/Validate'
import * as CustomModule from '../ValidateForm/Validate'



const GenerateLink = () => {
    const menuActionTracker = useSelector(state => state.MenuActionTracker),
    socket = io.connect('http://localhost:5000', CustomModule.connectionOptions),
    dispatch = useDispatch(),

    [errorMsg, setErrorMsg] = useState(''),
    [studentsClass, setStudentsClass] = useState(''),
    [generatedLink, setGeneratedLink] = useState('');

    
    const generateMeetingLink = (e) => { // GENERATE MEETING MEETING 
        e.preventDefault()
        socket.emit('GenerateMeetingLink')
    }

    socket.on('GenerateMeetingLink', (response) => { //RECIEVING THE MEETING LINK FROM THE SERVER
        setGeneratedLink(response)
    })

     
    const copy = () => { // COPY MEETING LINK FUNCTIONALITY
        navigator.clipboard.writeText(elementSelector('meeting-link').textContent)
    }
    
  return (
    <section className={menuActionTracker == 'NEW_MEETING' ? 'Generate-link' : 'active Generate-link'}>
        <form className='px-3 bg-white'>
            <div className="closing_tab d-flex justify-content-end py-2">
                <div className="fa fa-times text-dark p-2 cusor" onClick={() => dispatch(menuAction(''))}></div>
            </div>

            <div className="text-center my-4">
                <b className="h4 text-dark text-uppercase font-weight-bold">Generate event link</b>
            </div>

            <div className="link-container my-3 p-4 d-flex justify-content-between" id='link-container'>
                <p className="meeting-link text-truncate h6 text-dark text-uppercase" id='meeting-link'>{generatedLink}</p>
                <i className="fa fa-copy text-dark cusor" onClick={() => copy()} title='Click to copy Link'></i>
            </div>
            <button className='bg-success btn col-md-12 font-weight-bold text-white mt-lg-0 mt-2 py-3 text-uppercase border-bottom shadow' onClick={generateMeetingLink}>Generate</button>
            <div className={errorMsg == "" ? "active alert" : "alert text-warning p-2 text-center"}>{errorMsg}</div>
        </form>
    </section>
  )
}


export default GenerateLink 