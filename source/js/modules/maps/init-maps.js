import {initMap1} from './map1';
import {initMap2} from './map2';
import {initMap3} from './map3';
import {initMap4} from './map4';

const initMaps = () => {
  let path = window.location.pathname.slice(1);

  switch (path) {
    case 'map-1.html':
      window.ymaps.ready(initMap1);
      break;
    case 'map-2.html':
      window.ymaps.ready(initMap2);
      break;
    case 'map-3.html':
      window.ymaps.ready(initMap3);
      break;
    case 'map-4.html':
      window.ymaps.ready(initMap4);
      break;
  }
};

export {initMaps};
