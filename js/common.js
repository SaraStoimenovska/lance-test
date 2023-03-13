function toggleMenu() {
  var x = document.getElementById("myTopnav");
  var myResponsiveTopnav = document.getElementById("myResponsiveTopnav");
  console.log(x.className)
  if (x.className === "menu-items topnav") {
      // console.log('x.className')
    x.className += " responsive";
    myResponsiveTopnav.className += " responsive";
  } else {
      x.className = "menu-items topnav";
      myResponsiveTopnav.className = "sidenav-responsive fade";
  }
}

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
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