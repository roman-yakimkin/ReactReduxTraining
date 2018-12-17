import C from '../constants/action-types';

const initialState = [
  {
    id: 1,
    band_id: 1,
    name: "Please please me",
    year: 1963
  },
  {
    id: 2, 
    band_id: 1,
    name: "Revolver",
    year: 1966
  },
  {
    id: 3,
    band_id: 2,
    name: "Let it bleed",
    year: 1970
  },
  {
    id: 4,
    band_id: 3,
    name: "Strange days",
    year: 1967
  },
  { 
    id: 5,
    band_id: 3,
    name: "Waiting for the Sun",
    year: 1968
  },
  {
    id: 6,
    band_id: 3,
    name: "L.A. Woman",
    year: 1971
  }
]

export default function albums(state = initialState, action){
  switch (action.type) {
    case C.ADD_ALBUM:
      
      return [...state, action.payload ];

    case C.EDIT_ALBUM:
      return state.map( (item, i) => ( item.id === action.payload.id ? action.payload : item)       
      );

    case C.DELETE_ALBUM:
      return state.filter( 
        (elem) => (elem.id !== action.payload.id) 
      );
    default:
      return state;

  }
}