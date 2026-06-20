/* ==========================================================================
   JavaScript Functionality & Interactivity - Premium Edition
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Sticky Glass Header Scroll Transition
  const header = document.getElementById('header');
  const toggleHeaderClass = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // Run on load and scroll
  toggleHeaderClass();
  window.addEventListener('scroll', toggleHeaderClass);

  // 2. Mobile Drawer Navigation Toggle
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMobileMenu = () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  };

  const closeMobileMenu = () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  };

  hamburger.addEventListener('click', toggleMobileMenu);

  // Close mobile drawer when clicking navigation item link
  navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close drawer if clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // 3. Dynamic Section Active-Link Scroll Highlighting
  const sectionsWithId = document.querySelectorAll('section[id]');

  const highlightActiveLink = () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120; // offset value for header

    sectionsWithId.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', highlightActiveLink);
  highlightActiveLink();

  // 4. Performance Intersection Observer for Fade-Reveal Animations
  const revealElements = document.querySelectorAll('.reveal');

  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve to trigger animation only once
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserverOptions = {
    threshold: 0.1, // Trigger when 10% is visible
    rootMargin: '0px 0px -40px 0px' // Trigger slightly before screen bottom
  };

  const observerInstance = new IntersectionObserver(revealCallback, revealObserverOptions);

  revealElements.forEach(element => {
    observerInstance.observe(element);
  });


  // 6. CV Download Handler (Fallback/Enhancement)
  const downloadCvBtn = document.querySelector('a[download]');
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', async (e) => {
      e.preventDefault();

      try {
        const response = await fetch(downloadCvBtn.href);
        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        const tempLink = document.createElement('a');

        tempLink.href = url;
        tempLink.download = 'Ridwan_CV.pdf';
        document.body.appendChild(tempLink);
        tempLink.click();

        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        // Fallback to default browser behavior if fetch fails
        window.location.href = downloadCvBtn.href;
      }
    });
  }
});
