const initMap3 = () => {
  const map3Container = document.querySelector('#map-3');
  if (!map3Container) {
    return;
  }
  const map3 = new window.ymaps.Map(map3Container, {
    center: [59.968322, 30.31735],
    zoom: 15,
    controls: [],
  });

  map3.behaviors.disable(['scrollZoom', 'dblClickZoom']);

  const mainPin = window.ymaps.templateLayoutFactory.createClass(
      ' <div class="map-pin"><div class="map-pin__logo"><svg width="60" height="60" aria-hidden="true"><use xlink:href="#icon-dino-pin"></use></svg></div></div>'
  );

  const mainPinPlacemark = new window.ymaps.Placemark(
      map3.getCenter(),
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
      '<div class="placemark-balloon">$[[options.contentLayout]]</div>',
      {}
  );

  const MyBalloonContentLayoutClass =
    window.ymaps.templateLayoutFactory.createClass(
        '<div class="placemark-balloon__inner"><div class="placemark-balloon__image"><img src={{properties.balloonImage}} width="101" height="94" alt="{{propetries.balloonAlt}}"></div><div class="placemark-balloon__wrap"><p class="placemark-balloon__head">{{properties.balloonTextHead}}</p><p class="placemark-balloon__title">{{properties.balloonTextTitle}}</p><p class="placemark-balloon__text"><span>{{properties.balloonAdress}}</span></p></div><button class="placemark-balloon__close-btn" type="button"><svg width="12" height="12" aria-hidden="true"><use xlink:href="#icon-close"></use></svg></button></div>',
        {
          build() {
            MyBalloonContentLayoutClass.superclass.build.call(this);
            this._element = this.getParentElement().querySelector(
                '.placemark-balloon__inner'
            );
            this._onCloseClick = this.onCloseClick.bind(this);
            this._element
                .querySelector('.placemark-balloon__close-btn')
                .addEventListener('click', this._onCloseClick);
          },

          clear() {
            this._element.querySelector('.placemark-balloon__close-btn').removeEventListener('click', this._onCloseClick);
            MyBalloonContentLayoutClass.superclass.clear.call(this);
          },

          onCloseClick(evt) {
            evt.preventDefault();
            this.events.fire('userclose');
          },
        }
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
        map3.geoObjects.add(myCollection);
        map3.geoObjects.add(mainPinPlacemark);
      });


  const message = document.querySelector('.ya-map__message');
  const myMap = document.querySelector('.ya-map__inner');

  let ctrlKey = false;
  let ctrlMessVisible = false;
  let timer;
  const vp767 = window.matchMedia('(max-width: 767px)');

  const onWheelHandler = (evt) => {
    if (evt.get('type') === 'wheel') {
      if (!ctrlKey && !vp767.matches) {
        message.classList.add('is-active');
        ctrlMessVisible = true;
        clearTimeout(timer);
        timer = setTimeout(() => {
          message.classList.remove('is-active');
          ctrlMessVisible = false;
        }, 500);
      } else {
        message.classList.remove('is-active');
      }
    }
    if (evt.get('type') === 'mousedown' && ctrlMessVisible) {
      message.classList.remove('is-active');
    }
  };

  window.ymaps.domEvent.manager.group(myMap).add(['wheel', 'mousedown'], onWheelHandler);


  const onButtonCtrlKeyDown = (evt) => {
    if (evt.key === 'Control' && !ctrlKey) {
      ctrlKey = true;
      map3.behaviors.enable('scrollZoom');
    }
  };

  const onButtonCtrlKeyUp = (evt) => {
    if (evt.key === 'Control') {
      ctrlKey = false;
      map3.behaviors.disable('scrollZoom');
    }
  };

  document.addEventListener('keydown', onButtonCtrlKeyDown);
  document.addEventListener('keyup', onButtonCtrlKeyUp);

  if (vp767.matches) {
    document.removeEventListener('keydown', onButtonCtrlKeyDown);
    document.removeEventListener('keyup', onButtonCtrlKeyUp);
  }
};
export {initMap3};
