import C from '../constants/action-types';

const initialState = [
  {
    id: 1,
    name: "Beatles"
  },
  {
    id: 2,
    name: "Rolling Stones"
  },
  {
    id: 3,
    name: "Doors"
  }
]

export default function bands(state = initialState, action){

  switch (action.type) {
    case C.ADD_BAND:
      
      return [...state, action.payload ];

    case C.EDIT_BAND:
      return state.map( (item, i) => ( item.id === action.payload.id ? action.payload : item)       
      );

    case C.DELETE_BAND:
      return state.filter( 
        (elem) => (elem.id !== action.payload.id) 
      );
    default:
      return state;

  }

}


