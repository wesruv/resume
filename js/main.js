document.addEventListener('DOMContentLoaded', () => {
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

  // Abbreviate work history
  $moreButton = document.querySelector('.experience-list__more');
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
});
