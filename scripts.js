const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const scrollGallery = document.getElementById("scrollGallery");
const scrollGalleryTrack = document.getElementById("scrollGalleryTrack");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (scrollGallery && scrollGalleryTrack) {
  const updateScrollGallery = () => {
    const sectionRect = scrollGallery.getBoundingClientRect();
    const maxOffset = Math.max(scrollGalleryTrack.scrollWidth - scrollGallery.clientWidth, 0);
    const scrollableDistance = Math.max((scrollGallery.offsetHeight - window.innerHeight) * 0.68, 1);
    const progressed = Math.min(Math.max(-sectionRect.top / scrollableDistance, 0), 1);
    const offset = progressed * maxOffset;

    scrollGalleryTrack.style.transform = `translate3d(-${offset}px, 0, 0)`;
  };

  updateScrollGallery();
  window.addEventListener("scroll", updateScrollGallery, { passive: true });
  window.addEventListener("resize", updateScrollGallery);
}

const revealTargets = document.querySelectorAll(".reveal-target");
const heroTextRevealItems = document.querySelectorAll(".hero-copy .text-reveal");

heroTextRevealItems.forEach((item, index) => {
  item.style.setProperty("--text-delay", `${index * 0.14}s`);
});

window.setTimeout(() => {
  heroTextRevealItems.forEach((item) => item.classList.add("is-visible"));
}, 180);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        const textItems = entry.target.querySelectorAll(".text-reveal");
        textItems.forEach((item, index) => {
          item.style.setProperty("--text-delay", `${index * 0.14}s`);
        });
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}
