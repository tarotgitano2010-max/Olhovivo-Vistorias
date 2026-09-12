/* ==========================================================
   Olho Vivo Vistoria Veicular - script.js
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== HEADER SCROLL ===== */
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  /* ===== MENU MOBILE ===== */
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const icon = menuToggle.querySelector('i');
    if (nav.classList.contains('open')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-xmark');
    } else {
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  });

  /* Fecha menu ao clicar em um link */
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      const icon = menuToggle.querySelector('i');
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    });
  });

  /* Fecha menu ao clicar fora */
  document.addEventListener('click', (e) => {
    if (
      nav.classList.contains('open') &&
      !nav.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      nav.classList.remove('open');
      const icon = menuToggle.querySelector('i');
      icon.classList.remove('fa-xmark');
      icon.classList.add('fa-bars');
    }
  });

  /* ===== BACK TO TOP ===== */
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ===== FORMULÁRIO DE CONTATO ===== */
  const form = document.getElementById('formContato');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const email = document.getElementById('email').value.trim();
    const servico = document.getElementById('servico').value;
    const mensagem = document.getElementById('mensagem').value.trim();

    /* Validação simples */
    if (!nome || !telefone || !email || !servico) {
      showToast('Por favor, preencha todos os campos obrigatórios.', 'error');
      return;
    }

    /* Monta mensagem para WhatsApp */
    const texto = 
      `*Nova Solicitação - Olho Vivo Vistoria Veicular*%0A%0A` +
      `*Nome:* ${encodeURIComponent(nome)}%0A` +
      `*Telefone:* ${encodeURIComponent(telefone)}%0A` +
      `*E-mail:* ${encodeURIComponent(email)}%0A` +
      `*Serviço:* ${encodeURIComponent(servico)}%0A` +
      `*Mensagem:* ${encodeURIComponent(mensagem || 'Não informada')}`;

    const numero = '5532991764044';
    const url = `https://wa.me/${numero}?text=${texto}`;

    showToast('Redirecionando para o WhatsApp...', 'success');

    setTimeout(() => {
      window.open(url, '_blank');
      form.reset();
    }, 800);
  });

  /* ===== TOAST (notificação) ===== */
  function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
      <span>${message}</span>
    `;

    document.body.appendChild(toast);

    /* Estilo inline para garantir funcionamento */
    Object.assign(toast.style, {
      position: 'fixed',
      top: '100px',
      left: '50%',
      transform: 'translateX(-50%) translateY(-20px)',
      background: type === 'success' ? '#00b34a' : '#e63946',
      color: '#fff',
      padding: '14px 24px',
      borderRadius: '12px',
      fontWeight: '700',
      fontSize: '0.95rem',
      zIndex: '10000',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
      opacity: '0',
      transition: 'all 0.4s ease',
      fontFamily: 'inherit'
    });

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(-20px)';
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }

  /* ===== SCROLL REVEAL (animação ao rolar) ===== */
  const revealElements = document.querySelectorAll(
    '.servico-card, .vantagem-card, .empresa-card, .depoimento-card, .sobre-box, .sobre-text'
  );

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => observer.observe(el));

  /* ===== MÁSCARA DE TELEFONE ===== */
  const telInput = document.getElementById('telefone');

  telInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 6) {
      value = `(${value.slice(0,2)}) ${value.slice(2,7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0,2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }

    e.target.value = value;
  });

  /* ===== ANO NO RODAPÉ ===== */
  const footerBottom = document.querySelector('.footer-bottom p');
  if (footerBottom) {
    const ano = new Date().getFullYear();
    footerBottom.textContent = `© ${ano} Olho Vivo Vistoria Veicular LTDA — Todos os direitos reservados.`;
  }

});
