// animations.js
import gsap from "https://esm.sh/gsap@3.12.5";
import ScrollTrigger from "https://esm.sh/gsap@3.12.5/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  // Fade + slide up
  const fadeSlideEls = gsap.utils.toArray(".fade-slide-up");
  if (fadeSlideEls.length) {
    fadeSlideEls.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
          once: true,
        },
        opacity: 0,
        y: 60,
        duration: 1.1,
        ease: "power3.out",
      });
    });
  }

  // Item animation
  const items = document.querySelectorAll(".item");

  console.log("Found items:", items.length);

  items.forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none none",
        once: true,
      },
      opacity: 0,
      duration: 1.1,
      ease: "power2.out",
      delay: i * 0.3,
    });
  });

  // Fade left up
  const fadeLeftEls = gsap.utils.toArray(".fade-left-up");
  if (fadeLeftEls.length) {
    fadeLeftEls.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
        opacity: 0,
        x: -60,
        y: 60,
        duration: 1,
        ease: "power3.out",
      });
    });
  }

  // Fade right up
  const fadeRightEls = gsap.utils.toArray(".fade-right-up");
  if (fadeRightEls.length) {
    fadeRightEls.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
        opacity: 0,
        x: 60,
        y: 60,
        duration: 1,
        ease: "power3.out",
      });
    });
  }

  // Big bang
  if (document.querySelector(".big-bang")) {
    gsap.from(".big-bang", {
      scrollTrigger: {
        trigger: ".big-bang",
        start: "top 85%",
        toggleActions: "play none none none",
        once: true,
      },
      scale: 0.001,
      opacity: 0,
      duration: 2,
      ease: "power4.out",
    });
  }

  // Carousel loop
  function loopTestimonials() {
    const track = document.querySelector(".testimonial-track");
    const items = gsap.utils.toArray(".testimonial-item");

    if (!track || items.length < 2) return;

    items.forEach((item) => {
      const clone = item.cloneNode(true);
      track.appendChild(clone);
    });

    const itemWidth = items[0].offsetWidth;
    const totalWidth = itemWidth * items.length;

    const tl = gsap.to(track, {
      x: `-=${totalWidth}`,
      duration: items.length * 10,
      ease: "none",
      repeat: -1,
      modifiers: { x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth) },
    });

    track.addEventListener("mouseenter", () => tl.pause());
    track.addEventListener("mouseleave", () => tl.play());
  }

  loopTestimonials();
}
