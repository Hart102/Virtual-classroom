// SOCKET CONNECTION OPTIONS /////////////////////////
export const connectionOptions = {
    "force new connection" : true,
    "reconnectionAttempts" : "Infinity",
    "timeout" : 10000,
    "transports" : ["websocket"]
}



// CONVERT TO LOWERCASE FUNCTION //////////////////////////////////////
export const convertToLowerCase = str => str.toLowerCase();


// HTML ELEMENT SELECTOR FUNCTION ///////////////////////////////////////
export const elementSelector = element => document.getElementById(element);


// View password function 
export const view_password = (element) => {
  if (elementSelector(element).type == 'password') {
    elementSelector(element).type = 'text'
  }else{
    elementSelector(element).type = 'password'
  }
}



// TIME FUNCTION ////////////////////////////////
export const timeFunction = () => {
    let today = new Date(),
    options = {
        minute: "numeric",
        hour: "numeric"
    };
    
    let time = today.toLocaleString("en-US", options)
    return time
}
