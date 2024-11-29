const mobileMenuButton = document.getElementById('mobile-menu-button');
const menuIcon = mobileMenuButton.querySelector('.menu-icon');
const closeIcon = mobileMenuButton.querySelector('.close-icon');
const mobileMenu = document.getElementById('mobile-menu');
const overlay = document.getElementById('overlay');

function toggleMenu() {
  mobileMenu.classList.toggle('-translate-x-full');
  menuIcon.classList.toggle('hidden');
  closeIcon.classList.toggle('hidden');
  if (overlay.classList.contains('opacity-0')) {
    overlay.classList.remove('opacity-0');
    overlay.classList.add('opacity-25');
  } else {
    overlay.classList.remove('opacity-25');
    overlay.classList.add('opacity-0');
  }
  overlay.classList.toggle('pointer-events-none');
}

mobileMenuButton.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// Carousel functionality
const slidesContainer = document.querySelector('.slides-container');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
const slideCount = slides.length;

function updateCarousel() {
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update dots
    dots.forEach(dot => dot.classList.remove('active', 'opacity-100'));
    dots[currentSlide].classList.add('active', 'opacity-100');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    updateCarousel();
}

// Add click events to dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
    });
});

// Auto-advance slides every 5 seconds
setInterval(nextSlide, 5000);

// Sponsors Carousel
document.addEventListener('DOMContentLoaded', function() {
  const sponsorsTrack = document.querySelector('.sponsors-track');
  if (!sponsorsTrack) return;

  // Clone the sponsor items for seamless infinite scroll
  const sponsorItems = document.querySelectorAll('.sponsor-item');
  sponsorItems.forEach(item => {
    const clone = item.cloneNode(true);
    sponsorsTrack.appendChild(clone);
  });

  // Animation
  let scrollPosition = 0;
  const speed = 0.5; // Adjust speed as needed

  function animate() {
    scrollPosition -= speed;
    
    // Reset position when scroll reaches half of content
    if (Math.abs(scrollPosition) >= sponsorsTrack.offsetWidth / 2) {
      scrollPosition = 0;
    }
    
    sponsorsTrack.style.transform = `translateX(${scrollPosition}px)`;
    requestAnimationFrame(animate);
  }

  animate();

  // Pause animation on hover
  sponsorsTrack.addEventListener('mouseenter', () => {
    sponsorsTrack.style.animationPlayState = 'paused';
  });

  sponsorsTrack.addEventListener('mouseleave', () => {
    sponsorsTrack.style.animationPlayState = 'running';
  });
});
