'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// Image modal functions
function openImage(src) {
  if (src && src.trim() !== '') {
    document.getElementById("imageModal").style.display = "block";
    document.getElementById("popupImage").src = src;
  }
}

function closeImage() {
  document.getElementById("imageModal").style.display = "none";
}

// Close modal when clicking outside the image
window.onclick = function (event) {
  const modal = document.getElementById("imageModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Google Sheets form submission function
function submitToGoogleSheets(event) {
  event.preventDefault();

  const form = event.target;
  const fullName = form.fullname.value;
  const email = form.email.value;
  const message = form.message.value;

  if (!fullName || !email || !message) {
    alert("Please fill in all fields before sending.");
    return;
  }

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyKZ2nS4jeDp7eRaEfcmRQejAv-qHsj7EjT4Tx1fi29EEZSWYraiRPEbdyBFyTdYf3cQQ/exec";

  // Prepare form data
  const formData = new FormData();
  formData.append("fullname", fullName);
  formData.append("email", email);
  formData.append("message", message);

  // Show loading state
  const submitBtn = form.querySelector("[data-form-btn]");
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';
  submitBtn.disabled = true;

  // Send request
  const xhr = new XMLHttpRequest();
  xhr.open("POST", GOOGLE_SCRIPT_URL, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      if (xhr.status === 200) {
        alert("✅ Message sent successfully!");
        form.reset();
      } else {
        console.error("Error:", xhr.status, xhr.responseText);
        alert("❌ There was an error sending your message. Please try again.");
      }
    }
  };

  xhr.onerror = function () {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    alert("❌ Network error. Please try again.");
  };

  xhr.send(formData);
}

// Add Flutter-themed animations
document.addEventListener('DOMContentLoaded', function() {
  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all cards and service items
  const animatedElements = document.querySelectorAll('.card, .service-item, .project-item, .timeline-item');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Add ripple effect to buttons
  const buttons = document.querySelectorAll('.btn, .navbar-link, .filter-item button');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
