// 3. Reducer
const MenuActionTracker = (state = '', action) => {
    switch (action.payload) {
      case "NEW_MEETING":
        return state = action.payload;


      case "JOIN_MEETING":
        return state = action.payload;


      case "":
        return state = action.payload;

        
      default:
        return state;
    }
  }
  
  export default MenuActionTracker