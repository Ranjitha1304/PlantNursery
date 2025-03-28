
document.getElementById("search-input").addEventListener("keyup", function () {
    let query = this.value.toLowerCase().trim();
    let found = false;

    // Select all sections and their items
    let sections = [
        { section: document.querySelector(".plants"), items: document.querySelectorAll(".plant_wrapper") },
        { section: document.querySelector(".potsContainer"), items: document.querySelectorAll(".potsItem") },
        { section: document.querySelector(".seeds"), items: document.querySelectorAll(".seedItem") },
    ];

    // Function to filter items and control section visibility
    function filterItems(sectionObj) {
        let visible = false;
        sectionObj.items.forEach(item => {
            let itemName = item.getAttribute("data-name") || item.textContent.toLowerCase();
            if (itemName.includes(query)) {
                item.style.display = "block";
                visible = true;
                found = true;
            } else {
                item.style.display = "none";
            }
        });

        // Hide section if no items are visible
        sectionObj.section.style.display = visible ? "block" : "none";
    }

    // Apply filtering to each section
    sections.forEach(filterItems);

    // Show 'No Results Found' if nothing matches
    document.getElementById("no-results").style.display = found ? "none" : "block";
});
