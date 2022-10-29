import io from 'socket.io-client'

import { useSelector, useDispatch } from 'react-redux'
import { ClickedOnSignIn } from '../../Actions'

// import { ClickedOnSignIn } from '../../Actions'
import { CoverPage } from '../../Actions'
import { useState } from 'react'

// CUSTOM MODULE 
import * as customModule from '../ValidateForm/Validate'

import FormTitle from "./FormTitle"
import InputField from "./InputField"
import userImg from '../../asserts/Images/user-icon.png'
import lockImg from '../../asserts/Images/lock.png'

let socket = io.connect('http://localhost:5000', customModule.connectionOptions)

const SignUp = () => {
  const changeTracker = useSelector((state) => state.changeTracker)
  const dispatch  = useDispatch();


  // FORM VALIDATION 
  const [errorMsg, setErrorMsg] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [pwd, setPwd] = useState('')

  const userInfo = {
    firstname: customModule.convertToLowerCase(firstname),
    lastname: customModule.convertToLowerCase(lastname),
    pwd: customModule.convertToLowerCase(pwd)
  }

  const handleSignup = () => {
    
    if (customModule.validateInput('passWord', 4).error) {
      setErrorMsg(customModule.validateInput('passWord', 4).error)

    }else {
      setPwd(customModule.validateInput('passWord', 4));
    }

    if (customModule.validateInput('lastName').error) {
      setErrorMsg(customModule.validateInput('lastName').error)

    }else {
      setLastname(customModule.validateInput('lastName'));
    }
    

    if (customModule.validateInput('firstName').error) {
      setErrorMsg(customModule.validateInput('firstName').error) 

    }else{
      setFirstname(customModule.validateInput('firstName'));
      /////////////////////////////////////////////////////////////////
      if (firstname.length != 0 && pwd.length != 0) {
        socket.emit('Signup', userInfo) 

        socket.on('Signup', (res) => { // DISPLAYING THE LOGIN FOR WHEN A USER SIGNUP SUCCESSFULLY
          if (res == 'true') {
            dispatch(ClickedOnSignIn())

            customModule.elementSelector('firstName').value = ''
            customModule.elementSelector('lastName').value = ''
            customModule.elementSelector('passWord').value = ''
          }
        })
      }
    }


    
  }

 





  return (
    <form className={changeTracker == "SIGNUP_CLICKED" ? "SignUp-active SignUp px-lg-5 bg-white col-md-4" : "SignUp py-5"}>
      <div className="d-flex flex-column py-5">
        <FormTitle 
          Title={'Register'} 
          Text={'you and your friends are always connected'}
          onclick={() => dispatch(CoverPage())}
        />

        <div className="px-4 my-5">
          <InputField name={'firstname'} id={'firstName'} image={userImg} onchange={() => setErrorMsg('')}/>
          <InputField name={'lastname'} id={'lastName'} image={userImg} onchange={() => setErrorMsg('')}/>
          <InputField name={'password'} id={'passWord'} image={lockImg} onchange={() => setErrorMsg('')}/>

          <div className="d-flex justify-content-center">
            <div className="btn btn-block px-5 btn-success text-white py-2 font-weight-bold mt-5" onClick={() => {
              handleSignup()
            }}>Sign up</div>
          </div>

          <div className='text-center my-4'>
            <i className="text-danger my-5 text-capitalize">{errorMsg}</i>
            <div className='text-success cusor' onClick={() => dispatch(CoverPage())}>Already have an account ?</div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default SignUp 