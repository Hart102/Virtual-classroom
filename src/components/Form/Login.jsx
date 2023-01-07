import io from 'socket.io-client'

// REDUX
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { CoverPage } from '../../Actions'

// CUSTOM MODUELS 
import * as CustomModule from '../ValidateForm/Validate'

// COMPONENTS 
import FormTitle from "./FormTitle"
import InputField from "./InputField"
import userImg from '../../asserts/Images/user-icon.png'
import lockImg from '../../asserts/Images/lock.png'

const Login = () => {
  let navigation = useNavigate();

  const socket = io.connect('http://localhost:5000', CustomModule.connectionOptions),
  changeTracker = useSelector((state) => state.changeTracker),
  dispatch  = useDispatch();

  const [errorMsg, setMsg] = useState(''),
  [firstname, setName] = useState(''),
  [password, setPwd] = useState(''),
  [role, setRole] = useState(''),

  user = {
    firstname,
    password,
    role
  };

  // LOGIN FUNCTION
  const validateForm = (e) => { 
    e.preventDefault()
    socket.emit('Login', user)

    socket.on('LoginMsg', (response) => {
      {response.msg != 'true' ? setMsg(response.msg) : navigation('/classroom', {state: response})}
    })
  }


  return (
    <form className={changeTracker == 'SIGNIN_CLICKED' ? 'login-active Login py-5 px-lg-5 col-md-4' : 'Login'}>
      <div className='text-end'>
        <i className="fa fa-times fa-2x cusor" onClick={() => dispatch(CoverPage())}></i>
      </div>
      <div>
        <FormTitle 
          Title={'Login'} 
          Text={'Login to access your account.'}
          onclick={() => dispatch(CoverPage())}
        />


        <div className="px-4 my-4">
          <InputField 
            type={'text'} 
            display={'none'}
            name={'firstname'} 
            id={'firstname'} 
            placeholder={'Firstname'}
            onchange={(e) => {
            setName(e.target.value)
            setMsg('')}}
          />

          <InputField 
            type={'password'}
            display={'block'}
            name={'password'} 
            placeholder={'Password'}
            id={'password'} 
            viewPassword={() => CustomModule.view_password('password')}
            onchange={(e) => {
            setPwd(e.target.value)
            setMsg('')}}
          />
        </div>

        <div className="role d-flex justify-content-between  px-4">
          <span className="d-flex align-items-baseline cusor">
            <input type="radio" name="role" value={'staff'} id='staff' onClick={(e) => setRole(e.target.value)}/>
            <label htmlFor="staff" className='mx-2'>Cordinator</label>
          </span>

          <span className="d-flex align-items-baseline cusor">
            <input type="radio" name="role" value={'student'} id='student' onClick={(e) => setRole(e.target.value)}/>
            <label htmlFor="student" className='mx-2'>Participant</label>
          </span>
        </div>

        <div className="d-flex justify-content-center px-4">
          <button className="btn btn-block px-5 shadow border py-3 font-weight-bold mt-5 col-md-12" onClick={validateForm}>Sign in</button>
        </div>

        <div className="text-center my-5">
          <i className="text-danger text-capitalize">{errorMsg}</i>
          {/* <div className='cusor' onClick={() => dispatch(CoverPage())}>Don't have an account ?</div> */}
        </div>
      </div>
    </form>
  )
}

export default Login