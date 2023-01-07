// REDUX
import { ClickedOnSignIn,
  ClickedOnSignuP, 
  CoverPage } from '../../Actions'
import { useDispatch, useSelector } from "react-redux"

const Cover = () => {
  const changeTracker = useSelector((state) => state.changeTracker)
  const dispatch  = useDispatch();

  // COVER_PAGE_CLICKED
  return (
    <>
    <section className="py-5">

      <form className={changeTracker != 'COVER_PAGE_CLICKED' ? 'Cover-hide Cover' : 'Cover py-5'}>
          <div>
            <div className='my-3 text-white text-center my-lg-0'>
              <h3>Get started</h3>
              <span className='h6'>with Signing up or Sign in</span>
            </div>
            <div className="my-5 text-white px-lg-5 text-center text-uppercase">
              <div className="display-5 font-weight-bold my-lg-0 my-5 px-lg-5">Join mouau secondary school virtual classroom</div>
            </div>

            <div className="d-flex justify-content-center mt-4">
              <div className="btn btn-1 px-4 btn-primary border-bottom shadow-sm py-3 px-5 m-3 font-weight-bold" 
              onClick={() => dispatch(ClickedOnSignuP())}>Sign up</div>

              <div className="btn btn-2 px-4 btn-warning border-bottom shadow-sm py-3 px-5 m-3 font-weight-bold" 
              onClick={() => dispatch(ClickedOnSignIn())}>Sign in</div>
            </div>
          </div>

      </form>
    </section>
    </>
  )
}

export default Cover