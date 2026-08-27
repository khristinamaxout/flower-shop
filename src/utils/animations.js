/**
 * Scroll reveal animations via Intersection Observer
 */
export function initRevealAnimations() {
  const revealElements = document.querySelectorAll('.reveal');

  if (!revealElements.length) return;

  const isMobile = window.matchMedia('(max-width: 1023px)').matches;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: isMobile ? 0.05 : 0.12,
      rootMargin: isMobile ? '0px 0px 0px 0px' : '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((el) => observer.observe(el));

  /* Fallback: показать всё через 3 сек на случай проблем с observer */
  setTimeout(() => {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }, 3000);
}

/**
 * Mobile scroll-triggered animations for cards and sections
 */
export function initScrollAnimations(root = document) {
  const animated = root.querySelectorAll(
    '.mobile-slide-in, .mobile-slide-up, .mobile-scale-in, .mobile-anim'
  );

  if (!animated.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-animated');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -5% 0px' }
  );

  animated.forEach((el) => {
    if (!el.classList.contains('is-animated')) {
      observer.observe(el);
    }
  });

  setTimeout(() => {
    animated.forEach((el) => el.classList.add('is-animated'));
  }, 2500);
}

/**
 * Hero entrance animation on page load (mobile-first)
 */
export function initMobileAnimations() {
  const heroAnims = document.querySelectorAll('.hero .mobile-anim');
  heroAnims.forEach((el) => {
    const delay = parseInt(el.dataset.delay || '0', 10);
    setTimeout(() => el.classList.add('is-animated'), 200 + delay * 120);
  });

  const heroImg = document.querySelector('.hero__img');
  if (heroImg) {
    heroImg.classList.add('hero__img--loaded');
  }

  /* Mobile bar entrance */
  const mobileBar = document.querySelector('.mobile-bar');
  if (mobileBar && window.matchMedia('(max-width: 1023px)').matches) {
    setTimeout(() => mobileBar.classList.add('is-visible'), 800);
  }

  /* Category horizontal scroll hint */
  const catScroll = document.querySelector('.categories-scroll');
  if (catScroll && window.matchMedia('(max-width: 767px)').matches) {
    setTimeout(() => {
      catScroll.scrollTo({ left: 60, behavior: 'smooth' });
      setTimeout(() => catScroll.scrollTo({ left: 0, behavior: 'smooth' }), 600);
    }, 1500);
  }
}

/**
 * Subtle parallax on hero image
 */
export function initHeroParallax() {
  const heroMedia = document.querySelector('.hero__img');
  if (!heroMedia || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(max-width: 1023px)').matches) return;

  let ticking = false;

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const heroHeight = document.querySelector('.hero')?.offsetHeight || 0;
          if (scrollY < heroHeight) {
            heroMedia.style.transform = `translateY(${scrollY * 0.2}px) scale(1.04)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );
}

/**
 * Header scroll state
 */
export function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * Smooth scroll to anchor links
 */
export function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const headerHeight =
      parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 72;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({ top, behavior: 'smooth' });
  });
}
