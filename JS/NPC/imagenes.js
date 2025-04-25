// Efecto de lightbox para todas las imágenes de la página
document.querySelectorAll('img').forEach(image => {
    // No aplicar a imágenes decorativas (como las del diálogo)
    if (!image.classList.contains('no-lightbox')) {
        image.addEventListener('click', function() {
            // Crear el contenedor del lightbox
            const lightbox = document.createElement('div');
            lightbox.id = 'lightbox-overlay';
            lightbox.style.position = 'fixed';
            lightbox.style.top = '0';
            lightbox.style.left = '0';
            lightbox.style.width = '100%';
            lightbox.style.height = '100%';
            lightbox.style.backgroundColor = 'rgba(0,0,0,0.95)';
            lightbox.style.display = 'flex';
            lightbox.style.alignItems = 'center';
            lightbox.style.justifyContent = 'center';
            lightbox.style.zIndex = '1000';
            lightbox.style.cursor = 'pointer';
            
            // Crear la imagen ampliada
            const img = document.createElement('img');
            img.src = this.src;
            img.alt = this.alt || 'Imagen ampliada';
            img.style.maxWidth = '90%';
            img.style.maxHeight = '90%';
            img.style.borderRadius = '5px';
            img.style.boxShadow = '0 0 30px rgba(136, 158, 255, 0.7)';
            
            // Crear botón de cerrar
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '&times;';
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '20px';
            closeBtn.style.right = '30px';
            closeBtn.style.fontSize = '40px';
            closeBtn.style.color = 'white';
            closeBtn.style.background = 'none';
            closeBtn.style.border = 'none';
            closeBtn.style.cursor = 'pointer';
            closeBtn.style.zIndex = '1001';
            
            // Crear contenedor de texto para el pie de foto
            const caption = document.createElement('div');
            caption.style.position = 'absolute';
            caption.style.bottom = '20px';
            caption.style.color = 'white';
            caption.style.textAlign = 'center';
            caption.style.width = '100%';
            caption.style.padding = '10px';
            
            // Obtener el texto del pie de foto si existe
            if (this.nextElementSibling && this.nextElementSibling.classList.contains('gallery-caption')) {
                caption.textContent = this.nextElementSibling.textContent;
            } else if (this.parentNode.nextElementSibling && this.parentNode.nextElementSibling.classList.contains('gallery-caption')) {
                caption.textContent = this.parentNode.nextElementSibling.textContent;
            } else if (this.alt) {
                caption.textContent = this.alt;
            }
            
            lightbox.appendChild(img);
            lightbox.appendChild(closeBtn);
            if (caption.textContent) lightbox.appendChild(caption);
            document.body.appendChild(lightbox);
            
            // Funcionalidad para cerrar
            const closeLightbox = () => {
                document.body.removeChild(lightbox);
            };
            
            lightbox.addEventListener('click', closeLightbox);
            closeBtn.addEventListener('click', closeLightbox);
            
            // Cerrar con tecla ESC
            document.addEventListener('keydown', function escListener(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', escListener);
                }
            });
        });
        
        // Solo cursor pointer sin efectos hover
        image.style.cursor = 'pointer';
    }
});