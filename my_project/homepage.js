document.addEventListener("scroll", () => {
    const scrollPairs = document.querySelectorAll(".scroll-pair");

    scrollPairs.forEach((pair) => {
        const rect = pair.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            pair.classList.add("scroll-visible");
        }
    });
});
