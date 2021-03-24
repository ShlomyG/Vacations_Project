

let  initialState = {login: false}

 export const userReducer = (state = initialState, action) => {
switch (action.type) {      
    case "LOGIN":
      let newState ={
        login:true,
        id:action.payload.id,
        role:action.payload.role,
        fname:action.payload.fname
      }
        return newState
     case "LOGOUT":
         return initialState
    default:
 return state
}
}