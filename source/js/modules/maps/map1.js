const initMap1 = () => {
  const map1Container = document.querySelector('#map-1');
  if (!map1Container) {
    return;
  }
  const map1 = new window.ymaps.Map(map1Container, {
    center: [59.96866, 30.317764],
    zoom: 17,
    controls: [],
  });
  map1.behaviors.disable('scrollZoom');

  const mainPin = window.ymaps.templateLayoutFactory.createClass(
      ' <div class="map-pin"><div class="map-pin__logo"><svg width="90" height="108" aria-hidden="true"><use xlink:href="#icon-dino-pin"></use></svg></div></div>'
  );
  const mainPinPlacemark = new window.ymaps.Placemark(
      map1.getCenter(),
      {},
      {
        iconLayout: mainPin,
        iconOffset: [-45, -120],
      }
  );
  map1.geoObjects.add(mainPinPlacemark);
};

export {initMap1};
