document.addEventListener("DOMContentLoaded", function () {
    const appointmentModal = document.getElementById("appointmentModal");
    const addServiceModal = document.getElementById("addServiceModal");
    const finalModal = document.getElementById("finalModal");
    const bookNowButtons = document.querySelectorAll(".bookingBtn button");
    const addServiceBtn = document.getElementById("addServiceBtn");
    const cancelServiceBtn = document.getElementById("cancelService");
    const continueServiceBtn = document.getElementById("continueService");
    const summaryBox = document.querySelector(".summary-box");
    const serviceList = document.getElementById("serviceList");
    const selectedServices = document.getElementById("selectedServices");
    const totalPriceElement = document.getElementById("totalPrice");
    let selectedService = null;
    let selectedExtras = [];

    bookNowButtons.forEach(button => {
        button.addEventListener("click", function () {
            const bookingContainer = this.closest(".booking");
            selectedService = {
                title: bookingContainer.dataset.title,
                duration: bookingContainer.dataset.duration,
                price: parseInt(bookingContainer.dataset.price)
            };
            summaryBox.innerHTML = `<p>${selectedService.title}</p><p>${selectedService.duration}</p><p>₹${selectedService.price}</p>`;
            appointmentModal.style.display = "flex";
        });
    });

    addServiceBtn.addEventListener("click", function () {
        serviceList.innerHTML = "";
        document.querySelectorAll(".booking").forEach(booking => {
            if (booking.dataset.title !== selectedService.title) {
                serviceList.innerHTML += `<label><input type="checkbox" data-title="${booking.dataset.title}" data-price="${booking.dataset.price}"> ${booking.dataset.title} - ₹${booking.dataset.price}</label><br>`;
            }
        });
        appointmentModal.style.display = "none";
        addServiceModal.style.display = "flex";
    });

    continueServiceBtn.addEventListener("click", function () {
        selectedExtras = [];
        document.querySelectorAll("#serviceList input:checked").forEach(input => {
            selectedExtras.push({ title: input.dataset.title, price: parseInt(input.dataset.price) });
        });
        let totalPrice = selectedService.price;
        selectedServices.innerHTML = `<p>${selectedService.title} - ₹${selectedService.price}</p>`;
        selectedExtras.forEach(extra => {
            selectedServices.innerHTML += `<p>${extra.title} - ₹${extra.price}</p>`;
            totalPrice += extra.price;
        });
        totalPriceElement.textContent = totalPrice;
        addServiceModal.style.display = "none";
        finalModal.style.display = "flex";
    });



    cancelServiceBtn.addEventListener("click", function () {
        addServiceModal.style.display = "none";
        appointmentModal.style.display = "flex";
    });

    document.querySelectorAll(".close-appointment-modal").forEach(closeBtn => {
        closeBtn.addEventListener("click", function () {
            appointmentModal.style.display = "none";
            addServiceModal.style.display = "none";
            finalModal.style.display = "none";
        });
    });
});
