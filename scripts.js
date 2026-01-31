document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".service-card");
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
  if (prefersReducedMotion) {
    // If reduced motion is preferred, make all cards visible immediately
    cards.forEach((card) => card.classList.add("is-visible"));
    return;
  }
  
  // Create IntersectionObserver with staggered reveal
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    }
  );
  
  cards.forEach((card) => observer.observe(card));
});


 
// Makes sections visible as users scroll
document.documentElement.classList.add('js');

  const sections = document.querySelectorAll('.reveal-section');

  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target); // reveal once, then stop observing
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px' // reveal slightly before it fully enters
  });

  sections.forEach(sec => io.observe(sec));


 (() => {
  const header = document.querySelector('.site-header');
  if (!header) return;

  // Sentinel element to detect when the header scrolls out of view
  const sentinel = document.createElement('div');
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.style.position = 'absolute';
  sentinel.style.top = '0';
  sentinel.style.left = '0';
  sentinel.style.width = '1px';
  sentinel.style.height = '1px';

  // Put sentinel right after header so it scrolls with the hero
  header.parentNode.insertBefore(sentinel, header.nextSibling);

  const obs = new IntersectionObserver(
    ([entry]) => {
      // When sentinel is NOT visible, the top has moved past the viewport => sticky
      document.body.classList.toggle('nav-sticky', !entry.isIntersecting);
    },
    {
      root: null,
      threshold: 0,
      rootMargin: "-1px 0px 0px 0px"
    }
  );

  obs.observe(sentinel);
})();

(() => {
  const btn = document.getElementById("menuBtn");
  const drawer = document.getElementById("navDrawer");
  const overlay = document.getElementById("drawerOverlay");
  const closeBtn = document.getElementById("drawerClose");

  if (!btn || !drawer || !overlay || !closeBtn) return;

  const openDrawer = () => {
    document.body.classList.add("drawer-open");
    overlay.hidden = false;
    drawer.setAttribute("aria-hidden", "false");
    btn.setAttribute("aria-expanded", "true");
    closeBtn.focus();
  };

  const closeDrawer = () => {
    document.body.classList.remove("drawer-open");
    drawer.setAttribute("aria-hidden", "true");
    btn.setAttribute("aria-expanded", "false");
    // let the fade finish then hide overlay
    setTimeout(() => (overlay.hidden = true), 380);
    btn.focus();
  };

  btn.addEventListener("click", () => {
    document.body.classList.contains("drawer-open") ? closeDrawer() : openDrawer();
  });

  closeBtn.addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);

  // Close on Escape
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("drawer-open")) {
      closeDrawer();
    }
  });

  // Close after clicking a link
  drawer.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a) closeDrawer();
  });
})();

// Intro
(() => {
  const intro = document.querySelector('.intro-screen');
  if (!intro) return;

  // Skip intro if user already visited
  if (sessionStorage.getItem('introPlayed')) {
    intro.remove();
    return;
  }

  // Match the CSS loading bar:
  // - bar animation: 1400ms
  // - bar delay: 320ms
  // Total ≈ 1720ms, add a small buffer so it feels intentional
  const HOLD_TIME = 1900; // ms

  setTimeout(() => {
    document.body.classList.add('intro-done');
    sessionStorage.setItem('introPlayed', 'true');

    // Remove from DOM after fade-out completes (matches your 800ms transition)
    setTimeout(() => intro.remove(), 900);
  }, HOLD_TIME);
})();



(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const hero = document.querySelector(".hero");
  const services = document.querySelector("#services");

  if (!hero || !services) return;

  // Ensure reveal sections start hidden (optional if you already do this in CSS)
  document.documentElement.classList.add("js");

  // 1) Reveal sections (services now, reusable later)
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  }, { threshold: 0.18 });

  document.querySelectorAll(".reveal-section").forEach((el) => revealObserver.observe(el));

  // 2) Fade hero out based on services position
  // When services intersects (enters), fade hero out. When user scrolls back up, restore.
  const heroFadeObserver = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      hero.classList.add("is-fading");
    } else {
      hero.classList.remove("is-fading");
    }
  }, {
    root: null,
    threshold: 0,
    // Start fading when services is still below viewport, so it feels smooth
    rootMargin: "-35% 0px -40% 0px"
  });

  heroFadeObserver.observe(services);
})();

(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const panels = document.querySelectorAll(".snap-panel");
  if (!panels.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        panels.forEach(p => p.classList.remove("is-active"));
        entry.target.classList.add("is-active");
      }
    });
  }, { threshold: 0.6 }); // 60% of panel in view = active

  panels.forEach(p => io.observe(p));

  // Ensure first panel starts visible
  panels[0].classList.add("is-active");
})();


(() => {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
})();