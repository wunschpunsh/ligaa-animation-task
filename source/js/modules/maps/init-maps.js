import {addMap1} from './map1';
import {addMap2} from './map2';
import {addMap3} from './map3';
import {addMap4} from './map4';

const initMaps = () => {
  let path = window.location.pathname.slice(1);

  switch (path) {
    case 'map-1.html':
      window.ymaps.ready(addMap1);
      break;
    case 'map-2.html':
      window.ymaps.ready(addMap2);
      break;
    case 'map-3.html':
      window.ymaps.ready(addMap3);
      break;
    case 'map-4.html':
      window.ymaps.ready(addMap4);
      break;
  }
};

export {initMaps};
