
// Mobile Menu Show on Click

const $window = $(window);
const $mobileMenu = $(".mobile-menu");
const $showMenu = $(".show__menu");
const $hideMenu = $(".hide__menu");
const $windowSize = 760;

$(".mobile-menu").hide();
$(".hide__menu").hide();

$(".show__menu").click(function (event) {
  event.stopPropagation();
  $(".mobile-menu").slideDown(500);
  $(".hide__menu").show();
  $(".show__menu").hide();
});

$(".hide__menu").click(function (event) {
  event.stopPropagation();
  $(".mobile-menu").slideUp(500);
  $(".hide__menu").hide();
  $(".show__menu").show();
});

// Hide Mobile Menu If Window Size is >= 768px

$($window).on("resize", function () {
  if ($(window).width() >= $windowSize) {
    $mobileMenu.slideUp();
    $showMenu.hide();
    $hideMenu.hide();
  } else {
    $showMenu.show();
  }
});

// Theme Switcher

const themeButton = document.querySelector("#theme-button");
const lightTheme = "light-mode";
const iconTheme = "uil-moon";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(lightTheme) ? "light" : "dark";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-sun" : "uil-moon";

if (selectedTheme) {
  document.body.classList[selectedTheme === "light" ? "add" : "remove"](
    lightTheme
  );
  themeButton.classList[selectedIcon === "uil-sun" ? "add" : "remove"](
    iconTheme
  );
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(lightTheme);
  themeButton.classList.toggle(iconTheme);

  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

// Mobile Theme Switcher

const mobileThemeButton = document.querySelector("#mobile-theme-button");
const mobileLightTheme = "light-mode";
const mobileIconTheme = "uil-moon";

const mobileSelectedTheme = localStorage.getItem("selected-theme");
const mobileSelectedIcon = localStorage.getItem("selected-icon");

const getMobileCurrentTheme = () =>
  document.body.classList.contains(lightTheme) ? "light" : "dark";
const getMobileCurrentIcon = () =>
  mobileThemeButton.classList.contains(iconTheme) ? "uil-sun" : "uil-moon";

if (mobileSelectedTheme) {
  document.body.classList[mobileSelectedTheme === "light" ? "add" : "remove"](
    lightTheme
  );
  mobileThemeButton.classList[
    mobileSelectedIcon === "uil-sun" ? "add" : "remove"
  ](iconTheme);
}

mobileThemeButton.addEventListener("click", () => {
  document.body.classList.toggle(mobileLightTheme);
  mobileThemeButton.classList.toggle(mobileIconTheme);

  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

// Type JS Animation

const typed = new Typed('#element', {
  strings: ["Web Designer", "UI/UX Enthusasit", "Tech Enthuasist"],
    backSpeed: 50,
    typeSpeed: 50,
    loop: true,
});


// Copy Email to Clipboard on Click

document.getElementById("copyEmail").addEventListener("click", function() {
  const emailLink = document.getElementById("emailLink");
  const toolTip = document.querySelector(".copy-tooltip");
  const emailText = emailLink.innerText || emailLink.textContent; // Get text inside anchor element

  if (navigator.clipboard) {
    navigator.clipboard.writeText(emailText).then(
      function () {
        toolTip.classList.add("show");
        setTimeout(function () {
          toolTip.classList.remove("show");
        }, 2000); 
      },
    );
  } else {
 
    const textarea = document.createElement("textarea");
    textarea.value = emailText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    toolTip.classList.add("show");
    setTimeout(function () {
      toolTip.classList.remove("show"); 
    }, 2000); 
  }
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



// EmailJS Configuration

let isSendingEmail = false; // Variable to check whether an email is currently being sent

// Event listener for form submit button
document
  .getElementById("send-email")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevents default form submission behaviour

    // Checks whether email and other input types are valid or not
    // Check if not already sending email and both form and email are valid
    if (!isSendingEmail && validateForm() && validateEmail()) {
      sendEmail(); // If conditions are met, proceed to send email
    }
  });

// Checks whether the email format is valid or not
function validateEmail() {
  let email = document.getElementById("email").value.trim();
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    // Display an error message for invalid email format
    document
      .getElementById("emailInputTooltip")
      .classList.add("show-email__tooltip");
    setTimeout(() => {
      document
        .getElementById("emailInputTooltip")
        .classList.remove("show-email__tooltip");
    }, 2000);
    return false;
  } else {
    return true;
  }
}

// function to validate the entire form
function validateForm() {
  // Get values of all form fields
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let project = document.getElementById("project").value.trim();
  let comment = document.getElementById("comment").value.trim();

  // Check if any of the fields are empty

  if (name === "" || email === "" || project === "" || comment === "") {
    // If any field is empty, display a tooltip or an error message
    document.getElementById("validate").classList.add("show-validate-tooltip");
    setTimeout(() => {
      document
        .getElementById("validate")
        .classList.remove("show-validate-tooltip");
    }, 2000);

    return false; // Return false to indicate validation failure
  }
  return true; // Return true if all fields are filled, indicating validation success
}

// Function to send the email

function sendEmail() {
  isSendingEmail = true; // Set flag to indicate email sending process has started

  // Extract form data
  let params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    project: document.getElementById("project").value,
    comment: document.getElementById("comment").value,
  };

  const serviceID = "service_y11rpz4";
  const templateID = "template_qfvofr9";

  // Send email using emailjs library
  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      // If email sent successfully, clear form inputs and display success message
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("project").value = "";
      document.getElementById("comment").value = "";

      document.getElementById("email__tooltip").classList.add("show-tooltip");
      setTimeout(() => {
        document
          .getElementById("email__tooltip")
          .classList.remove("show-tooltip");
      }, 2000);
    })
    .catch((err) => console.log(err)) // Log any errors that occur during email sending process
    .finally(() => {
      // Reset the flag once the email sending process is completed
      isSendingEmail = false;
    });
}

// Progress Animation

function startProgressAnimation(element, progressMaxValue) {
  let progressMinValue = 0;
  let progressValueElement = element.querySelector(".progress-value");

  let progress = setInterval(() => {
    progressMinValue++;

    progressValueElement.textContent = `${progressMinValue}%`;
    element.style.background = `conic-gradient(var(--clr-violet) ${
      progressMinValue * 3.6
    }deg, var(--clr-dark) 0deg)`;

    if (progressMinValue == progressMaxValue) {
      clearInterval(progress);
    }
  }, 20);
}

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let targetElement = entry.target;
      let progressMaxValue = parseInt(
        targetElement
          .querySelector(".progress-value")
          .getAttribute("data-progress-max")
      );
      startProgressAnimation(targetElement, progressMaxValue);
      observer.unobserve(targetElement); // stop observing once animation starts
    }
  });
}

let observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });

let observedElements = new Set();

// Start observing when any element is visible
document.querySelectorAll(".skill__progress").forEach((item) => {
  observer.observe(item);
  observedElements.add(item);
});


// AOS - Animation on Scroll Configuration
AOS.init({ //Innitiate AOS
  duration: 1000,
  offset: 100,
});  


// Loader Animation 
window.addEventListener('load', () => {
  const loader = document.querySelector('#loader');

  loader.classList.add('loader-hidden');

  loader.addEventListener('transitioned', () => {
    loader.classList.remove('loader-hidden');
  });
});
