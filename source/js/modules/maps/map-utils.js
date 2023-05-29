const initMap = (selector, zoom) => {
  const mapContainer = document.querySelector(selector);

  if (!mapContainer) {
    return null;
  }

  const map = new window.ymaps.Map(mapContainer, {
    center: [59.96866, 30.317764],
    zoom,
    controls: [],
  });

  map.behaviors.disable(['scrollZoom', 'dblClickZoom']);

  return map;
};

const addMainPin = (map, width, height) => {
  const mainPin = window.ymaps.templateLayoutFactory.createClass(
      `<div class="map-pin"><div class="map-pin__logo"><svg width="${width}" height="${height}" aria-hidden="true"><use xlink:href="#icon-dino-pin"></use></svg></div></div>`
  );

  const mainPinPlacemark = new window.ymaps.Placemark(
      map.getCenter(),
      {},
      {
        iconLayout: mainPin,
        iconOffset: [-width / 2, -(height + 10)],
      }
  );
  map.geoObjects.add(mainPinPlacemark);
};

const getPlacemarks = () => {
  const otherPinPlacemark = window.ymaps.templateLayoutFactory.createClass(
      `<div class="placemark" data-placemark tabindex="0" data-map-marker={{properties.category}}>
      <div class="placemark__inner">
        <div class="placemark__icon">
          <svg width="40" height="40" aria-hidden="true">
            <use xlink:href={{properties.icon}}></use>
          </svg>
        </div>
      </div>
    </div>`
  );

  const MyBalloonLayoutClass = window.ymaps.templateLayoutFactory.createClass(
      '<div class="placemark-balloon">$[[options.contentLayout]]</div>'
  );

  const MyBalloonContentLayoutClass =
    window.ymaps.templateLayoutFactory.createClass(
        `<div class="placemark-balloon__inner">
          <div class="placemark-balloon__image">
            <img src={{properties.balloonImage}} width="101" height="94" alt="{{propetries.balloonAlt}}">
          </div>
          <div class="placemark-balloon__wrap">
            <p class="placemark-balloon__head">{{properties.balloonTextHead}}</p>
            <p class="placemark-balloon__title">{{properties.balloonTextTitle}}</p>
            <p class="placemark-balloon__text">
              <span>{{properties.balloonAdress}}</span>
            </p>
          </div>
          <button class="placemark-balloon__close-btn" type="button">
            <svg width="12" height="12" aria-hidden="true">
              <use xlink:href="#icon-close"></use>
            </svg>
          </button>
        </div>`,
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

          onCloseClick(evt) {
            evt.preventDefault();
            this.events.fire('userclose');
          },
        }
    );

  return fetch('data/data.json')
      .then((response) => response.json())
      .then((data) =>
        data.mapMarkers.map(
            (item) =>
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
        )
      );
};

const addCluster = () => {
  let customItemContentLayout = window.ymaps.templateLayoutFactory.createClass(`
  <div class="cluster-balloon">
    <div class="cluster-balloon__image">
      <img src="{{properties.balloonImage}}" width="101" height="94" alt="{{properties.imageAlt}}">
    </div>
    <div class="cluster-balloon__wrap">
      <p class="cluster-balloon__head">{{properties.balloonTextHead}}</p>
      <p class="cluster-balloon__title">{{properties.balloonTextTitle}}</p>
      <p class="cluster-balloon__text ">
        <span>{{properties.balloonAdress}}</span>
      </p>
    </div>
  </div>
`);

  let clusterer = new window.ymaps.Clusterer({
    gridSize: 12800,
    preset: 'islands#brownClusterIcons',
    clusterDisableClickZoom: true,
    clusterOpenBalloonOnClick: true,
    clusterBalloonContentLayout: 'cluster#balloonCarousel',
    clusterBalloonItemContentLayout: customItemContentLayout,
    clusterBalloonPanelMaxMapArea: 0,
    clusterBalloonContentLayoutWidth: 300,
    clusterBalloonContentLayoutHeight: 180,
    clusterBalloonPagerSize: 5,
    clusterBalloonPagerType: 'marker',
  });

  return clusterer;
};

const addPlacemarksToMap = (map, placemarks, param) => {
  let myPlacemarks;
  if (param === 'cluster') {
    myPlacemarks = addCluster();
  } else {
    myPlacemarks = new window.ymaps.GeoObjectCollection({}, {});
  }

  placemarks.forEach((placemark) => myPlacemarks.add(placemark));
  map.geoObjects.add(myPlacemarks);
};

const addScaling = (map, containerClass, messageClass, activeClass) => {
  const overlayMessage = document.querySelector(messageClass);
  const myMapContainer = document.querySelector(containerClass);
  const vp767 = window.matchMedia('(max-width: 767px)');

  let ctrlKey = false;
  let ctrlMessVisible = false;
  let timer;

  const onWheelHandler = (evt) => {
    if (evt.get('type') === 'wheel') {
      if (!ctrlKey && !vp767.matches) {
        overlayMessage.classList.add(activeClass);
        ctrlMessVisible = true;
        clearTimeout(timer);
        timer = setTimeout(() => {
          overlayMessage.classList.remove(activeClass);
          ctrlMessVisible = false;
        }, 500);
      } else {
        overlayMessage.classList.remove(activeClass);
      }
    }
    if (evt.get('type') === 'mousedown' && ctrlMessVisible) {
      overlayMessage.classList.remove(activeClass);
    }
  };

  const onButtonCtrlKeyDown = (evt) => {
    if (evt.key === 'Control' && !ctrlKey) {
      ctrlKey = true;
      map.behaviors.enable('scrollZoom');
    }
  };

  const onButtonCtrlKeyUp = (evt) => {
    if (evt.key === 'Control') {
      ctrlKey = false;
      map.behaviors.disable('scrollZoom');
    }
  };

  window.ymaps.domEvent.manager
      .group(myMapContainer)
      .add(['wheel', 'mousedown'], onWheelHandler);

  document.addEventListener('keydown', onButtonCtrlKeyDown);
  document.addEventListener('keyup', onButtonCtrlKeyUp);

  if (vp767.matches) {
    document.removeEventListener('keydown', onButtonCtrlKeyDown);
    document.removeEventListener('keyup', onButtonCtrlKeyUp);
  }
};

export {initMap, addMainPin, getPlacemarks, addPlacemarksToMap, addScaling};
