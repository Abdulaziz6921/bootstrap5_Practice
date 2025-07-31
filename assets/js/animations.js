// ✅ Use ESM-compatible URLs:
import gsap from "https://esm.sh/gsap@3.12.5";
import ScrollTrigger from "https://esm.sh/gsap@3.12.5/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".fade-slide-up").forEach((el) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none reverse",
      once: true,
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
    start: "top 85%",
    toggleActions: "play none none none",
    once: true,
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
      once: true,
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
      once: true,
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
    start: "top 85%",
    toggleActions: "play none none none",
    once: true,
  },
  scale: 0.001,
  opacity: 0,
  duration: 2,
  ease: "power4.out",
});

// Carousel like looping effect

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
    modifiers: {
      x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
    },
  });

  // Pause on hover
  track.addEventListener("mouseenter", () => tl.pause());
  track.addEventListener("mouseleave", () => tl.play());
}

window.addEventListener("load", loopTestimonials);
