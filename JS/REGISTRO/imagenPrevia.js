// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    const profileImageInput = document.getElementById('profileImage');
    const profilePreview = document.getElementById('profilePreview');
    const errorMessage = document.getElementById('profileImageError');
    const registerForm = document.querySelector('.register-form');

    // Manejar cambio de imagen
    if (profileImageInput) {
        profileImageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            // Ocultar mensaje de error
            errorMessage.style.display = 'none';
            registerForm.classList.remove('invalid-profile');
            
            if (!file) {
                profilePreview.innerHTML = '<i class="fas fa-user-circle default-icon"></i>';
                return;
            }

            // Validar tipo de archivo
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                showError('Formato no válido. Use JPEG, PNG o GIF');
                return;
            }

            // Validar tamaño (2MB máximo)
            if (file.size > 2097152) {
                showError('La imagen no debe exceder 2MB');
                return;
            }

            // Mostrar vista previa
            reader.onload = function(e) {
                profilePreview.innerHTML = '';
                const img = document.createElement('img');
                img.src = e.target.result;
                profilePreview.appendChild(img);
            }
            
            reader.readAsDataURL(file);
        });
    }

    // Manejar envío del formulario
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            if (!profileImageInput.files || profileImageInput.files.length === 0) {
                e.preventDefault();
                showError('La imagen de perfil es requerida');
                // Scroll al campo
                profileImageInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        registerForm.classList.add('invalid-profile');
        profileImageInput.value = '';
        profilePreview.innerHTML = '<i class="fas fa-user-circle default-icon"></i>';
        
        // Animación
        profilePreview.style.animation = 'shake 0.5s';
        setTimeout(() => {
            profilePreview.style.animation = '';
        }, 500);
    }
});