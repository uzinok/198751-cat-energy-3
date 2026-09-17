/* в этот файл добавляет скрипты*/
if (document.querySelector('.before-after') && document.querySelector('.before-after__range-js')) {
  const slider = document.querySelector('.before-after');
  const range = document.querySelector('.before-after__range-js');

  range.addEventListener('input', () => {
    slider.style.setProperty('--value', `${range.value * 0.1}%`);
  });
}
