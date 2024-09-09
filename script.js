let calculationCompleted = false; // Flag to track if calculation is completed

function calculatePizzas() {
    const attendeesInput = document.getElementById('attendees');
    const pizzaTypeInput = document.getElementById('pizzaType');
    const hoursDebuggingInput = document.getElementById('hoursDebugging');
    const resultDiv = document.getElementById('result');
    const emailPromptSection = document.getElementById('emailPromptSection');
    const progressBar = document.getElementById('progressBar');
    const progressLabel = document.getElementById('progressLabel');

    // Reset progress and calculation flag
    progressBar.style.width = '0%';
    progressLabel.innerHTML = '';
    calculationCompleted = false; // Mark calculation as not yet completed

    // Show progress bar and start fake loading process
    const loadingSteps = [
        "Analyzing hunger coefficients based on debugging hours...",
        "Contacting Gilfoyle’s pizza orchestration server...",
        "Running middle-out slice allocation algorithm...",
        "Optimizing pizza cluster for maximum throughput...",
        "Spinning up pizza instances on AWS...",
        "Finalizing pizza load balancer configuration...",
        "Pizzas deployed. Load balancer is slicing evenly across all clusters."
    ];

    let stepIndex = 0;

    // Function to update progress bar and show messages
    function updateProgress() {
        if (stepIndex < loadingSteps.length) {
            let percentage = (stepIndex + 1) * 15; // Each step increases by 15%
            if (percentage > 75 && percentage < 100) {
                percentage = 75; // Stick at 75% for dramatic effect
            }
            progressBar.style.width = `${percentage}%`; // Update the width based on step
            progressLabel.innerHTML = loadingSteps[stepIndex]; // Show loading message
            stepIndex++;

            // Stick at 75% for a bit longer
            if (percentage === 75) {
                setTimeout(updateProgress, 1500); // Delay longer when stuck at 75%
            } else {
                setTimeout(updateProgress, 500); // Normal delay between steps
            }
        } else {
            // Jump to 110% for fun once the last step is complete
            progressBar.style.width = '110%';
            progressLabel.innerHTML = "Pizza deployment exceeded expectations. You are now 110% ready to eat! 🍕🎉";
            completeCalculation(); // Call the complete calculation function
        }
    }

    // Start fake loading process
    updateProgress();

    function completeCalculation() {
        // Get user input for hours of debugging
        const hoursDebugging = parseInt(hoursDebuggingInput.value);
        const hungerCoefficient = hoursDebugging * 2; // Each person consumes 2 slices per hour of debugging

        let attendees = parseInt(attendeesInput.value);
        let totalSlicesNeeded = attendees * hungerCoefficient; // Slices needed per attendee based on debugging hours
        let pizzasRequired;

        const pizzaType = pizzaTypeInput.value;

        // Base number of slices per NY pizza
        const slicesPerPizza = 8;
        let sliceEquivalency = 1; // Default is NY Style pizza where each slice = 1 slice

        // Adjust slice equivalency based on pizza type
        switch (pizzaType) {
            case "1": // NY Pizza
                sliceEquivalency = 1;
                break;
            case "0.5": // Detroit Pizza
                sliceEquivalency = 1.5; // Each slice is more filling
                break;
            case "0.6": // Chicago Pizza
                sliceEquivalency = 1.7; // Each slice is even more filling
                break;
            case "2": // California Pizza
                sliceEquivalency = 0.75; // Less filling slices
                break;
            case "100": // Blockchain Pizza
                sliceEquivalency = Math.random() > 0.5 ? 0.1 : 2; // Random worth: either almost nothing or a lot
                break;
            case "3": // Hot Pockets
                pizzasRequired = attendees * hoursDebugging; // Each person needs 1 Hot Pocket per hour
                resultDiv.innerHTML = `<blockquote><p>You need <strong>${pizzasRequired}</strong> Hot Pocket(s) to feed <strong>${attendees}</strong> attendees for <strong>${hoursDebugging} hours</strong> of debugging. Hot Pockets: like server downtime—unexpected and regrettable. 🥵</p></blockquote>`;
                calculationCompleted = true; // Mark as completed
                return;
            case "cloud": // Cloud Pizza
                resultDiv.innerHTML = `<blockquote><p>Cloud Pizza can feed any number of attendees for any duration. Like the cloud, it auto-scales to feed everyone, but the charges will be just as unpredictable! ☁️🍕</p></blockquote>`;
                calculationCompleted = true; // Mark as completed
                return;
            case "pineapple": // WiFi Pineapple Pizza
                resultDiv.innerHTML = `<blockquote><p>WiFi Pineapple Pizza is highly divisive! Loved by some for its tangy, tropical flavor, but beware—it might just capture all your taste buds without you even realizing it. 🍍📡🍕</p></blockquote>`;
                calculationCompleted = true; // Mark as completed
                return;
        }

        // Calculate the number of slices each pizza provides, based on equivalency
        const adjustedSlicesPerPizza = slicesPerPizza * sliceEquivalency;
        pizzasRequired = Math.ceil(totalSlicesNeeded / adjustedSlicesPerPizza);

        // Special humor for blockchain pizza
        if (pizzaType === "100") {
            resultDiv.innerHTML = `<blockquote><p>You need <strong>${pizzasRequired}</strong> Blockchain Pizza(s) for <strong>${attendees}</strong> attendees. The value of each slice fluctuates wildly—one slice might change the world, while the next one could just crash your appetite. 🍕💸💥</p></blockquote>`;
            calculationCompleted = true; // Mark as completed
            return;
        }

        // Humor based on calculated pizzas required
        let humorMessage = getHumorMessage(pizzasRequired);

        resultDiv.innerHTML = `<blockquote><p>You need <strong>${pizzasRequired}</strong> pizza(s) for <strong>${attendees}</strong> attendees, adjusted for <strong>${hoursDebugging} hours</strong> of debugging. Using <strong>${pizzaTypeInput.options[pizzaTypeInput.selectedIndex].text}</strong>.</p><p>${humorMessage}</p></blockquote>`;

        // More detailed report
        window.calculationResult = `Pizza Calculation Report\n\nNumber of Attendees: ${attendees}\nSelected Pizza Style: ${pizzaTypeInput.options[pizzaTypeInput.selectedIndex].text}\nSlices Per Pizza: ${adjustedSlicesPerPizza}\nTotal Pizzas Required: ${pizzasRequired}\nHours Debugging: ${hoursDebugging}\n\n${humorMessage}`;
        calculationCompleted = true; // Mark calculation as completed
    }
}

