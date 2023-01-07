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
  const [password, setPwd] = useState('')

  const userInfo = { // CONVERTING USER INPUT TO LOWERCASE
    firstname,
    lastname,
    password
  }

  const handleSignup = () => { // SIGN UP FUNCTION
    socket.emit('Signup', userInfo)
    
    socket.on('Signup', res => {
      if (res != 'true') {
        setErrorMsg(res)

      }else{
        dispatch(ClickedOnSignIn())
        customModule.elementSelector('firstName').value = ''
        customModule.elementSelector('lastName').value = ''
        customModule.elementSelector('passWord').value = ''
      }
    })
  }
 





  return (
    <form className={changeTracker == "SIGNUP_CLICKED" ? "SignUp-active SignUp px-lg-5 bg-white col-md-4" : "SignUp py-5"}>
      <div>
        <i className="fa fa-times fa-2x cusor" onClick={() => dispatch(CoverPage())}></i>
      </div>
      <div className="d-flex flex-column py-5">
        <FormTitle 
          Title={'Register'} 
          Text={'you and your friends are always connected'}
          onclick={() => dispatch(CoverPage())}
        />

        <div className="px-4 my-5">
          <InputField 
            type={'text'} 
            display={'none'}
            name={'firstname'} 
            id={'firstName'} 
            placeholder={'Firstname'}
            image={userImg} 
            onchange={(e) => {
            setFirstname(e.target.value)
            setErrorMsg('')}}
          />

          <InputField 
            type={'text'} 
            display={'none'}
            name={'lastname'} 
            id={'lastName'} 
            placeholder={'Lastname'}
            image={userImg} 
            onchange={(e) => {
            setLastname(e.target.value)
            setErrorMsg('')}}
          />

          <InputField 
            type={'password'} 
            display={'block'}
            name={'password'} 
            id={'passWord'} 
            placeholder={'Password'}
            viewPassword={() => customModule.view_password('passWord')}
            image={lockImg} 
            onchange={(e) => {
            setPwd(e.target.value)
            setErrorMsg('')}}
          />

          <button className="btn btn-block px-5 shadow border py-3 font-weight-bold mt-3 col-md-12" onClick={(e) => {
            e.preventDefault()
            handleSignup()
          }}>Sign up</button>

          <div className='text-center my-4'>
            <i className="text-danger my-5 text-capitalize">{errorMsg}</i>
            {/* <div className='cusor' onClick={() => dispatch(CoverPage())}>Already have an account ?</div> */}
          </div>
        </div>
      </div>
    </form>
  )
}

export default SignUp 