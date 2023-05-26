import {
  initMap,
  addMainPin,
  getPlacemarks,
  addPlacemarksToMap,
  addScaling
} from './utils';

const initMap3 = () => {
  const map3 = initMap('#map-3', 15);
  addMainPin(map3, 60, 60);

  getPlacemarks().then((placemarks) => {
    addPlacemarksToMap(map3, placemarks);
  });

  addScaling(map3, '.ya-map__inner', '.ya-map__message', 'is-active');
};
export {initMap3};
