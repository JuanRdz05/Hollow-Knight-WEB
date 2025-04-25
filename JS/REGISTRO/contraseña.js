document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const requirements = {
        length: document.getElementById('req-length'),
        upper: document.getElementById('req-upper'),
        lower: document.getElementById('req-lower'),
        number: document.getElementById('req-number'),
        special: document.getElementById('req-special')
    };

    // Validación de requisitos de contraseña
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validatePasswordMatch);

    function validatePassword() {
        const value = this.value;
        
        // Validar cada requisito
        const hasMinLength = value.length >= 8;
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecialChar = /[!@#$%^&*]/.test(value);
        
        // Actualizar la interfaz
        toggleClass(requirements.length, hasMinLength);
        toggleClass(requirements.upper, hasUpperCase);
        toggleClass(requirements.lower, hasLowerCase);
        toggleClass(requirements.number, hasNumber);
        toggleClass(requirements.special, hasSpecialChar);

        // Validar coincidencia si hay texto en confirmación
        if (confirmPasswordInput.value.length > 0) {
            validatePasswordMatch.call(confirmPasswordInput);
        }
    }

    function validatePasswordMatch() {
        const passwordValue = passwordInput.value;
        const confirmValue = this.value;
        
        if (confirmValue.length === 0) {
            this.setCustomValidity('');
            return;
        }

        if (passwordValue !== confirmValue) {
            this.setCustomValidity('Las contraseñas no coinciden');
            this.reportValidity();
        } else {
            this.setCustomValidity('');
        }
    }

    function toggleClass(element, isValid) {
        if (isValid) {
            element.classList.add('valid');
        } else {
            element.classList.remove('valid');
        }
    }

    // Validar al enviar el formulario
    document.querySelector('.register-form').addEventListener('submit', function(e) {
        if (passwordInput.value !== confirmPasswordInput.value) {
            e.preventDefault();
            confirmPasswordInput.setCustomValidity('Las contraseñas no coinciden');
            confirmPasswordInput.reportValidity();
        }
    });
});