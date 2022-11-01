import io from 'socket.io-client'

// REDUX ///////////////////////////////
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { CoverPage } from '../../Actions'

// CUSTOM MODUELS /////////////////////////////////
import * as CustomModule from '../ValidateForm/Validate'

// COMPONENTS //////////////////////////////
import FormTitle from "./FormTitle"
import InputField from "./InputField"
import userImg from '../../asserts/Images/user-icon.png'
import lockImg from '../../asserts/Images/lock.png'

/////////////////////////////////////////////
const Login = () => {
  let navigation = useNavigate();

  // REDUX ////////////////////////////////////
  const socket = io.connect('http://localhost:5000', CustomModule.connectionOptions),
  changeTracker = useSelector((state) => state.changeTracker),
  dispatch  = useDispatch();

  /////////////////////////////////////////////////
  const [errorMsg, setMsg] = useState(''),
  [firstname, setName] = useState(''),
  [password, setPwd] = useState(''),
  [role, setRole] = useState(''),

  user = {
    firstname,
    password,
    role
  };

  //////////////////////////// LOGIN FUNCTION
  const validateForm = (e) => { 
    e.preventDefault()
    socket.emit('Login', user)

    socket.on('LoginMsg', (response) => {
      {response.msg != 'true' ? setMsg(response.msg) : navigation('/classroom', {state: response})}
    })
  }



  return (
    <form className={changeTracker == 'SIGNIN_CLICKED' ? 'login-active Login py-5 px-lg-5 col-md-4' : 'Login'}>
      <div>
        <FormTitle 
          Title={'Login'} 
          Text={'Login to access your account.'}
          onclick={() => dispatch(CoverPage())}
        />


        <div className="px-4 my-4">
          <InputField type={'text'} name={'firstname'} id={'firstname'} image={userImg} onchange={(e) => {
            setName(e.target.value)
            setMsg('')}}
          />
          <InputField type={'password'} name={'password'} id={'password'} image={lockImg} onchange={(e) => {
            setPwd(e.target.value)
            setMsg('')}}
          />
        </div>

        <div className="role d-flex justify-content-between  px-4">
          <span className="d-flex align-items-baseline cusor">
            <input type="radio" name="role" value={'staff'} id='staff' onClick={(e) => setRole(e.target.value)}/>
            <label htmlFor="staff">Staff</label>
          </span>

          <span className="d-flex align-items-baseline cusor">
            <input type="radio" name="role" value={'student'} id='student' onClick={(e) => setRole(e.target.value)}/>
            <label htmlFor="student">Student</label>
          </span>
        </div>

        <div className="d-flex justify-content-center px-4">
          <button className="btn btn-block text-white px-5 btn-success py-2 font-weight-bold mt-5" onClick={validateForm}>Sign in</button>
        </div>

        <div className="text-center my-5">
          <i className="text-danger text-capitalize">{errorMsg}</i>
          <div className='text-success cusor' onClick={() => dispatch(CoverPage())}>Don't have an account ?</div>
        </div>
      </div>
    </form>
  )
}

export default Login