import {initMap, addMainPin} from './map-utils';
const addMap1 = () => {
  const map1 = initMap('#map-1', 17);
  addMainPin(map1, 90, 108);
};

export {addMap1};
