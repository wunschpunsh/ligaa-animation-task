const initMap2 = () => {
  const map2Container = document.querySelector('#map-2');
  if (!map2Container) {
    return;
  }
  const map2 = new window.ymaps.Map(map2Container, {
    center: [59.968322, 30.31735],
    zoom: 15,
    controls: [],
  });

  map2.behaviors.disable('scrollZoom');

  const mainPin = window.ymaps.templateLayoutFactory.createClass(
      ' <div class="map-pin"><div class="map-pin__logo"><svg width="60" height="60" aria-hidden="true"><use xlink:href="#icon-dino-pin"></use></svg></div></div>'
  );

  const mainPinPlacemark = new window.ymaps.Placemark(
      map2.getCenter(),
      {},
      {
        iconLayout: mainPin,
        iconOffset: [-10, -80],
      }
  );

  const otherPinPlacemark = window.ymaps.templateLayoutFactory.createClass(
      ' <div class="placemark" data-placemark tabindex="0" data-map-marker={{properties.category}}><div class="placemark__inner"><div class="placemark__icon"><svg width="40" height="40" aria-hidden="true"><use xlink:href={{properties.icon}}></use></svg></div></div></div>'
  );

  const MyBalloonLayoutClass = window.ymaps.templateLayoutFactory.createClass(
      '<div class="placemark-balloon">$[[options.contentLayout]]</div>'
  );

  const MyBalloonContentLayoutClass =
    window.ymaps.templateLayoutFactory.createClass(
        '<div class="placemark-balloon__inner"><div class="placemark-balloon__image"><img src={{properties.balloonImage}} width="101" height="94" alt="{{propetries.balloonAlt}}"></div><div class="placemark-balloon__wrap"><p class="placemark-balloon__head">{{properties.balloonTextHead}}</p><p class="placemark-balloon__title">{{properties.balloonTextTitle}}</p><p class="placemark-balloon__text"><span>{{properties.balloonAdress}}</span></p></div><button class="placemark-balloon__close-btn" type="button"><svg width="12" height="12" aria-hidden="true"><use xlink:href="#icon-close"></use></svg></button></div>'
    );

  const myCollection = new window.ymaps.GeoObjectCollection({}, {});

  fetch('data/data.json')
      .then((response) => response.json())
      .then((data) => {
        data.mapMarkers.forEach((item) => {
          myCollection.add(
              new window.ymaps.Placemark(
                  item.latLng,

                  {
                    icon: item.icon,
                    category: item.category,
                    balloonImage: item.imagePath,
                    balloonAlt: item.imageAlt,
                    balloonTextHead: item.textHead,
                    balloonTextTitle: item.title,
                    balloonAdress: item.text,
                  },
                  {
                    iconLayout: otherPinPlacemark,
                    iconOffset: [-24, -24],
                    iconShape: {
                      type: 'Circle',
                      coordinates: [24, 24],
                      radius: 24,
                    },
                    balloonShadow: false,
                    balloonLayout: MyBalloonLayoutClass,
                    balloonContentLayout: MyBalloonContentLayoutClass,
                    balloonPanelMaxMapArea: 0,
                    hideIconOnBalloonOpen: false,
                    balloonOffset: [0, -125],
                  }
              )
          );
        });
        map2.geoObjects.add(myCollection);
        map2.geoObjects.add(mainPinPlacemark);
      });
};
export {initMap2};
