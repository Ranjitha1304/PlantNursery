let index = 0;
const slides = document.querySelectorAll(".carousel-item");
const totalSlides = slides.length;
const carouselInner = document.querySelector(".carousel-inner");

function showNextSlide() {
    index = (index + 1) % totalSlides; // Loop back after last image
    carouselInner.style.transform = `translateX(-${index * 100}%)`; // Move images left
}

setInterval(showNextSlide, 2000); // Change image every 2 seconds
