/**
 * DIYA PANCHAL — PERSONAL PORTFOLIO INTERACTION ENGINE
 * Premium Recruiter-Friendly Features & Ambient Web Audio Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons if available
  if (window.lucide) {
    window.lucide.createIcons();
  }

  /* --------------------------------------------------------------------------
     1. THEME SWITCHER (DARK / LIGHT MODE)
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIconSun = document.getElementById('theme-icon-sun');
  const themeIconMoon = document.getElementById('theme-icon-moon');
  const htmlElement = document.documentElement;

  // Read saved theme preference or default to dark
  const savedTheme = localStorage.getItem('diya_portfolio_theme') || 'dark';
  setTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('diya_portfolio_theme', newTheme);
  });

  function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      themeIconSun.classList.add('hidden');
      themeIconMoon.classList.remove('hidden');
    } else {
      themeIconMoon.classList.add('hidden');
      themeIconSun.classList.remove('hidden');
    }
  }

  /* --------------------------------------------------------------------------
     2. MOBILE MENU DRAWER TOGGLE
     -------------------------------------------------------------------------- */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    if (isOpen) {
      menuIconOpen.classList.add('hidden');
      menuIconClose.classList.remove('hidden');
    } else {
      menuIconClose.classList.add('hidden');
      menuIconOpen.classList.remove('hidden');
    }
  });

  // Close mobile drawer when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuIconClose.classList.add('hidden');
      menuIconOpen.classList.remove('hidden');
    });
  });

  /* --------------------------------------------------------------------------
     3. NAVBAR SCROLL BLUR & READING PROGRESS BAR
     -------------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    // Update top progress line width
    if (scrollProgress) {
      scrollProgress.style.width = `${scrollPercent}%`;
    }

    // Add blurred backdrop on navbar scroll
    if (scrollTop > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Toggle Back to Top Button
    if (scrollTop > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* --------------------------------------------------------------------------
     4. HERO SHOWCASE CARD DYNAMICS (CLEAN NON-TERMINAL UI)
     -------------------------------------------------------------------------- */
  const matrixItems = document.querySelectorAll('.matrix-item');
  matrixItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.borderColor = 'var(--accent-primary)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.borderColor = 'var(--border-color)';
    });
  });

  /* --------------------------------------------------------------------------
     5. PROJECT DETAIL MODAL DIALOG DATA & HANDLERS
     -------------------------------------------------------------------------- */
  const projectModal = document.getElementById('project-modal');
  const modalContentBody = document.getElementById('modal-content-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  const projectDetailsMap = {
    'project-1': {
      title: 'AI Resume & Job Matcher',
      category: 'AI / Web Application',
      description: 'An intelligent recruitment aid web application built with Python and Django. Allows job applicants to build or parse resumes and calculates match percentage against posted software development job openings using NLP text similarity vectors.',
      architecture: [
        'Built with Django MVT architecture & SQLite database.',
        'Extracted text features from uploaded resume PDFs.',
        'Matched applicant skill sets against job requirement keywords using TF-IDF cosine similarity metrics.',
        'Clean responsive dashboard created using Bootstrap 5 and custom JavaScript.'
      ],
      tech: ['Python', 'Django', 'SQLite', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'scikit-learn / NLP']
    },
    'project-2': {
      title: 'LifeLink',
      category: 'Healthcare / Django Application',
      description: 'Emergency Hospital Bed & Blood Availability Network designed to solve critical real-time information gaps during medical emergencies.',
      architecture: [
        'Centralized portal for verified hospitals to update available ICU/General bed counts live.',
        'Blood availability inventory catalog grouped by blood type (A+, B+, O-, etc.).',
        'Registered donor contact database allowing emergency blood requests.',
        'Multi-user role management for Hospital Administrators and Public Visitors.'
      ],
      tech: ['Python', 'Django', 'SQLite', 'Bootstrap', 'JavaScript', 'HTML5/CSS3']
    },
    'project-3': {
      title: 'Online Furniture Management System',
      category: 'BCA E-Commerce Web Application',
      description: 'E-Commerce and inventory management project developed using PHP and MySQL database during BCA studies at Shree Umiya B.C.A. Girls College.',
      architecture: [
        'Interactive product catalog with category search filters.',
        'Structured relational MySQL database schema for managing furniture inventory, prices, and orders.',
        'PHP backend logic for processing inventory updates and dynamic page rendering.',
        'Admin dashboard interface for managing furniture catalog and customer queries.'
      ],
      tech: ['PHP', 'MySQL', 'HTML5', 'CSS3', 'JavaScript']
    }
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      const details = projectDetailsMap[projectId];

      if (details) {
        modalContentBody.innerHTML = `
          <div class="modal-header-block" style="margin-bottom: 1.5rem;">
            <span class="project-num" style="color: var(--accent-light); font-size: 0.85rem; font-weight: 700;">${details.category}</span>
            <h2 id="modal-title" style="font-size: 1.8rem; font-weight: 800; margin-top: 0.25rem;">${details.title}</h2>
          </div>
          <p style="font-size: 1.05rem; color: var(--text-secondary); margin-bottom: 1.5rem;">${details.description}</p>

          <div style="background: rgba(0,0,0,0.2); border: 1px solid var(--border-color); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
            <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--accent-cyan); margin-bottom: 0.75rem;">Technical Breakdown & Highlights:</h4>
            <ul style="list-style: disc; padding-left: 1.25rem; color: var(--text-secondary); font-size: 0.925rem; line-height: 1.6;">
              ${details.architecture.map(item => `<li style="margin-bottom: 0.4rem;">${item}</li>`).join('')}
            </ul>
          </div>

          <div style="margin-bottom: 0.5rem;">
            <h4 style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">Stack Used:</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
              ${details.tech.map(t => `<span class="tech-chip">${t}</span>`).join('')}
            </div>
          </div>
        `;

        if (window.lucide) window.lucide.createIcons();
        projectModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  modalCloseBtn.addEventListener('click', closeModal);
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) closeModal();
  });

  function closeModal() {
    projectModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }

  /* --------------------------------------------------------------------------
     6. CONTACT FORM VALIDATION & FEEDBACK
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const formName = document.getElementById('form-name');
  const formEmail = document.getElementById('form-email');
  const formMessage = document.getElementById('form-message');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      const nameGroup = formName.closest('.form-group');
      if (!formName.value.trim()) {
        nameGroup.classList.add('has-error');
        isValid = false;
      } else {
        nameGroup.classList.remove('has-error');
      }

      // Validate Email
      const emailGroup = formEmail.closest('.form-group');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formEmail.value.trim() || !emailRegex.test(formEmail.value.trim())) {
        emailGroup.classList.add('has-error');
        isValid = false;
      } else {
        emailGroup.classList.remove('has-error');
      }

      // Validate Message
      const messageGroup = formMessage.closest('.form-group');
      if (!formMessage.value.trim()) {
        messageGroup.classList.add('has-error');
        isValid = false;
      } else {
        messageGroup.classList.remove('has-error');
      }

      if (isValid) {
        submitBtn.innerHTML = '<span>Sending Message...</span>';

        // Populate Indian Standard Time (IST) timestamp
        const timeInput = document.getElementById('form-time-ist');
        let nowIST = '';
        if (timeInput) {
          nowIST = new Date().toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            dateStyle: 'medium',
            timeStyle: 'medium'
          }) + ' (IST)';
          timeInput.value = nowIST;
        }

        const formData = new FormData(contactForm);
        formData.append('Submission_Time_IST', nowIST);

        fetch('https://formsubmit.co/ajax/panchaldiya8611@gmail.com', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => {
          submitBtn.innerHTML = '<span>Send Message</span><i data-lucide="send"></i>';
          if (window.lucide) window.lucide.createIcons();

          formFeedback.className = 'form-feedback success';
          formFeedback.textContent = 'Thank you! Your message has been sent directly to Diya\'s email inbox.';
          formFeedback.classList.remove('hidden');
          contactForm.reset();

          setTimeout(() => {
            formFeedback.classList.add('hidden');
          }, 6000);
        })
        .catch(err => {
          // Fallback to standard native submit if AJAX is blocked
          HTMLFormElement.prototype.submit.call(contactForm);
        });
      }
    });
  }

  /* --------------------------------------------------------------------------
     7. VISITOR COUNTER WIDGET (PERSISTED)
     -------------------------------------------------------------------------- */
  const visitorCountEl = document.getElementById('visitor-count');
  let currentViews = parseInt(localStorage.getItem('diya_portfolio_views') || '1248');

  // Increment view on session
  if (!sessionStorage.getItem('diya_viewed_session')) {
    currentViews += 1;
    localStorage.setItem('diya_portfolio_views', currentViews.toString());
    sessionStorage.setItem('diya_viewed_session', 'true');
  }

  if (visitorCountEl) {
    visitorCountEl.textContent = currentViews.toLocaleString();
  }

  /* --------------------------------------------------------------------------
     8. SCROLL INTERSECTION OBSERVER FOR ACTIVE NAV LINKS
     -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => sectionObserver.observe(sec));
});
