document.addEventListener("DOMContentLoaded", function() {
    // This function runs when the DOM is fully loaded

    // Your long paragraph content
    const longParagraph = "Hello! My Name is Noah and I am an aspiring data professional Currently working as a Data Fellow for BCSTAT, ";

    // Get the bio-container element
    var bioContainer = document.getElementById("bio-container");

    // Set the innerHTML of the bio-container with the long paragraph
    bioContainer.innerHTML = longParagraph;
});