document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("loginModal");
    const loginBtn = document.querySelector(".login a");
    const closeBtn = document.querySelector(".close");
    const loginForm = document.getElementById("loginForm");

    // Open Modal
    loginBtn.addEventListener("click", function (event) {
        event.preventDefault();
        loginForm.reset(); // Clear input fields
        modal.style.display = "block";
    });

    // Close Modal
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Close Modal When Clicking Outside the Modal Content
    window.addEventListener("click", function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // Load stored user data
    loadFormData();

    // Form Submission
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let isValid = true;

        validateField("name", /^[a-zA-Z ]{3,}$/, "Name must be at least 3 letters.");
        validateField("mobile", /^[89]\d{9}$/, "Mobile number must start with 8 or 9 and be 10 digits long.");
        validateField("email", /^\S+@\S+\.\S+$/, "Enter a valid email.");
        validateField("password", /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d@$!%*?&]?)[A-Za-z\d@$!%*?&]{6,}$/, 
            "Password must contain uppercase, lowercase, and either a digit or a special character, with a minimum length of 6."
        );

        // Ensure no input fields have an "error" class
        isValid = [...document.querySelectorAll("input")].every(input => !input.classList.contains("error"));

        if (isValid) {
            saveFormData();
            alert("Form data saved!");
            loginForm.reset(); // Clear form fields after submission
            modal.style.display = "none"; // Close modal after successful submission
        }
    });
});

function validateField(id, regex, errorMsg) {
    const input = document.getElementById(id);
    const errorElement = input.nextElementSibling;
    const trimmedValue = input.value.trim(); // Trim to remove leading/trailing spaces

    if (!regex.test(trimmedValue)) {
        input.classList.add("error");
        errorElement.textContent = errorMsg; // Ensure error message is displayed
        errorElement.style.display = "block";
    } else {
        input.classList.remove("error");
        errorElement.textContent = ""; // Reset error message
        errorElement.style.display = "none";
    }
}

function saveFormData() {
    const userData = {
        name: document.getElementById("name").value,
        mobile: document.getElementById("mobile").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };
    localStorage.setItem("userData", JSON.stringify(userData));
}

function loadFormData() {
    const savedData = JSON.parse(localStorage.getItem("userData"));
    if (savedData) {
        document.getElementById("name").value = savedData.name || "";
        document.getElementById("mobile").value = savedData.mobile || "";
        document.getElementById("email").value = savedData.email || "";
        document.getElementById("password").value = savedData.password || "";
    }
}



