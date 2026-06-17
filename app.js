document.addEventListener('DOMContentLoaded', () => {
  // PROJECT CARDS DYNAMIC LOGIC (HUE, CURSOR GLOW & FILTERING)
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    // 1. Set dynamic CSS variable --hue from HTML data-hue attribute
    const hue = card.getAttribute('data-hue');
    if (hue) {
      card.style.setProperty('--hue', hue);
    }

    // 2. Cursor Spotlight Tracking Glow Effect
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 3. Category Filter Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          // Force layout reflow to make sure transition executes
          void card.offsetHeight;
          card.classList.remove('fade-out');
          card.classList.add('fade-in');
        } else {
          card.classList.remove('fade-in');
          card.classList.add('fade-out');
          
          // Hide card from DOM flow once transition ends
          const onTransitionEnd = () => {
            if (card.classList.contains('fade-out')) {
              card.style.display = 'none';
            }
            card.removeEventListener('transitionend', onTransitionEnd);
          };
          card.addEventListener('transitionend', onTransitionEnd);
        }
      });
    });
  });



  // COPY EMAIL TO CLIPBOARD WITH DYNAMIC TOAST
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('email-copied-toast');
  if (copyBtn && toast) {
    copyBtn.addEventListener('click', () => {
      const email = 'alvarorema2016@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 2500);
      }).catch(err => {
        console.error('Copy to clipboard failed', err);
      });
    });
  }





  // MOBILE NAVIGATION DRAWER
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }


});
