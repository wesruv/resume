const htmlElement = document.querySelector('html');
htmlElement.classList.remove('no-js');
htmlElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  // Add class to header when we pass the first heading
  const $pointOfHeaderAppearing = document.querySelector(
    '#experience-list__heading--employment, #recommendations__headline'
  );
  const $header = document.querySelector(
    '.resume-wrapper__header, .page__header--sticky'
  );
  if (!$pointOfHeaderAppearing || $header) return;

  const observer = new IntersectionObserver(
    ([event]) => {
      $header.classList.toggle('is-sticky', event.intersectionRatio < 1);
    },
    {threshold: [1]}
  );

  observer.observe($pointOfHeaderAppearing);

  // Abbreviate work history on resume
  const makeMoreButtonWork = () => {
    $moreButton = document.querySelector('.experience-list__more');
    if (!$moreButton) return;

    $moreButton.setAttribute('aria-expanded', 'false');

    $moreButton.addEventListener('click', () => {
      const toggleClass = 'experience-list__more--pressed';
      $moreButton.classList.toggle(toggleClass);
      if ($moreButton.classList.contains(toggleClass)) {
        $moreButton.setAttribute('aria-expanded', 'true');
      }
      else {
        $moreButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  makeMoreButtonWork();
});
