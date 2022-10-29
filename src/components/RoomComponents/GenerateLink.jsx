import io from 'socket.io-client'

import { useState } from 'react'
import { useSelector } from 'react-redux'

import Button from '../Button'
import { elementSelector } from '../ValidateForm/Validate'
import * as CustomModule from '../ValidateForm/Validate'



const GenerateLink = () => {
    const menuActionTracker = useSelector(state => state.MenuActionTracker),
    socket = io.connect('http://localhost:5000', CustomModule.connectionOptions),
    [errorMsg, setErrorMsg] = useState(''),
    [studentsClass, setStudentsClass] = useState(''),
    [generatedLink, setGeneratedLink] = useState('');

    
    const generateMeetingLink = (e) => { // GENERATE MEETING MEETING 
        e.preventDefault()
        if (studentsClass != '') {
            socket.emit('GenerateMeetingLink', studentsClass)
            
        }else{
            setErrorMsg("student's class must be specified");
        }
    }

    socket.on('GenerateMeetingLink', (response) => { //RECIEVING THE MEETING LINK FROM THE SERVER
        setGeneratedLink(response)
    })

     
    const copy = () => { // COPY MEETING LINK FUNCTIONALITY
        navigator.clipboard.writeText(elementSelector('meeting-link').textContent)
    }
    
  return (
    <section className={menuActionTracker == 'NEW_MEETING' ? 'Generate-link' : 'active Generate-link'}>
        <form className='px-lg-0 px-3'>
            <div className="text-center my-4">
                <b className="h4 text-white text-uppercase font-weight-bold">Generate event link</b>
            </div>
            <div className="options d-lg-flex align-items-center">
                <select name="class" className='form-control py-3' onChange={(e) => {
                    setStudentsClass(e.target.value)
                    setErrorMsg('')
                }}>
                    <option value="" defaultValue={false} disabled={false}>CHOOSE CLASS EG: SS1</option>
                    <option value="ss1">SS1</option>
                    <option value="ss2">SS2</option>
                    <option value="ss3">SS3</option>
                </select>

                {/* <Button btnText={'Generate'} onclick={generateMeetingLink}/> */}
                <div className="col-md-4">
                    <button className='bg-success btn btn-block font-weight-bold text-white mt-lg-0 mt-2 py-3 text-uppercase border-bottom shadow' onClick={generateMeetingLink}>Generate</button>
                </div>
            </div>

            <div className={errorMsg == "" ? "active alert" : "alert text-warning p-2 text-center"}>{errorMsg}</div>
            <div className="link-container my-3 p-4 d-flex justify-content-between" id='link-container'>
                <p className="meeting-link text-truncate h6 text-success text-uppercase" id='meeting-link'>{generatedLink}</p>
                <i className="fa fa-copy text-dark cusor" onClick={() => copy()} title='Click to copy Link'></i>
            </div>
        </form>
    </section>
  )
}


export default GenerateLink 