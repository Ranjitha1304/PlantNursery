document.querySelectorAll(".feedback-form").forEach(form => {
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission if validation fails

        let isValid = true;

        let name = this.querySelector("input[name='name']").value.trim();
        let contact = this.querySelector("input[name='contact']").value.trim();
        let email = this.querySelector("input[name='email']").value.trim();
        let customization = this.querySelector("textarea[name='customization']").value.trim();

        let namePattern = /^[A-Za-z\s]{3,50}$/; // Name: Only letters & spaces, min 3 max 50 chars
        let contactPattern = /^[987][0-9]{9}$/; // Contact: Must start with 9, 8, or 7 + 9 more digits (10 total)
        let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Strict email format

        // Clear previous errors
        this.querySelector(".nameError").textContent = "";
        this.querySelector(".contactError").textContent = "";
        this.querySelector(".emailError").textContent = "";
        this.querySelector(".customizationError").textContent = "";

        // Name Validation
        if (!namePattern.test(name)) {
            this.querySelector(".nameError").textContent = "Enter a valid name (3-50 letters, no numbers or special characters).";
            isValid = false;
        }

        // Contact Validation (Should start with 9, 8, or 7 and be exactly 10 digits)
        if (!contactPattern.test(contact)) {
            this.querySelector(".contactError").textContent = "Enter a valid 10-digit contact starting with 9, 8, or 7.";
            isValid = false;
        }

        // Email Validation
        if (!emailPattern.test(email)) {
            this.querySelector(".emailError").textContent = "Enter a valid email (e.g., example@domain.com).";
            isValid = false;
        }

        // Customization Validation (Optional, min 50 chars)
        if (customization.length < 50) {
            this.querySelector(".customizationError").textContent = "Customization text should be minimum 50 characters.";
            isValid = false;
        }

        if (isValid) {
            alert("Form submitted successfully!");
            this.submit(); // Submits the form after successful validation
        }
    });
});
