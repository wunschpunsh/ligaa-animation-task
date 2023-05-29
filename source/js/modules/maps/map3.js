import {
  initMap,
  addMainPin,
  getPlacemarks,
  addPlacemarksToMap,
  addScaling
} from './map-utils';

const addMap3 = () => {
  const filterButtons = document.querySelector('.map-filter__list');
  const map3 = initMap('#map-3', 15);
  addMainPin(map3, 60, 60);

  getPlacemarks().then((placemarks) => {
    addPlacemarksToMap(map3, placemarks);

    const pinsContainer = map3.geoObjects.get(1);
    filterButtons.addEventListener('change', (evt) => {
      const targetButton = evt.target.value;

      placemarks.forEach((placemark) => {
        const category = placemark.properties._data.category;

        if (category === targetButton || targetButton === 'all') {
          if (!placemark.getParent()) {
            pinsContainer.add(placemark);
          }
        } else if (placemark.getParent()) {
          pinsContainer.remove(placemark);
        }
      });
    });
  });

  addScaling(map3, '.ya-map__inner', '.ya-map__message', 'is-active');
};
export {addMap3};
