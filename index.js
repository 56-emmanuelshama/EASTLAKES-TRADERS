
  // header shrink on scroll
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });
 
  // mobile nav toggle
  const burger = document.getElementById('burgerBtn');
  const navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    const open = navLinks.style.display === 'flex';
    navLinks.style.display = open ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'fixed';
    navLinks.style.top = '70px';
    navLinks.style.right = '24px';
    navLinks.style.background = '#1C2226';
    navLinks.style.padding = '20px 28px';
    navLinks.style.border = '1px solid rgba(255,255,255,0.15)';
    navLinks.style.gap = '18px';
  });
 
  // reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
 
  // stat count-up
  const stats = document.querySelectorAll('.stat .num');
  let counted = false;
  const countUp = () => {
    if (counted) return;
    counted = true;
    stats.forEach(stat => {
      const target = parseInt(stat.dataset.count, 10);
      let cur = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const timer = setInterval(() => {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(timer); }
        stat.textContent = cur;
      }, 30);
    });
  };
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) countUp(); });
  }, { threshold: 0.4 });
  const statStrip = document.querySelector('.stat-strip');
  if (statStrip) heroObserver.observe(statStrip);
 
  // project filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const show = filter === 'all' || card.dataset.cat === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  });
 
  // contact form (front-end only demo)
  const form = document.getElementById('quoteForm');
  const formMsg = document.getElementById('formMsg');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formMsg.textContent = 'Thanks — your request has been noted. Our team will reach out shortly.';
    form.reset();
  });
 
  // footer year
  document.getElementById('year').textContent = new Date().getFullYear();
