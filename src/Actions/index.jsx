// 2. Actions

// DISPLAY SIGN_IN FORM 
export const ClickedOnSignIn = () => {
  return {
    type: "SIGNIN_CLICKED"
    // payload: action
  }
}

// DISPLAY SIGN_UP_FORM
export const ClickedOnSignuP = () => {
  return {
    type: "SIGNUP_CLICKED"
  }
}

// DISPLAY COVER_PAGE
export const CoverPage = () => {
  return {
    type: "COVER_PAGE_CLICKED"
  }
}


// MEETING MENU ACTION
export const menuAction = (action) => {
  return {
    // type: "JOIN_MEETING",
    type: action,
    payload: action
  }
}

