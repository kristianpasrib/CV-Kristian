document.addEventListener('DOMContentLoaded', function(){
  // mobile nav toggle
  var btn = document.querySelector('.mobile-toggle');
  btn && btn.addEventListener('click', function(){
    document.body.classList.toggle('mobile-nav-active');
  });

  // close nav on link click
  document.querySelectorAll('.navmenu a').forEach(function(a){
    a.addEventListener('click', function(){ document.body.classList.remove('mobile-nav-active'); });
  });

  // init AOS
  if(window.AOS) AOS.init({duration:800, once:true});

  // init Swiper
// init Swiper
if(window.Swiper){
  var s = document.querySelector('.testimonials-slider');
  if(s) new Swiper(s, {
    loop: true,
    slidesPerView: 1.5,       // tampilin 1 utama + prev/next kecil
    centeredSlides: true,
    spaceBetween: 40,
    watchSlidesProgress: true, // penting biar CSS bisa deteksi prev/next
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    speed: 800,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  });
}






  // init GLightbox
  if(window.GLightbox) glightbox = GLightbox({selector: '.glightbox'});

  // -----------------------------
  // Scroll Spy Active Navbar
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navmenu ul li a');
  let isScrolling = false;
  let scrollTimeout;

  function setActiveLink() {
    if(isScrolling) return; // abaikan scroll spy saat smooth scroll
    let currentSection = '';
    sections.forEach(section => {
      if(window.pageYOffset >= section.offsetTop - 100){
        currentSection = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if(link.getAttribute('href') === '#' + currentSection){
        link.classList.add('active');
      }
    });
  }

  // scroll event
  window.addEventListener('scroll', setActiveLink);

  // smooth scroll & set active on click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));

      // langsung set active link saat klik
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // flag untuk menahan scroll spy
      isScrolling = true;

      // scroll smooth
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });

      // clear timeout sebelumnya kalau ada
      clearTimeout(scrollTimeout);

      // reset flag setelah smooth scroll selesai
      scrollTimeout = setTimeout(() => { isScrolling = false; }, 800);
    });
  });

  // set initial active link
  setActiveLink();
});
