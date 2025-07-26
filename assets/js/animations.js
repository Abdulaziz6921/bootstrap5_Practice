gsap.utils.toArray(".fade-slide-up").forEach((el) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "power3.out",
  });
});

gsap.from(".item", {
  scrollTrigger: {
    trigger: ".item",
    start: "top 80%",
    toggleActions: "play none none none",
  },
  opacity: 0,
  y: 40,
  duration: 1,
  ease: "power2.out",
  stagger: 0.5,
});

gsap.utils.toArray(".fade-left-up").forEach((el) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none none",
    },
    opacity: 0,
    x: -60,
    y: 60,
    duration: 1,
    ease: "power3.out",
  });
});

gsap.utils.toArray(".fade-right-up").forEach((el) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none none",
    },
    opacity: 0,
    x: 60,
    y: 60,
    duration: 1,
    ease: "power3.out",
  });
});

gsap.from(".big-bang", {
  scrollTrigger: {
    trigger: ".big-bang",
    start: "top 65%",
    toggleActions: "play none none none",
  },
  scale: 0.001, // Start small like a dot
  opacity: 0,
  duration: 2, // Slightly faster to keep it snappy
  ease: "power4.out",
});

// Duplicate testimonials for smooth loop
const track = document.querySelector(".testimonial-track");
track.innerHTML += track.innerHTML;

gsap.to(track, {
  xPercent: -50,
  duration: 20,
  ease: "none",
  repeat: -1,
});
