import C from "../constants/action-types";

const initialState = {
  max_uid: 10
}

export default function max_uid(state = initialState, action){
  switch (action.type){
    case C.NEW_UID:
      return {...state, max_uid: state.max_uid + 1};
    default: 
      return state;
  }
}