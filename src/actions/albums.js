import C from '../constants/action-types';

export function addAlbum(info) {
  return {
    type: C.ADD_ALBUM,
    payload: {
      id: info.id,
      band_id: info.band_id,
      name: info.name,
      year: info.year,
    }
  }
}

export function editAlbum(info) {
  return {
    type: C.EDIT_ALBUM,
    payload: {
      id: info.id,
      band_id: info.band_id,
      name: info.name,
      year: info.year
    }
  }
}

export function deleteAlbum(album_id = 0) {
  console.log(`Album # ${album_id} is removed`);
  return {
    type: C.DELETE_ALBUM,
    payload: { id: album_id }
  }
}