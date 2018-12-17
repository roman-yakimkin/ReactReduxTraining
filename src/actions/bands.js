import C from '../constants/action-types';

export function addBand(info) {
  console.log(`New band is added`);
  return {
    type: C.ADD_BAND,
    payload: {
      id: info.id,
      name: info.name,
    }
  }
}

export function editBand(info) {
  return {
    type: C.EDIT_BAND,
    payload: {
      id: info.id,
      name: info.name
    }
  }
}

export function deleteBand(band_id = 0) {
  console.log(`Band # ${band_id} is removed`);
  return {
    type: C.DELETE_BAND,
    payload: { id: band_id }
  }
}