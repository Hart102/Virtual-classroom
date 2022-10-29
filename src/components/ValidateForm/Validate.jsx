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







// FORM VALIDATION FUNCTION ///////////////////////////////////////////
export const validateInput = (element, inputLength) => {
    let selectedElement = elementSelector(`${element}`);

    if (selectedElement.value.length == '') {
        return {
            error: `${selectedElement.name}, cannot be empty`
        }
    }

    if (selectedElement.value.length < inputLength) {
        return {
            error: `${selectedElement.name}, cannot be less than ${inputLength}`
        }
        
    }else{
        return selectedElement.value
    }

}