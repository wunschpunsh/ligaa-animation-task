import {
  initMap,
  addMainPin,
  getPlacemarks,
  addPlacemarksToMap,
  addScaling
} from './map-utils';

const initMap3 = () => {
  const filterButtons = document.querySelector('.map-filter__list');
  const map3 = initMap('#map-3', 15);
  addMainPin(map3, 60, 60);

  getPlacemarks().then((placemarks) => {
    addPlacemarksToMap(map3, placemarks);

    filterButtons.addEventListener('change', (evt) => {
      const targetButton = evt.target.value;
      if (targetButton === 'all') {
        addPlacemarksToMap(map3, placemarks);
        return;
      }
      const sort = placemarks.filter((item) => {
        const category = item.properties._data.category;
        return category === targetButton;
      });
      map3.geoObjects.removeAll();
      addMainPin(map3, 60, 60);
      addPlacemarksToMap(map3, sort);
    });
  });

  addScaling(map3, '.ya-map__inner', '.ya-map__message', 'is-active');
};
export {initMap3};
