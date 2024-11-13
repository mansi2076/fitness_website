document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll(".image-slider img");
    let currentIndex = 0;
    
    function showNextImage() {
        images[currentIndex].style.opacity = 0; 
        currentIndex = (currentIndex + 1) % images.length; 
        images[currentIndex].style.opacity = 1; 
    }
    
    setInterval(showNextImage, 500); 
});

function scrollImages(direction) {
    const container = document.querySelector('.image-block-container');
    if (direction === 'left') {
        container.scrollBy({ left: -200, behavior: 'smooth' });
    } else {
        container.scrollBy({ left: 200, behavior: 'smooth' });
    }
}