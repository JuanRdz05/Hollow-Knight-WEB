document.addEventListener('DOMContentLoaded', function() {
    // Esperar a que la página cargue completamente
    setTimeout(function() {
        const dialogueTop = document.querySelector('.dialogue-top');
        const dialogueBottom = document.querySelector('.dialogue-bottom');
        
        dialogueTop.style.animation = 'fadeIn 1.5s ease-in-out forwards';
        dialogueBottom.style.animation = 'fadeIn 1.5s ease-in-out 0.5s forwards';
    }, 300); // Pequeño retraso adicional para asegurar la carga
});