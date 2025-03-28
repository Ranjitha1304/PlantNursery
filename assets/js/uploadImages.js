document.getElementById("imageUpload").addEventListener("change", function(event) {
    let file = event.target.files[0];
    let allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    let errorElement = document.querySelector(".fileError");
    let previewImage = document.getElementById("previewImage");

    // Clear previous errors
    errorElement.textContent = "";

    if (file) {
        // Check file type
        if (!allowedTypes.includes(file.type)) {
            errorElement.textContent = "Invalid file type! Please upload JPG or PNG images only.";
            event.target.value = ""; // Reset file input
            return;
        }

        // Show preview
        let reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            // previewImage.style.display = "block"; // Show preview
        };
        reader.readAsDataURL(file);
    }
});