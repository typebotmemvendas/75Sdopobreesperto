
document.addEventListener('DOMContentLoaded', function () {
    // Definir o tempo em segundos (20 minutos = 20 * 60 = 1200)
    var duration = 20 * 60;

    // Selecionar todos os elementos que devem mostrar o cronômetro
    // Vamos adicionar a classe 'countdown-timer' no HTML
    var displayElements = document.querySelectorAll('.countdown-timer');

    startTimer(duration, displayElements);

    // Carousel Logic
    const track = document.querySelector('.carousel-track');
    // If carousel exists on page
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.carousel-button--right');
        const prevButton = document.querySelector('.carousel-button--left');
        const dotsNav = document.querySelector('.carousel-nav');
        const dots = Array.from(dotsNav.children);

        // Let's use simple translateX logic
        const updateSlidePosition = (index) => {
            const width = track.getBoundingClientRect().width;
            track.style.transform = 'translateX(-' + (width * index) + 'px)';

            slides.forEach(slide => slide.classList.remove('current-slide'));
            slides[index].classList.add('current-slide');

            dots.forEach(dot => dot.classList.remove('current-slide'));
            dots[index].classList.add('current-slide');
        };

        // Window resize adjustment
        window.addEventListener('resize', () => {
            // Re-align current slide
            const currentSlide = track.querySelector('.current-slide');
            // If found, use it, else default to 0
            let currentIndex = 0;
            if (currentSlide) {
                currentIndex = slides.findIndex(slide => slide === currentSlide);
            }
            if (currentIndex === -1) currentIndex = 0;

            updateSlidePosition(currentIndex);
        });

        // Current state
        let currentSlideIndex = 0;

        // Button Listeners
        nextButton.addEventListener('click', e => {
            currentSlideIndex++;
            if (currentSlideIndex >= slides.length) {
                currentSlideIndex = 0; // Loop back
            }
            updateSlidePosition(currentSlideIndex);
        });

        prevButton.addEventListener('click', e => {
            currentSlideIndex--;
            if (currentSlideIndex < 0) {
                currentSlideIndex = slides.length - 1; // Loop to end
            }
            updateSlidePosition(currentSlideIndex);
        });

        // Dot Listeners
        dotsNav.addEventListener('click', e => {
            const targetDot = e.target.closest('button');
            if (!targetDot) return;

            const targetIndex = dots.findIndex(dot => dot === targetDot);
            currentSlideIndex = targetIndex;
            updateSlidePosition(currentSlideIndex);
        });
    }
});

function startTimer(duration, displayElements) {
    var timer = duration, minutes, seconds;

    // Atualizar a cada 1 segundo
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        displayElements.forEach(function (element) {
            element.textContent = minutes + ":" + seconds;
        });

        if (--timer < 0) {
            timer = 0;
            // Opcional: Ação quando acabar (ex: reiniciar ou parar em 00:00)
        }
    }, 1000);
}
