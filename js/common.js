function toggleMenu() {
  var x = document.getElementById("myTopnav");
  var myResponsiveTopnav = document.getElementById("myResponsiveTopnav");
  if (x.className === "menu-items topnav") {
    x.className += " responsive";
    myResponsiveTopnav.className += " responsive";
  } else {
      x.className = "menu-items topnav";
      myResponsiveTopnav.className = "sidenav-responsive fade";
  }
}

function toggleDropdown(element) {
  var dropdownContent = element.nextElementSibling;
  if (dropdownContent) {
    if (!dropdownContent.style.display || dropdownContent.style.display == '' || dropdownContent.style.display == 'none') {
      dropdownContent.style.display = 'block';
    } else {
      dropdownContent.style.display = 'none';
    }
  }
}

let slideIndex;

function slideShow() {
  slidesLength = document.getElementsByClassName("review").length;
  slideIndex = Math.floor((Math.random() * slidesLength) + 1);
  showSlides(slideIndex);
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("review");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slides[slideIndex-1].style.display = "block";  
}

document.onload = slideShow();
