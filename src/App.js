import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// import '../src/asserts/CSS/fontawesome-free-5.13.0-web/css/all.min.css'
// import '../src/asserts/CSS/bootstrap.min.css'
import User from "./pages/User";
import ClassRoom from "./pages/ClassRoom";
import MeetingRoom from "./pages/MeetingRoom/MeetingRoom";
import NewClass from "./pages/NewClass";
import JoinMeeting from "./components/RoomComponents/JoinMeeting";

// import reportWebVitals
// import { createStore } from "redux";


// // 1. Store 
// // 2. Action
// const ClickedOnSignIn = () => {
//   return {
//     type: "SIGNIN_CLICKED"
//   }
// }

// const ClickedOnSignuP = () => {
//   return {
//     type: "SIGNUP_CLICKED"
//   }
// }
// // 3. Reducer
// const changeTracker = (state = '', action) => {
//   switch (action.type) {
//     case "SIGNIN_CLICKED":
//       return state = "LOGIN";
      
//     case "SIGNUP_CLICKED":
//       return state = "CREATE ACCOUNT";
    
//     default:
//       return state = '';
//   }
// }

// let store = createStore(changeTracker);
// store.subscribe(() => console.log(store.getState()))

// // 4. Dispatch
// store.dispatch(ClickedOnSignuP())


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/classroom" element={<ClassRoom />} />
        <Route path="/meeting/joinmeeting" element={<JoinMeeting />} />
        <Route path="/meeting/newclass" element={<NewClass />} />




        {/* <Route path="/meeting/room" element={<MeetingRoom />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App 