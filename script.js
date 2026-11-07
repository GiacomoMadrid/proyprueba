
const loginForm = document.getElementById("loginForm");
const loginView = document.getElementById("loginView");
const homeView = document.getElementById("homeView");

const errorModal = document.getElementById("errorModal");
const errorMessage = document.getElementById("errorMessage");

const closeModal = document.getElementById("closeModal");
const logoutButton = document.getElementById("logoutButton");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Cargar credenciales y validar login
loginForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    try {
        // Leer archivo JSON
        const response = await fetch("credentials.json");

        if (!response.ok) {
            throw new Error("No se pudo cargar el archivo de credenciales.");
        }

        const credentials = await response.json();

        // Comprobar usuario
        if (email !== credentials.email) {
            showError("El usuario ingresado no existe.");
            return;
        }

        // Comprobar contraseña
        if (password !== credentials.password) {
            showError("La contraseña es incorrecta.");
            return;
        }

        // Acceso correcto
        loginView.classList.add("hidden");
        homeView.classList.remove("hidden");

        document.getElementById("welcomeMessage").textContent =
            `¡Hola, ${email}! Has iniciado sesión correctamente.`;

        loginForm.reset();

    } catch (error) {
        showError(error.message);
    }
});

// Mostrar modal
function showError(message) {
    errorMessage.textContent = message;
    errorModal.classList.remove("hidden");
}

// Cerrar modal
closeModal.addEventListener("click", function() {
    errorModal.classList.add("hidden");
});

// Cerrar sesión
logoutButton.addEventListener("click", function() {
    homeView.classList.add("hidden");
    loginView.classList.remove("hidden");

    loginForm.reset();
});

// Cerrar modal al hacer clic fuera
errorModal.addEventListener("click", function(event) {
    if (event.target === errorModal) {
        errorModal.classList.add("hidden");
    }
});
