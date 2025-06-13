document.addEventListener('DOMContentLoaded', () => {
  

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
    });
  });

  
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('toggle');
    hamburger.style.transition = 'transform 0.3s ease';
    hamburger.style.transform = navLinks.classList.contains('active') ? 'translateX(-10px)' : 'translateX(0)';
  });

  const toggleButton = document.querySelector('.dark-mode-toggle');
  const toggleIcon = toggleButton.querySelector('.toggle-icon');

  toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleIcon.style.transition = 'transform 0.3s ease';
    toggleIcon.style.transform = document.body.classList.contains('dark-mode') ? 'rotate(180deg)' : 'rotate(0deg)';
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  });

  
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    toggleIcon.style.transform = 'rotate(180deg)';
  }

  const form = document.querySelector('.contact-form');
  const inputs = form.querySelectorAll('input, textarea');
  const submitButton = form.querySelector('.submit-button');

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      validateInput(input);
    });
  });

  function validateInput(input) {
    const errorElement = input.nextElementSibling;
    if (input.name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(input.value.trim())) {
        errorElement.textContent = 'Please enter a valid email address.';
        return false;
      }
    }
    if (!input.value.trim()) {
      errorElement.textContent = `Please enter your ${input.name}.`;
      return false;
    }
    errorElement.textContent = '';
    return true;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    inputs.forEach(input => {
      if (!validateInput(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      setTimeout(() => {
        alert('Thank you for your message! We will get back to you soon.');
        form.reset();
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
        inputs.forEach(input => input.nextElementSibling.textContent = '');
      }, 1000);
    }
  });
});