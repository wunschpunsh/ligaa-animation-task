import {initMap, addMainPin} from './utils';
const initMap1 = () => {
  const map1 = initMap('#map-1', 17);
  addMainPin(map1, 90, 108);
};

export {initMap1};
