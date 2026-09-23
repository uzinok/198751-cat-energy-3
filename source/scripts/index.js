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

/* global ymaps */
/* global ymaps */
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

      const init = () => {
        const myMap = new ymaps.Map('map', {
          center: [59.938631, 30.323037],
          zoom: 14,
          controls: []
        });

        const myPlacemark = new ymaps.Placemark(
          [59.938631, 30.323037],
          { hintContent: 'Мы тут' },
          {
            iconLayout: 'default#image',
            iconImageHref: '../images/map/map-pin.png',
            iconImageSize: [57, 53],
            iconImageOffset: [-28, -53],
            suppressMapActions: true
          }
        );

        myMap.geoObjects.add(myPlacemark);

        const updatePlacemarkSize = () => {
          const mapWidth = el.clientWidth;
          if (!mapWidth) {
            return;
          }

          const k = 0.057;
          const newWidth = Math.round(mapWidth * k);
          const newHeight = Math.round(newWidth * (53 / 57));

          myPlacemark.options.set({
            iconImageSize: [113, 106],
            iconImageOffset: [-56, -106]
          });
        };

        const refresh = () => {
          myMap.container.fitToViewport();
          updatePlacemarkSize();
        };

        let resizeTimer;
        window.addEventListener('resize', () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(refresh, 150);
        });

        if ('ResizeObserver' in window) {
          let roTimer;
          const ro = new ResizeObserver(() => {
            clearTimeout(roTimer);
            roTimer = setTimeout(refresh, 150);
          });
          ro.observe(el);
        }

        refresh();
      };

      requestAnimationFrame(() => requestAnimationFrame(init));
    });
  });
}
