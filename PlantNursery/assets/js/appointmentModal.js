document.addEventListener("DOMContentLoaded", function () {
    const appointmentModal = document.getElementById("appointmentModal");
    const bookNowButtons = document.querySelectorAll(".bookingBtn button");
    const closeAppointmentModal = document.querySelector(".close-appointment-modal");

    appointmentModal.style.display = "none"; 

    // Open Appointment Modal
    bookNowButtons.forEach(button => {
        button.addEventListener("click", function () {
            appointmentModal.style.display = "flex";
        });
    });

    // Close Appointment Modal
    closeAppointmentModal.addEventListener("click", function () {
        appointmentModal.style.display = "none";
    });

    // Close Modal When Clicking Outside the Modal Content
    window.addEventListener("click", function (event) {
        if (event.target === appointmentModal) {
            appointmentModal.style.display = "none";
        }
    });
});
