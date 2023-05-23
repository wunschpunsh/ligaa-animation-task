const initMap = () => {
  const map1Container = document.querySelector('#map-1');
  if (!map1Container) {
    return;
  }
  const map1 = new window.ymaps.Map(map1Container, {
    center: [59.968322, 30.31735],
    zoom: 17,
    controls: [],
  });
  map1.behaviors.disable('scrollZoom');
  const myPlacemark = new window.ymaps.Placemark(
    map1.getCenter(),
    {},
    {
      iconLayout: 'default#image',
      iconImageHref: 'img/content/dino.png',
      iconImageSize: [90, 108],
      iconImageOffset: [-7, -158],
    }
  );
  map1.geoObjects.add(myPlacemark);
};

export {initMap};