// Function for displaying toast notifications
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = "toast show";
    setTimeout(() => {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}

// Download the pizza report as a text file
function downloadReport() {
    if (!calculationCompleted || !window.calculationResult) {
        showToast("Please perform a calculation first!");
        return;
    }

    const blob = new Blob([window.calculationResult], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Pizza_Calculation_Report.txt';
    a.click();
    URL.revokeObjectURL(url); // Clean up the URL object
}

// Add humor based on pizza count
function getHumorMessage(pizzasRequired) {
    if (pizzasRequired >= 42) {
        return "You've reached Pied Piper-level scaling! Contact our Enterprise Pizza Sales Team for multi-cluster pizza solutions, featuring pizza load balancing, distributed slices, and fault-tolerant toppings! 🍕📞";
    } else if (pizzasRequired > 20 && pizzasRequired < 42) {
        return "Caution: Pizza overload detected! You’re approaching the Hooli compression limit. Prepare for mass consumption. Consider upgrading to Pizza++ for enhanced slice delivery and reduced latency. 🍕🛠️";
    } else if (pizzasRequired > 10) {
        return "Wow, that’s a serious pizza cluster! Make sure to optimize your pizza slice distribution or face serious downtime. Remember, you can always offload some slices to the cloud. ☁️🍕";
    } else if (pizzasRequired > 5) {
        return "That’s a respectable amount of pizza. Ensure your horizontal slice scaling strategy is on point, and monitor your pizza logs closely for signs of impending food coma. 📊🍕";
    } else if (pizzasRequired > 3) {
        return "Looks like a solid order, but make sure to account for burst pizza demands during peak debugging times. For high-availability pizza service, consider a multi-zone pizza distribution strategy. 🍕🔄";
    } else if (pizzasRequired === 1) {
        return "Just one pizza? That’s like running a production server on a Raspberry Pi—light, efficient, but might not handle the full load! Consider adding redundancy with a second pizza. 🎛️🍕";
    } else {
        return "Minimal pizza order detected. For proper disaster recovery, consider at least doubling your order to avoid slice shortages during critical phases of debugging. 📦🍕";
    }
}
