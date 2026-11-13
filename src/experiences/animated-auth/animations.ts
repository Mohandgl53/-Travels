import gsap from 'gsap';

export const animateFormEntrance = (element: HTMLElement | null, onComplete?: () => void) => {
  if (!element) return;
  gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: 0.9,
      y: 20,
      filter: 'blur(8px)',
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out',
      onComplete,
    }
  );
};

export const animateFormExit = (element: HTMLElement | null, onComplete?: () => void) => {
  if (!element) {
    if (onComplete) onComplete();
    return;
  }
  gsap.to(element, {
    opacity: 0,
    scale: 0.92,
    y: -15,
    filter: 'blur(6px)',
    duration: 0.6,
    ease: 'power2.in',
    onComplete,
  });
};

export const animateBannerReveal = (element: HTMLElement | null) => {
  if (!element) return;
  gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: 0.8,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'back.out(1.7)',
    }
  );
};

