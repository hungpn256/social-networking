import * as loginConstants from './constants'
const initialState = {
  requesting:false,
  success:false,
  user:null,
  token:localStorage.getItem('token'),
  error:null
}

const reducer = (state=initialState,action:any)=>{
  switch(action.type){
    case loginConstants.LOGIN_CHANGE_STATE:{
      return {...state,...action.payload}
    }
    case loginConstants.LOGIN_SUCCESS:{
      const {user,token} = action.payload
      return {...state,user,token,success:true}
    }
    case loginConstants.LOGIN_FAIL:{
      const {error} = action.payload
      return {...state,error}
    }
    case loginConstants.GET_USER:{
      const {payload } =action;
      return {...state,...payload}
    }
    default:
      return {...state}
  }
}
export default reducer
