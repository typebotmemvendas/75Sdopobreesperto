document.addEventListener('DOMContentLoaded', function () { var duration = 20 * 60; var displayElements = document.querySelectorAll('.countdown-timer'); startTimer(duration, displayElements); const carouselContainers = document.querySelectorAll('.carousel-container'); carouselContainers.forEach(container => { const track = container.querySelector('.carousel-track'); if (!track) return; const slides = Array.from(track.children); const nextButton = container.querySelector('.carousel-button--right'); const prevButton = container.querySelector('.carousel-button--left'); const dotsNav = container.querySelector('.carousel-nav'); const dots = Array.from(dotsNav.children); let currentSlideIndex = 0; const updateSlidePosition = (index) => { const width = track.getBoundingClientRect().width; track.style.transform = 'translateX(-' + (width * index) + 'px)'; slides.forEach(slide => slide.classList.remove('current-slide')); slides[index].classList.add('current-slide'); dots.forEach(dot => dot.classList.remove('current-slide')); dots[index].classList.add('current-slide') }; nextButton.addEventListener('click', () => { currentSlideIndex++; if (currentSlideIndex >= slides.length) { currentSlideIndex = 0 } updateSlidePosition(currentSlideIndex) }); prevButton.addEventListener('click', () => { currentSlideIndex--; if (currentSlideIndex < 0) { currentSlideIndex = slides.length - 1 } updateSlidePosition(currentSlideIndex) }); dotsNav.addEventListener('click', e => { const targetDot = e.target.closest('button'); if (!targetDot) return; const targetIndex = dots.findIndex(dot => dot === targetDot); currentSlideIndex = targetIndex; updateSlidePosition(currentSlideIndex) }); window.addEventListener('resize', () => { updateSlidePosition(currentSlideIndex) }) }) }); function startTimer(duration, displayElements) { var timer = duration, minutes, seconds; setInterval(function () { minutes = parseInt(timer / 60, 10); seconds = parseInt(timer % 60, 10); minutes = minutes < 10 ? "0" + minutes : minutes; seconds = seconds < 10 ? "0" + seconds : seconds; displayElements.forEach(function (element) { element.textContent = minutes + ":" + seconds }); if (--timer < 0) { timer = 0 } }, 1000) }

// Selecionar todos os elementos que devem mostrar o cronômetro
// Vamos adicionar a classe 'countdown-timer' no HTML
var displayElements = document.querySelectorAll('.countdown-timer');

startTimer(duration, displayElements);

// Carousel Logic
// Generic Carousel Logic for Multiple Carousels
const carouselContainers = document.querySelectorAll('.carousel-container');

carouselContainers.forEach(container => {
    const track = container.querySelector('.carousel-track');
    if (!track) return;

    const slides = Array.from(track.children);
    const nextButton = container.querySelector('.carousel-button--right');
    const prevButton = container.querySelector('.carousel-button--left');
    const dotsNav = container.querySelector('.carousel-nav');
    const dots = Array.from(dotsNav.children);

    // Current state per carousel
    let currentSlideIndex = 0;

    const updateSlidePosition = (index) => {
        const width = track.getBoundingClientRect().width;
        track.style.transform = 'translateX(-' + (width * index) + 'px)';

        slides.forEach(slide => slide.classList.remove('current-slide'));
        slides[index].classList.add('current-slide');

        dots.forEach(dot => dot.classList.remove('current-slide'));
        dots[index].classList.add('current-slide');
    };

    // Button Listeners
    nextButton.addEventListener('click', () => {
        currentSlideIndex++;
        if (currentSlideIndex >= slides.length) {
            currentSlideIndex = 0; // Loop back
        }
        updateSlidePosition(currentSlideIndex);
    });

    prevButton.addEventListener('click', () => {
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

    // Window resize adjustment specific to this carousel
    window.addEventListener('resize', () => {
        updateSlidePosition(currentSlideIndex);
    });
});
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
