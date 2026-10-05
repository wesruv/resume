(function () {
  const htmlElement = document.querySelector('html');
  htmlElement.classList.remove('no-js');
  htmlElement.classList.add('js');

  function addScrollListener() {
    // Add class to header when we pass the first heading
    const $pointOfHeaderAppearing = document.querySelector(
      '#experience-list__heading--employment, #recommendations__headline'
    );
    const $header = document.querySelector(
      '.resume__header, .page__header--sticky'
    );

    if (!$pointOfHeaderAppearing || !$header) return;

    const observer = new IntersectionObserver(
      ([event]) => {
        $header.classList.toggle('is-sticky', event.intersectionRatio < 1);
      },
      {threshold: [1]}
    );

    observer.observe($pointOfHeaderAppearing);
  }

  // Abbreviate work history on resume
  function makeMoreButtonWork() {
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

  function enableBurger() {
    const $burger = document.querySelector('.header__burger');
    const $navWrapper = document.querySelector('.header__mobile-menu__wrapper');
    if (!$burger || !$navWrapper) return;

    new contentExpander($burger, $navWrapper,
      {
        wrapper: $burger.parentElement,
        globallyCancellable: true,
        breakpoint: '(max-width: 57em)',
        defaultToClosed: true,
      },
      {
        control: 'mobile-menu__control',
        dropdown: 'mobile-menu__dropdown',
        wrapper: 'mobile-menu__wrapper',
        expand: 'mobile-menu--expanded',
        collapse: 'mobile-menu--collapsed',
        transitioning: 'mobile-menu--transitioning',
      }
    );
  }

  document.addEventListener('DOMContentLoaded', () => {
    enableBurger();
    addScrollListener();
    makeMoreButtonWork();
  });


  /**
   * Setup an element to be an expandable
   * @param {HTMLButtonElement} control button or other element used to trigger the expander
   * @param {HTMLElement} contentArea container that will show and hide
   *
   * @param {object} options
   * @param {HTMLElement} options.wrapper
   *    Optional wrapper element to get classes that indicate state
   * @param {boolean} options.globallyCancellable
   *    If pressing escape should close this item, should be enabled for overlay or menu contexts
   * @param {boolean} options.defaultToClosed
   *    If the element should default to closed
   * @param {boolean} options.addToggleClick
   *    Defaults to true, if a click event with preventDefault should be added to the toggle
   * @param {string} options.breakpoint Valid CSS @media value for when element should be collapsible
   * @param {number} options.transitionDuration
   *    Defaults to 250, how long the transition should take in ms
   * @param {function} options.expandCallback Function to call once contents are shown
   * @param {function} options.collapseCallback Function to call once contents are hidden
   *
   * @param {object} classNames
   * @param {string} classNames.control
   * @param {string} classNames.controlActive If a breakpoint is provided, means the behavior is active
   * @param {string} classNames.dropdown
   * @param {string} classNames.dropdownActive If a breakpoint is provided, means the behavior is active
   * @param {string} classNames.wrapper
   * @param {string} classNames.wrapperActive If a breakpoint is provided, means the behavior is active
   * @param {string} classnames.expand
   * @param {string} classnames.collapse
   * @param {string} classnames.transitioning
   *
   * @see https://codepen.io/wesruv/pen/VwJYLYN
   */
  class contentExpander {
    constructor (control, contentArea, options, classNames) {
      if (!control) {
        console.error('contentExpander: Cannot initialize without control element', control);
      }
      if (control?.contentExpander) {
        console.warn('contentExpander: Tried to re-initialize an element, if the functionality has been removed, the class has a method to add it back.', control, contentArea, options);
        return;
      }
      if (!contentArea) {
        console.error('contentExpander: Cannot initialize without dropdown element', control);
      }

      const defaultOptions = {
        transitionDuration: 250,
      };

      this._options = options ? {...defaultOptions, ...options} : {};
      this._classNames = {};

      // Make sure `this` is always set to the instance of the class on methods
      const methods = [
        'expand',
        'collapse',
        'toggle',
        'addExpandBehavior',
        'removeExpandBehavior',
        'handleEscPress',
      ];
      methods.forEach((method) => this[method] = this[method].bind(this));

      // Set element pointers and options to instance of class
      this.control = control;
      this.dropdown = contentArea;
      const defaultClassNames = {
        control: 'contentExpander__control',
        dropdown: 'contentExpander__dropdown',
        wrapper: 'contentExpander__wrapper',
        expand: 'contentExpander--expanded',
        collapse: 'contentExpander--collapsed',
        transitioning: 'contentExpander--transitioning',
      }

      this._classNames = classNames ? {...defaultClassNames, ...classNames} : defaultClassNames;

      // Set default active classes if they aren't set already, based on the base class names
      if (!this._classNames?.controlActive) this._classNames.controlActive = `${this._classNames.control}--active`;
      if (!this._classNames?.dropdownActive) this._classNames.dropdownActive = `${this._classNames.dropdown}--active`;
      if (!this._classNames?.wrapperActive) this._classNames.wrapperActive = `${this._classNames.wrapper}--active`;

      // Default this option to true
      if (typeof this._options.addToggleClick === 'undefined') this._options.addToggleClick = true;

      // if no id in the element, create one for aria attributes
      if (!this.dropdown.id) {
        const id = `contentExpander-${Math.random().toString(36).substring(2, 9)}`;
        this.dropdown.id = id;
      }

      // Set reference to instance of class on main elements
      this.control.contentExpander = this;
      this.dropdown.contentExpander = this;
      if (this._options?.wrapper) {
        this._options.wrapper.contentExpander = this;
      }

      this.dropdown.classList.add(this._classNames.dropdown);
      this.control.classList.add(this._classNames.control);
      this._options?.wrapper?.classList.add(this._classNames.wrapper);

      let expandableBreakpoint;
      if (options?.breakpoint) {
        expandableBreakpoint = window.matchMedia(options.breakpoint);
        expandableBreakpoint.addEventListener('change', (event) => {
          if (event.matches) {
            this.addExpandBehavior();
          }
          else {
            this.removeExpandBehavior();
          }
        });
      }
      if (!expandableBreakpoint || expandableBreakpoint?.matches) {
        this.addExpandBehavior();
      }
    }

    /**
     * Add all behaviors and attributes to make element expandable
     */
    addExpandBehavior() {
      console.log('expandin');
      // Make sure the aria-controls attribute matches the id of the element controlling it
      this.dropdown.classList.add(this._classNames.dropdownActive);
      this.control.classList.add(this._classNames.controlActive);
      this._options?.wrapper?.classList.add(this._classNames.wrapperActive);

      this.control.setAttribute('aria-controls', this.dropdown.id);
      if (this._options?.addToggleClick) {
        this.control.addEventListener('click', this.toggle);
      }

      if (this?.options?.globallyCancellable) {
        window.addEventListener('keydown', this.handleEscPress);
      }

      // Respect default state setting
      if (this._options.defaultToClosed) {
        this.collapse();
      }
      else {
        this.expand();
      }
    }

    /**
     * Remove all behavior and attributes from elements making it static
     */
    removeExpandBehavior() {
      this.dropdown.classList.remove(this._classNames.dropdownActive);
      this.control.classList.remove(this._classNames.controlActive);
      this._options?.wrapper?.classList.remove(this._classNames.wrapperActive);

      this.control.removeAttribute('aria-expanded');
      this.control.removeAttribute('aria-controls');
      this.control.removeEventListener('click', this.toggle);
      this.dropdown.removeAttribute('aria-hidden');
    }

    /**
     * Handle setting a transition class that gets removed after transitionDuration
     */
    setTransitionClass() {
      this.dropdown.classList.add(this._classNames.transitioning);
      if (this?.transitioningTimeoutId) {
        clearInterval(this?.transitioningTimeoutId);
        this.transitioningTimeoutId = false;
      }
      this.transitioningTimeoutId = setTimeout(
        () => this.dropdown.classList.remove(this._classNames.transitioning),
        this._options.transitionDuration
      );
    }

    /**
     * Update attributes to reflect open state
     */
    expand() {
      this.control.setAttribute('aria-expanded','true');
      this.dropdown.removeAttribute('aria-hidden');
      this.dropdown.classList.add(this._classNames.expand);
      this.dropdown.classList.remove(this._classNames.collapse);
      this.setTransitionClass();
      if (typeof this._options?.expandCallback === 'function') {
        this._options?.expandCallback(this);
      }
    }

    /**
     * Update attributes to reflect closed state
     */
    collapse() {
      this.control.setAttribute('aria-expanded','false');
      this.dropdown.setAttribute('aria-hidden','true');
      this.dropdown.classList.add(this._classNames.collapse);
      this.dropdown.classList.remove(this._classNames.expand);
      this.setTransitionClass();
      if (typeof this._options?.collapseCallback === 'function') {
        this._options?.collapseCallback(this);
      }
    }

    /**
     * Adds or removes open attribute from dropdown element
     */
    toggle(event) {
      if (event) event?.preventDefault();
      if (this.control.getAttribute('aria-expanded') === 'true') {
        this.collapse();
      }
      else {
        this.expand();
      }
    }

    /**
     * Handle keyboard input specifically for the esc key
     * @param {object} event Event object from event listener
     */
    handleEscPress(event) {
      if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }
      switch (event.key) {
        case 'Esc': // IE/Edge specific value
        case 'Escape':
          this.collapse();
          // Cancel the default action to avoid it being handled twice
          event.preventDefault();
      }
    }
  }

})();
