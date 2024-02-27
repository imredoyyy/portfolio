$(document).ready(function() {
  var $portfolios = $('.portfolios').isotope({
    itemSelector: '.portfolio-card',
    layoutMode: 'fitRows'
  });

  $('.portfolio__filter-btn-container button[data-filter="*"]').addClass('active');

  $('.portfolio__filter-btn-container').on('click', 'button', function() {
    var filterValue = $(this).attr('data-filter');
    $portfolios.isotope({ filter: filterValue });

    $('.portfolio__filter-btn-container button').removeClass('active');
    $(this).addClass('active');
  });
});


// Scroll to Top on Click

function scrollToTop() {
  document.documentElement.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

window.addEventListener("scroll", function() {
  const goTop = document.querySelector("#scrollTop");
  if (window.scrollY > 200) {
    goTop.style.opacity = "1";
    goTop.style.visibility = "visible";
  } else {
    goTop.style.opacity = "0";
    goTop.style.visibility = "hidden";
  }
});

document.querySelector("#scrollTop").addEventListener("click", scrollToTop); 


// Loader Animation 
window.addEventListener('load', () => {
  const loader = document.querySelector('#loader');

  loader.classList.add('loader-hidden');

  loader.addEventListener('transitioned', () => {
    loader.classList.remove('loader-hidden');
  });
});


// AOS - Animation on Scroll Configuration
    AOS.init({ //Innitiate AOS
      duration: 1000,
      offset: 100,
    });  
