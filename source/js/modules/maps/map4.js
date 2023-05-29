import {
  initMap,
  addMainPin,
  getPlacemarks,
  addPlacemarksToMap,
  addScaling
} from './map-utils';

const addMap4 = () => {
  const map4 = initMap('#map-4', 15);
  addMainPin(map4, 60, 60);
  getPlacemarks().then((placemarks) => {
    addPlacemarksToMap(map4, placemarks, 'cluster');
  });

  addScaling(map4, '.ya-map__inner', '.ya-map__message', 'is-active');
};
export {addMap4};
