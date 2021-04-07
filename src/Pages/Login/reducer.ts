import * as loginConstants from './constants'
const initialState = {
  requesting:false,
  success:false,
  user:{},
  token:'',
  error:''
}

const reducer = (state=initialState,action:any)=>{
  switch(action.type){
    case loginConstants.LOGIN_CHANGE_STATE:{
      return {...state,...action.payload}
    }
    case loginConstants.LOGIN_SUCCESS:{
      const {user,token} = action.payload
      return {...state,user,token}
    }
    case loginConstants.LOGIN_FAIL:{
      const {error} = action.payload
      return {...state,error}
    }
    default:
      return {...state}
  }
}
export default reducer
