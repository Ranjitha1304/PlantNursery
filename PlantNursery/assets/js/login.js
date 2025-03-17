const modal=document.getElementById("loginModal");
const loginBtn=document.querySelector(".login a");
const closeBtn=document.querySelector(".close");

// Open  Modal
loginBtn.addEventListener("click",function(event){
event.preventDefault();
document.getElementById("loginForm").reset(); // Clear input fields
modal.style.display="block";
});

  // Close Modal
closeBtn.addEventListener("click",function(){
    modal.style.display="none";
})

    // Close Modal When Clicking Outside the Modal Content
    window.addEventListener("click",function(event){
    if(event.target==modal){
        modal.style.display="none";
    }
});




document.addEventListener("DOMContentLoaded", function () {
    loadFormData();
});

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = true;
    
    validateField("name", /^[a-zA-Z ]{3,}$/, "Name must be at least 3 letters.");
    validateField("mobile", /^\d{10}$/, "Enter a valid 10-digit mobile number.");
    validateField("email", /^\S+@\S+\.\S+$/, "Enter a valid email.");
    validateField("password", /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "Password must be of Uppercase,Lowercase,digit,special Character and min length of 6");
    
    document.querySelectorAll(".error-message").forEach(msg => {
        if (msg.style.display === "block") isValid = false;
    });
    
    if (isValid) {
        saveFormData();
        alert("Form data saved!");
        document.getElementById("loginForm").reset(); // Clear form fields after submission
        document.getElementById("loginModal").style.display = "none"; // Close modal after successful submission
        
    }
});

function validateField(id, regex, errorMsg) {
    const input = document.getElementById(id);
    const errorElement = input.nextElementSibling;
    
    if (!regex.test(input.value)) {
        input.classList.add("error");
        errorElement.textContent = errorMsg;
        errorElement.style.display = "block";
    } else {
        input.classList.remove("error");
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














// document.getElementById("loginForm").addEventListener("submit", function (event) {
//     event.preventDefault(); // Prevent form submission if validation fails

//     let isValid = true;

//     // Name Validation
//     const name = document.getElementById("name");
//     if (!/^[a-zA-Z ]{3,}$/.test(name.value)) {
//         showError(name, "Name must be at least 3 characters and contain only letters.");
//         isValid = false;
//     } else {
//         removeError(name);
//     }

//     // Mobile Number Validation (10-digit number)
//     const mobile = document.getElementById("mobile");
//     if (!/^\d{10}$/.test(mobile.value)) {
//         showError(mobile, "Enter a valid 10-digit mobile number.");
//         isValid = false;
//     } else {
//         removeError(mobile);
//     }

//     // Email Validation
//     const email = document.getElementById("email");
//     if (!/^\S+@\S+\.\S+$/.test(email.value)) {
//         showError(email, "Enter a valid email address.");
//         isValid = false;
//     } else {
//         removeError(email);
//     }

//     // Password Validation (at least 6 characters, mix of uppercase, lowercase, numbers, and special characters)
//     const password = document.getElementById("password");
//     if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password.value)) {
//         showError(password, "Password must be at least 6 characters with an uppercase, lowercase, number, and special character.");
//         isValid = false;
//     } else {
//         removeError(password);
//     }

//     // Submit form if all validations pass
//     if (isValid) {
//         alert("Form submitted successfully!");
//         this.submit();
//     }
// });

// // Show error messages
// function showError(input, message) {
//     const errorElement = input.nextElementSibling;
//     errorElement.textContent = message;
//     errorElement.style.color = "red";
// }

// // Remove error messages
// function removeError(input) {
//     const errorElement = input.nextElementSibling;
//     errorElement.textContent = "";
// }
