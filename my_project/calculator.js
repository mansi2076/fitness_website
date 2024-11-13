document.getElementById('calculate-button').addEventListener('click', calculateFitness);

function calculateFitness() {
    // Getting form values
    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const heightFeet = parseFloat(document.getElementById('height-feet').value);
    const heightInches = parseFloat(document.getElementById('height-inches').value);
    const sex = document.querySelector('input[name="sex"]:checked');
    const activity = parseFloat(document.getElementById('activity').value);

    // Check if any field is not filled correctly
    if (isNaN(age) || isNaN(weight) || isNaN(heightFeet) || isNaN(heightInches) || !sex || isNaN(activity)) {
        alert("Please fill out all fields correctly.");
        return;
    }

    // Height calculation in cm
    const height = (heightFeet * 30.48) + (heightInches * 2.54);

    // BMR and average weight calculation
    let bmr, averageWeight;
    if (sex.value === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        averageWeight = 50 + 0.91 * (height - 152.4);
    } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        averageWeight = 45.5 + 0.91 * (height - 152.4);
    }

    // Daily calories calculation
    const dailyCalories = bmr * activity;

    // Display results
    document.getElementById('average-weight-result').innerText = `Your average weight should be around ${averageWeight.toFixed(2)} kg.`;
    document.getElementById('calories-result').innerText = `To maintain your current weight, you should consume around ${dailyCalories.toFixed(2)} calories per day.`;

    // Show success message
    showSuccessMessage("Calculation completed successfully.");
}

function showSuccessMessage(message) {
    const feedback = document.getElementById('feedback');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    successMessage.innerText = message;
    successMessage.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    feedback.classList.remove('hidden');
}

function showErrorMessage(message) {
    const feedback = document.getElementById('feedback');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    errorMessage.innerText = message;
    errorMessage.classList.remove('hidden');
    successMessage.classList.add('hidden');
    feedback.classList.remove('hidden');
}
