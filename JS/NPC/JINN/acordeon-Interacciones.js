// Acordeón para interacciones
const interactionHeader = document.getElementById('interactionHeader');
const interactionContent = document.getElementById('interactionContent');
const accordionIcon = document.getElementById('accordionIcon');

// Abrir/cerrar al hacer clic
interactionHeader.addEventListener('click', () => {
    interactionContent.classList.toggle('active');
    accordionIcon.classList.toggle('fa-chevron-down');
    accordionIcon.classList.toggle('fa-chevron-up');
    
    // Animación suave al abrir
    if (interactionContent.classList.contains('active')) {
        interactionContent.style.maxHeight = interactionContent.scrollHeight + 'px';
    } else {
        interactionContent.style.maxHeight = '0';
    }
});

// Ajustar altura cuando cambie el tamaño de la ventana
window.addEventListener('resize', () => {
    if (interactionContent.classList.contains('active')) {
        interactionContent.style.maxHeight = interactionContent.scrollHeight + 'px';
    }
});

// Acordeón para curiosidades
const triviaHeader = document.getElementById('triviaHeader');
const triviaContent = document.getElementById('triviaContent');
const triviaAccordionIcon = document.getElementById('triviaAccordionIcon');

// Abrir/cerrar al hacer clic
triviaHeader.addEventListener('click', () => {
    triviaContent.classList.toggle('active');
    triviaAccordionIcon.classList.toggle('fa-chevron-down');
    triviaAccordionIcon.classList.toggle('fa-chevron-up');
    
    // Animación suave al abrir
    if (triviaContent.classList.contains('active')) {
        triviaContent.style.maxHeight = triviaContent.scrollHeight + 'px';
    } else {
        triviaContent.style.maxHeight = '0';
    }
});

// Ajustar altura cuando cambie el tamaño de la ventana
window.addEventListener('resize', () => {
    if (triviaContent.classList.contains('active')) {
        triviaContent.style.maxHeight = triviaContent.scrollHeight + 'px';
    }
});