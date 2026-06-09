document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const totop = document.getElementById('totop');
  const btn = document.getElementById('navBtn');
  const mob = document.getElementById('mobileNav');

  /* 1. 스크롤 제어 */
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 20);
    totop.classList.toggle('show', y > 400);
  });

  /* 2. 모바일 메뉴 토글 */
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    mob.classList.toggle('open');
  });

  /* 3. 모달 팝업 로직 추가 */
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const closeBtn = document.querySelector('.modal-close');
  const workCards = document.querySelectorAll('.work-card');

  // 카드 클릭 이벤트
  workCards.forEach(card => {
    card.addEventListener('click', () => {
      const imgSrc = card.getAttribute('data-img');
      if (imgSrc) {
        modalImg.src = imgSrc;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // 뒷배경 스크롤 방지
      }
    });
  });

  // 닫기 기능 (버튼 및 배경 클릭)
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    modalImg.src = ''; // 이미지 소스 초기화
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  /* 4. 기존 페이드인 효과 (Intersection Observer) */
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  totop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});