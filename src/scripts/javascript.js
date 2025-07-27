const toggleButton = document.getElementById('toggleButton');
const navLinks = document.getElementById('navLinks');
const navbar = document.querySelector('.navbar');

toggleButton.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

document.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;

  if (scrollPosition > 0) {
    // Add a class to the navbar when scrolling down
    navbar.classList.add('scrolled');
  } else {
    // Remove the class when scrolling back to the top
    navbar.classList.remove('scrolled');
  }
});


// =======================================================================

$(document).ready(function () {
  $('#lightgallery').lightGallery();
});

// =======================================================================



// =======================================================================

// Assuming your element has the ID "yourElementId"
var yourElement = document.getElementById('#news-content-wrapper');

// Calculate half of the element's height
var halfHeight = yourElement.offsetHeight / 2;

console.log(halfHeight);

// =======================================================================

/* ========================================================================================================== */
// =======================================================================
/* ======================================= Counter ============================================= */
/* ========================================================================================================== */

var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      var number = entry.target.getElementsByClassName('counter-number')[0];
      var max = parseInt(entry.target.getAttribute('data-max'));
      var duration = 5000; // Duration for the count in milliseconds
      var increment = Math.ceil(max / (duration / 10)); // Calculate the increment so that each counter finishes in the same duration
      var interval = setInterval(function () {
        if (parseInt(number.textContent) < max) {
          number.textContent = parseInt(number.textContent) + increment;
        } else {
          number.textContent = max; // Ensure the final number is not more than max
          clearInterval(interval);
        }
      }, 10);
    }
  });
});

var boxes = document.getElementsByClassName('cb');
for (var i = 0; i < boxes.length; i++) {
  observer.observe(boxes[i]);
}


/* ========================================================================================================== */
/* ======================================= Drop down ============================================= */
/* ========================================================================================================== */
