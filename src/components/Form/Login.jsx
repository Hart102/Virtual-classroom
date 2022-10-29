import io from 'socket.io-client'

// REDUX ///////////////////////////////
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { CoverPage, ClickedOnSignuP } from '../../Actions'

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
  [pwd, setPwd] = useState(''),
  [eventRoom, setEventRoom] = useState(''),

  user = {
    firstname,
    pwd,
    eventRoom
  };

  /////////////////////////////////////////////
  const validateForm = (e) => {
    e.preventDefault()
   
    if (CustomModule.validateInput('firstname').error) {
      setMsg(CustomModule.validateInput('firstname').error) 

    }else{
      setName(CustomModule.validateInput('firstname'));

      if (CustomModule.validateInput('password', 4).error) {
        setMsg(CustomModule.validateInput('password', 4).error)
      }

      if (!CustomModule.validateInput('password', 4).error) {
        setPwd(CustomModule.validateInput('password', 4));
      }
    }
    
    //////////////////////////////////////////////////////////////
    if (firstname == '' || pwd == '' || eventRoom == ''){
      setMsg('class cannot be empty')
      
    }else{
      socket.emit('Login', user)
      socket.on('LoginMsg', (response) => {
        {response != 'true' ? setMsg(response.msg) : navigation('/classroom', {state: 'true'})}
      })
    }
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
          <InputField name={'firstname'} id={'firstname'} image={userImg} onchange={() => setMsg('')}/>
          <InputField name={'password'} id={'password'} image={lockImg} onchange={() => setMsg('')}/>
          <select name="class" className='form-control py-3 mt-4' onChange={(e) => {
            setEventRoom(e.target.value)
            setMsg('')
          }}>
            <option value="" defaultValue={false} disabled={false}>Select class</option>
            <option value="ss1">SS1</option>
            <option value="ss2">SS2</option>
            <option value="ss3">SS3</option>
          </select>
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