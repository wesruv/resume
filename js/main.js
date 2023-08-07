document.addEventListener('DOMContentLoaded', () => {
  // Get scrollbar width and set it to CSS var
  const $body = document.querySelector('body');
  const scrollBarWidth = window.innerWidth - $body.offsetWidth;
  $body.style.setProperty('--scrollBarWidth', `${scrollBarWidth}px`);

  // Add class to header when we pass the first heading
  const $employmentHeader = document.querySelector('#experience-list__heading--employment');
  const $header = document.querySelector('.resume-wrapper__header');
  const observer = new IntersectionObserver(
    ([event]) => {
      $header.classList.toggle('is-sticky', event.intersectionRatio < 1);
    },
    {threshold: [1]}
  );

  observer.observe($employmentHeader);
});
