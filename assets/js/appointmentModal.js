document.addEventListener("DOMContentLoaded", function () {
    // Initialize variables
    let selectedServices = [];
    let totalPrice = 0;
    let defaultService = null;

    // Get modal elements
    const modals = {
        appointment: document.getElementById("appointmentModal"),
        addService: document.getElementById("addServiceModal"),
        final: document.getElementById("finalModal"),
        userDetails: document.getElementById("userDetailsModal"),
        thankYou: document.getElementById("thankYouModal")
    };

    // Buttons
    const bookNowButtons = document.querySelectorAll(".bookingBtn button");
    const addServiceBtn = document.getElementById("addServiceBtn");
    const scheduleAppointmentBtn = document.getElementById("scheduleAppointmentBtn");
    const continueServiceBtn = document.getElementById("continueService");
    const cancelServiceBtn = document.getElementById("cancelService");
    const confirmScheduleFinalBtn = document.getElementById("confirmScheduleFinal");
    const cancelUserDetailsBtn = document.getElementById("cancelUserDetails");
    const proceedToPayBtn = document.getElementById("proceedToPay");
    const closeThankYouBtn = document.getElementById("closeThankYou");
    const goBackBtn = document.getElementById("goBackBtn");

    // Modal content containers
    const summaryBox = document.querySelector(".summary-box");
    const serviceList = document.getElementById("serviceList");
    const selectedServicesContainer = document.getElementById("selectedServices");
    const totalPriceElement = document.getElementById("totalPrice");
    const userSelectedServices = document.getElementById("userSelectedServices");
    const userTotalPrice = document.getElementById("userTotalPrice");

    // Close buttons
    const closeAppointmentModal = document.getElementById("closeAppointmentModal");
    const closeUserDetailsModal = document.getElementById("closeUserDetailsModal");

    // Function to open modal
    function openModal(modalName) {
        // Hide all modals first
        Object.values(modals).forEach(modal => {
            if (modal) modal.style.display = "none";
        });
        
        // Show the requested modal if it exists and isn't "none"
        if (modalName && modals[modalName]) {
            modals[modalName].style.display = "flex";
        }
    }

    // Open appointment summary modal when "Book Now" is clicked
    bookNowButtons.forEach(button => {
        button.addEventListener("click", function () {
            const bookingContainer = this.closest(".booking");
            openAppointmentSummary(bookingContainer.dataset.title, parseFloat(bookingContainer.dataset.price));
        });
    });

    function openAppointmentSummary(serviceName, price) {
        defaultService = { name: serviceName, price: price };
        selectedServices = [defaultService];
        totalPrice = price;
        updateSummaryBox();
        openModal("appointment");
    }

    function updateSummaryBox() {
        if (summaryBox) {
            summaryBox.innerHTML = selectedServices.map(service => 
                `<p>${service.name} - ₹${service.price}</p>`
            ).join('');
        }
    }

    // Add service button click handler
    if (addServiceBtn) {
        addServiceBtn.addEventListener("click", function () {
            openModal("addService");
            loadServiceOptions();
        });
    }

    function loadServiceOptions() {
        if (serviceList) {
            serviceList.innerHTML = "";
            bookNowButtons.forEach(button => {
                const booking = button.closest(".booking");
                const serviceName = booking.dataset.title;
                const servicePrice = parseFloat(booking.dataset.price);

                if (!selectedServices.some(s => s.name === serviceName)) {
                    const serviceOption = document.createElement("label");
                    serviceOption.innerHTML = `
                        <input type='checkbox' value='${serviceName}' data-price='${servicePrice}'>
                        ${serviceName} - ₹${servicePrice}
                    `;
                    serviceList.appendChild(serviceOption);
                    serviceList.appendChild(document.createElement("br"));
                }
            });
        }
    }

    // Continue service button click handler
    if (continueServiceBtn) {
        continueServiceBtn.addEventListener("click", function () {
            const selectedCheckboxes = document.querySelectorAll("#serviceList input:checked");
            selectedServices = [
                defaultService, 
                ...Array.from(selectedCheckboxes).map(checkbox => ({
                    name: checkbox.value,
                    price: parseFloat(checkbox.dataset.price)
                }))
            ];
            totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);
            openModal("final");
            updateFinalConfirmation();
        });
    }

    // Schedule appointment button click handler
    if (scheduleAppointmentBtn) {
        scheduleAppointmentBtn.addEventListener("click", function () {
            openModal("final");
            updateFinalConfirmation();
        });
    }

    function updateFinalConfirmation() {
        if (selectedServicesContainer && totalPriceElement) {
            selectedServicesContainer.innerHTML = selectedServices.map(service => 
                `<p>${service.name} - ₹${service.price}</p>`
            ).join('');
            totalPriceElement.innerText = `Total: ₹${totalPrice}`;
        }
    }

    // Confirm schedule button click handler
    if (confirmScheduleFinalBtn) {
        confirmScheduleFinalBtn.addEventListener("click", function () {
            openModal("userDetails");
            updateUserDetails();
        });
    }

    function updateUserDetails() {
        if (userSelectedServices && userTotalPrice) {
            userSelectedServices.innerHTML = selectedServices.map(service => 
                `<p>${service.name} - ₹${service.price}</p>`
            ).join('');
            userTotalPrice.innerText = `Total: ₹${totalPrice}`;
        }
    }

    // Go back button click handler
    if (goBackBtn) {
        goBackBtn.addEventListener("click", function () {
            openModal("appointment");
            updateSummaryBox();
        });
    }


    // Function to validate name (letters and spaces only, 2+ characters)
    function validateName(name) {
        const nameRegex = /^[a-zA-Z\s]{3,}$/;
        return nameRegex.test(name.trim());
    }

    // Function to validate contact (10-digit Indian phone number)
    function validateContact(contact) {
        const contactRegex = /^[6-9]\d{9}$/;
        return contactRegex.test(contact.trim());
    }

    // Function to validate email
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    }

    // Function to validate address (minimum 10 characters)
    function validateAddress(address) {
        return address.trim().length >= 10;
    }

    // Function to show error message for a field
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        field.style.borderColor = "red";
        const errorElement = document.getElementById(`${fieldId}Error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.color = "red";
        }
    }

    // Function to clear error message for a field
    function clearError(fieldId) {
        const field = document.getElementById(fieldId);
        field.style.borderColor = "";
        const errorElement = document.getElementById(`${fieldId}Error`);
        if (errorElement) {
            errorElement.textContent = "";
        }
    }

    // Add event listeners to clear errors when user starts typing
    document.getElementById("userName")?.addEventListener("input", function() {
        clearError("userName");
    });

    document.getElementById("userContact")?.addEventListener("input", function() {
        clearError("userContact");
    });

    document.getElementById("userEmail")?.addEventListener("input", function() {
        clearError("userEmail");
    });

    document.getElementById("userAddress")?.addEventListener("input", function() {
        clearError("userAddress");
    });

    // ======== END OF VALIDATION SECTION ======== //

    // MODIFY YOUR EXISTING proceedToPayBtn HANDLER TO INCLUDE VALIDATION
    if (proceedToPayBtn) {
        proceedToPayBtn.addEventListener("click", function () {
            // Get form values
            const userName = document.getElementById("userName").value;
            const userContact = document.getElementById("userContact").value;
            const userEmail = document.getElementById("userEmail").value;
            const userAddress = document.getElementById("userAddress").value;

            // Validate each field
            let isValid = true;

            // Name validation
            if (!userName) {
                showError("userName", "Name is required");
                isValid = false;
            } else if (!validateName(userName)) {
                showError("userName", "Please enter a valid name (Atleast 3 letters)");
                isValid = false;
            } else {
                clearError("userName");
            }

            // Contact validation
            if (!userContact) {
                showError("userContact", "Contact number is required");
                isValid = false;
            } else if (!validateContact(userContact)) {
                showError("userContact", "Please enter a valid 10-digit Indian phone number");
                isValid = false;
            } else {
                clearError("userContact");
            }

            // Email validation
            if (!userEmail) {
                showError("userEmail", "Email is required");
                isValid = false;
            } else if (!validateEmail(userEmail)) {
                showError("userEmail", "Please enter a valid email address");
                isValid = false;
            } else {
                clearError("userEmail");
            }

            // Address validation
            if (!userAddress) {
                showError("userAddress", "Address is required");
                isValid = false;
            } else if (!validateAddress(userAddress)) {
                showError("userAddress", "Address must be at least 10 characters");
                isValid = false;
            } else {
                clearError("userAddress");
            }


            if (isValid) {
            openModal("thankYou");
            
            // Here you would typically send the data to your server
            console.log("Appointment booked with details:", {
                services: selectedServices,
                totalPrice,
                userDetails: {
                    name: userName,
                    contact: userContact,
                    email: userEmail,
                    address: userAddress
                }
            });
        }
        });
    }

    // Close thank you modal button
    if (closeThankYouBtn) {
        closeThankYouBtn.addEventListener("click", function () {
            openModal("none");
            // Reset the form for next booking
            selectedServices = [];
            totalPrice = 0;
            defaultService = null;
            document.getElementById("userName").value = "";
            document.getElementById("userContact").value = "";
            document.getElementById("userEmail").value = "";
            document.getElementById("userAddress").value = "";
        });
    }

    // Cancel service button
    if (cancelServiceBtn) {
        cancelServiceBtn.addEventListener("click", function () {
            openModal("appointment");
        });
    }

    // Cancel user details button
    if (cancelUserDetailsBtn) {
        cancelUserDetailsBtn.addEventListener("click", function () {
            openModal("final");
        });
    }

    // Close appointment modal button
    if (closeAppointmentModal) {
        closeAppointmentModal.addEventListener("click", function () {
            openModal("none");
        });
    }

    // Close user details modal button
    if (closeUserDetailsModal) {
        closeUserDetailsModal.addEventListener("click", function () {
            openModal("none");
        });
    }
});





