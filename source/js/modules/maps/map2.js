import {
  initMap,
  addMainPin,
  getPlacemarks,
  addPlacemarksToMap
} from './map-utils';

const addMap2 = () => {
  const map2 = initMap('#map-2', 15);
  addMainPin(map2, 60, 60);

  getPlacemarks().then((placemarks) => {
    addPlacemarksToMap(map2, placemarks);
  });
};
export {addMap2};
