import { useDispatch, useSelector } from 'react-redux'
import { menuAction } from '../../Actions';





const Menu = ({ role }) => {
    /////////////////////////////////////////////
    const menuActionTracker = useSelector(state => state.MenuActionTracker),
    dispatch = useDispatch();



    /////////////////////////////////////////
  return (
    <div className={menuActionTracker != "" ? "active menu-container container py-5 d-flex flex-column align-items-center" : "menu-container container py-5 d-flex flex-column align-items-center"}>

        <div className="d-flex text-center mt-5">
            <span className={role == 'staff' ? 'd-block' : 'd-none'}>
                <div className="video mx-lg-5" onClick={() => dispatch(menuAction('NEW_MEETING'))}>
                    <i className='fa fa-video fa-3x text-white'></i>
                </div>
                <p>New Meeting</p>
            </span>
            <span>
                <div className="icon-bg mx-lg-5" onClick={() => dispatch(menuAction('JOIN_MEETING'))}>
                    <i className='fa fa-plus fa-1x'></i>
                </div>
                <p>Join Meeting</p>
            </span>
        </div>

        <span className="d-flex text-center">
            <div className="d-flex">
                <span>
                    <div className="icon-bg mx-lg-5">
                        <i className='fa fa-share'></i>
                    </div>
                    <p>Share Link</p>
                </span>
                <span>
                    <div className="icon-bg mx-lg-5">
                        <i className='fa fa-share-alt'></i>
                    </div>
                    <p>Share Link</p>
                </span>
            </div>
        </span>
    </div>
  )
}

export default Menu