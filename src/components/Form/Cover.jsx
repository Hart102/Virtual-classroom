// REDUX
import { ClickedOnSignIn, ClickedOnSignuP } from '../../Actions'
import { useDispatch, useSelector } from "react-redux"

const Cover = () => {
  const changeTracker = useSelector((state) => state.changeTracker)
  const dispatch  = useDispatch();


  return (
    <>
    <section className="py-5">

      <form className={changeTracker != 'COVER_PAGE_CLICKED' ? 'Cover-hide Cover' : 'Cover py-5'}>
          <div>
            <div className='my-3 text-white text-center my-lg-0 my-5'>
              <h3 className="font-weight-bold">Get started</h3>
              <span className='font-weight-bold text-success h5'>with Signing up or Sign in</span>
              <div className="display-1 font-weight-bold my-lg-0 my-5">Join the mouau virtual classroom</div>
            </div>

            <div className="d-flex justify-content-center mt-4">
              <div className="btn px-4 btn-primary border-bottom shadow-sm py-2 m-3 font-weight-bold" onClick={() => dispatch(ClickedOnSignuP())}>Sign up</div>
              <div className="btn px-4 btn-warning border-bottom shadow-sm py-2 m-3 font-weight-bold" onClick={() => dispatch(ClickedOnSignIn())}>Sign in</div>
            </div>
          </div>

      </form>
    </section>
    </>
  )
}

export default Cover