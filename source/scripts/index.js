/* в этот файл добавляет скрипты*/

if (document.querySelector('.before-after') && document.querySelector('.before-after__range-js')) {
  const slider = document.querySelector('.before-after');
  const range = document.querySelector('.before-after__range-js');

  range.addEventListener('input', () => {
    slider.style.setProperty('--value', `${range.value * 0.1}%`);
  });
}

if (document.querySelector('.header.no-js')) {
  document.querySelector('.header.no-js').classList.remove('no-js');

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('nav-toggle--open');
    nav.classList.toggle('nav--open');
  });
}

/* global ymaps *//* для линтера */
if (document.querySelector('#map.dealers__map')) {
  const script = document.createElement('script');
  script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
  script.type = 'text/javascript';
  document.head.appendChild(script);

  script.addEventListener('load', () => {
    ymaps.ready(() => {
      const el = document.querySelector('.dealers__map');
      if (!el) {
        return;
      }

      el.classList.remove('no-js');

      const MAP_CENTER = [59.938631, 30.323037];
      const ZOOM_MOBILE = 14;
      const ZOOM_TABLET = 16;

      const init = () => {
        const isTablet = window.matchMedia('(min-width: 768px)').matches;

        const myMap = new ymaps.Map('map', {
          center: MAP_CENTER,
          zoom: isTablet ? ZOOM_TABLET : ZOOM_MOBILE,
          controls: [],
          behaviors: ['drag'],
        });

        const myPlacemark = new ymaps.Placemark(
          MAP_CENTER,
          { hintContent: 'Мы тут' },
          {
            iconLayout: 'default#image',
            iconImageHref: './images/map/map-pin.png',
          }
        );

        const updateIconSize = () => {
          const isTabletView = window.matchMedia('(min-width: 768px)').matches;
          const size = isTabletView ? [113, 106] : [57, 53];

          myPlacemark.options.set({
            iconImageSize: size,
            iconImageOffset: [-size[0] / 2, -size[1]],
          });
        };

        const applyView = () => {
          const isTabletView = window.matchMedia('(min-width: 768px)').matches;
          const targetZoom = isTabletView ? ZOOM_TABLET : ZOOM_MOBILE;
          const isDesktop = window.matchMedia('(min-width: 1220px)').matches;
          const shiftX = isDesktop ? 244 : 5;
          const shiftY = isDesktop ? 37 : 52;
          const projection = myMap.options.get('projection');
          const centerGlobal = projection.toGlobalPixels(MAP_CENTER, targetZoom);
          const shiftedCenter = projection.fromGlobalPixels(
            [centerGlobal[0] - shiftX, centerGlobal[1] - shiftY],
            targetZoom
          );
          myMap.setCenter(shiftedCenter, targetZoom, { duration: 0 });
        };

        updateIconSize();

        myMap.geoObjects.add(myPlacemark);

        myMap.container.fitToViewport();

        applyView();

        let t;
        window.addEventListener('resize', () => {
          clearTimeout(t);
          t = setTimeout(() => {
            myMap.container.fitToViewport();
            updateIconSize();
            applyView();
          }, 150);
        });
        if ('ResizeObserver' in window) {
          const ro = new ResizeObserver(() => {
            myMap.container.fitToViewport();
            updateIconSize();
            applyView();
          });
          ro.observe(document.querySelector('.dealers__map'));
        }
      };

      requestAnimationFrame(() => requestAnimationFrame(init));
    });
  });
}
