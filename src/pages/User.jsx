import { useSelector } from 'react-redux'

import { useLocation } from 'react-router-dom'
import '../components/Form/Form.css'
import Login from '../components/Form/Login'
import Cover from "../components/Form/Cover"
import SignUp from '../components/Form/SignUp'

const User = () => {
  // const changeTracker = useSelector((state) => state.changeTracker)
  

  return (
    <section className="form-container">
      <div className="container px-lg-5">
        <Login />
        <Cover />
        <SignUp />
      </div>
    </section>
  )
}

export default User