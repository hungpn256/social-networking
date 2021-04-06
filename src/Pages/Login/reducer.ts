

const initialState = {
  user:{
    firstName:'',
    lastName:'',
  }
}

const reducer = (state={...initialState},action:any)=>{
  switch(action.type){
    default:
      return {...state}
  }
}
export default reducer
