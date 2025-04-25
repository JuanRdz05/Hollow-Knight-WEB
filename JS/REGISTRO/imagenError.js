// imagenError.js
document.addEventListener('DOMContentLoaded', function() {
    const profileImageInput = document.getElementById('profileImage');
    const registerForm = document.querySelector('.register-form');
    const errorMessage = document.getElementById('profileImageError');

    // Validar al enviar el formulario
    registerForm.addEventListener('submit', function(e) {
        if (!profileImageInput.files || profileImageInput.files.length === 0) {
            e.preventDefault();
            showError('La imagen de perfil es requerida');
            // Scroll al campo
            profileImageInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

    // Ocultar error cuando se selecciona una imagen
    profileImageInput.addEventListener('change', function() {
        if (this.files && this.files.length > 0) {
            errorMessage.style.display = 'none';
            registerForm.classList.remove('invalid-profile');
        }
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        registerForm.classList.add('invalid-profile');
        
        // Animación
        const profilePreview = document.getElementById('profilePreview');
        profilePreview.style.animation = 'shake 0.5s';
        setTimeout(() => {
            profilePreview.style.animation = '';
        }, 500);
    }
});