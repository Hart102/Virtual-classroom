// 3. Reducer
const changeTracker = (state = 'COVER_PAGE_CLICKED', action) => {
  switch (action.type) {
    case "SIGNIN_CLICKED":
      return state = "SIGNIN_CLICKED";
      
    case "SIGNUP_CLICKED":
      return state = "SIGNUP_CLICKED";

    case "COVER_PAGE_CLICKED":
      return state = "COVER_PAGE_CLICKED";
    
    default:
      return state;
  }
}

export default changeTracker