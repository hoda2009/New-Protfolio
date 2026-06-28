const humburger = document.querySelector(".humburger");
const navlinks = document.querySelector("#navlinks"); // Target the menu

humburger.addEventListener("click", () => {

    navlinks.classList.toggle('active'); 
});


// Find all carousel components on the entire page
const carousels = document.querySelectorAll('.carousel-container');

carousels.forEach((carousel) => {
    // Look for elements specifically inside THIS carousel container
    const track = carousel.querySelector('.carousel-track');
    const nextBtn = carousel.querySelector('.next-btn');
    const prevBtn = carousel.querySelector('.prev-btn');
    const images = carousel.querySelectorAll('.carousel-track img');
    
    // Each carousel gets its own private counter
    let counter = 0;

    function getSlideWidth() {
        return images[0].getBoundingClientRect().width;
    }

    function updateCarousel() {
        const slideWidth = getSlideWidth();
        track.style.transform = `translateX(${-counter * slideWidth}px)`;
    }

    nextBtn.addEventListener('click', () => {
        // Matches your responsive CSS: 2 slides on desktop, 1 on mobile
        const visibleSlides = window.innerWidth >= 1024 ? 2 : 1;
        
        if (counter >= images.length - visibleSlides) {
            counter = 0; // Loops back to start
        } else {
            counter++;
        }
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        const visibleSlides = window.innerWidth >= 1024 ? 2 : 1;
        
        if (counter <= 0) {
            counter = images.length - visibleSlides; // Loops to end
        } else {
            counter--;
        }
        updateCarousel();
    });

    // Handle orientation changes or desktop resizing for this specific track
    window.addEventListener('resize', updateCarousel);
});

const form = document.querySelector('.contact-form-wrapper');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Stop the page from reloading

  // 1. Gather the form data
  const formData = new FormData(form);
  
  // 2. Convert FormData into a standard JavaScript object
  const data = Object.fromEntries(formData.entries());

  try {
    // 3. Send the request with the correct headers and stringified body
    const response = await fetch('https://formspree.io/f/mgojyrje', {
      method: 'POST',
      body: JSON.stringify(data), // Crucial: must be stringified JSON
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      alert('Message sent successfully! ✨');
      form.reset();
    } else {
      alert('Oops! There was a problem submitting your form.');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
});