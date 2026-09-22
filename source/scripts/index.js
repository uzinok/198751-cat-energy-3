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
          }
        );

        myMap.geoObjects.add(myPlacemark);

        myMap.container.fitToViewport();

        let t;
        window.addEventListener('resize', () => {
          clearTimeout(t);
          t = setTimeout(() => myMap.container.fitToViewport(), 150);
        });
        if ('ResizeObserver' in window) {
          const ro = new ResizeObserver(() => myMap.container.fitToViewport());
          ro.observe(document.querySelector('.dealers__map'));
        }
      };

      requestAnimationFrame(() => requestAnimationFrame(init));
    });
  });
}
