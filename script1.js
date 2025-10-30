"user strict";
console.clear();

var root = document.querySelector(":root");
function spotlight(e){
    root.style.setProperty("--x", e.pageX + "px");
    root.style.setProperty("--y", e.pageY + "px");
}

window.addEventListener("pointermove", spotlight);
window.addEventListener("pointerdown", spotlight);

// Runaway No Button
const noButton = document.querySelector(".noBtn");
const card = document.querySelector(".card");
const buffer = 100;

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const noButtonRect = noButton.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const noButtonX = noButtonRect.left + noButtonRect.width/2;
    const noButtonY = noButtonRect.top + noButtonRect.height/2;

    const distanceX = mouseX - noButtonX;
    const distanceY = mouseY - noButtonY;
    const distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));

    if (distance < buffer) {
        let newX = noButton.offsetLeft + (distanceX > 0 ? -50 : 50);
        
        // Constrain the "No" button within the card's boundaries
        if (newX < 0) {
            newX = 0;
        }
        if (newX > cardRect.width - noButtonRect.width) {
            newX = cardRect.width - noButtonRect.width;
        }

        noButton.style.transform = `translateX(${newX}px)`;

        // Clear the previous timeout if the button is moved again
        clearTimeout(timeoutId);
    } 
    else {
        // Set a timeout to return the button to its original position
        timeoutId = setTimeout(() => {
            noButton.style.transform = `translateX(0px)`;
        }, 3000);
    }
});

document.querySelector(".yesBtn").addEventListener("click", () => {
    const popup = document.getElementById("popup");
    popup.style.display = "block";
    
    // Optionally, hide the popup after some time
    setTimeout(() => {
        popup.style.display = "none";
    }, 5000); // Hide after 5 seconds (adjust as needed)
});
