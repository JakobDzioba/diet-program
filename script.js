document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;

    document.getElementById('userGreeting').textContent = `Witaj, ${firstName} ${lastName}!`;

    document.getElementById('userForm').style.display = 'none';
});

document.getElementById('calorieForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseFloat(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const activity = parseFloat(document.getElementById('activity').value);

    const heightM = height / 100; // Convert height to meters

    let bmr;
    if (gender === 'male') {
        bmr = 66.5 + (13.75 * weight) + (5.003 * height) - (6.775 * age);
    } else {
        bmr = 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age);
    }

    const calorieNeeds = bmr * activity;

    document.getElementById('calorieResult').innerHTML = `Twoje dzienne zapotrzebowanie kaloryczne wynosi: <strong>${calorieNeeds.toFixed(2)} kcal</strong>`;

    // Obliczanie BMI
    const bmi = weight / (heightM * heightM);
    let bmiCategory;
    let healthRisk;

    if (bmi < 16.0) {
        bmiCategory = 'Wygłodzenie';
        healthRisk = 'Ryzyko chorób towarzyszących otyłości jest minimalne, ale zwiększony poziom wystąpienia innych problemów zdrowotnych.';
    } else if (bmi >= 16.0 && bmi < 17.0) {
        bmiCategory = 'Wychudzenie';
        healthRisk = 'Ryzyko chorób towarzyszących otyłości jest minimalne, ale zwiększony poziom wystąpienia innych problemów zdrowotnych.';
    } else if (bmi >= 17.0 && bmi < 18.5) {
        bmiCategory = 'Niedowaga';
        healthRisk = 'Ryzyko chorób towarzyszących otyłości jest minimalne, ale zwiększony poziom wystąpienia innych problemów zdrowotnych.';
    } else if (bmi >= 18.5 && bmi < 25.0) {
        bmiCategory = 'Pożądana masa ciała';
        healthRisk = 'Ryzyko chorób towarzyszących otyłości jest minimalne.';
    } else if (bmi >= 25.0 && bmi < 30.0) {
        bmiCategory = 'Nadwaga';
        healthRisk = 'Ryzyko chorób towarzyszących otyłości średnie.';
    } else if (bmi >= 30.0 && bmi < 35.0) {
        bmiCategory = 'Otyłość I stopnia';
        healthRisk = 'Ryzyko chorób towarzyszących otyłości jest wysokie.';
    } else if (bmi >= 35.0 && bmi < 40.0) {
        bmiCategory = 'Otyłość II stopnia (duża)';
        healthRisk = 'Ryzyko chorób towarzyszących otyłości jest bardzo wysokie.';
    } else {
        bmiCategory = 'Otyłość III stopnia (chorobliwa)';
        healthRisk = 'Ryzyko chorób towarzyszących otyłości jest ekstremalnie wysokie.';
    }

    document.getElementById('bmiResult').innerHTML = `Twoje BMI wynosi: <strong>${bmi.toFixed(2)}</strong> (${bmiCategory}). ${healthRisk}`;

    document.getElementById('dietGoal').style.display = 'block';
});

document.getElementById('goal').addEventListener('change', function() {
    const goal = document.getElementById('goal').value;
    if (goal === 'maintain') {
        document.getElementById('goalDetails').style.display = 'none';
        document.getElementById('mealCount').style.display = 'block';
    } else {
        document.getElementById('goalDetails').style.display = 'block';
    }
});

document.getElementById('calculateGoal').addEventListener('click', function() {
    const goal = document.getElementById('goal').value;
    const goalWeight = parseFloat(document.getElementById('goalWeight').value);
    const goalWeeks = parseFloat(document.getElementById('goalWeeks').value);

    const calorieResultText = document.getElementById('calorieResult').textContent;
    const calorieNeeds = parseFloat(calorieResultText.match(/[\d\.]+/)[0]);

    let finalCalories = calorieNeeds;

    if (goal === 'gain') {
        const extraCalories = (goalWeight * 7700) / (goalWeeks * 7);
        finalCalories += extraCalories;
        document.getElementById('finalCalorieResult').innerHTML = `Aby przytyć, musisz spożywać: <strong>${finalCalories.toFixed(2)} kcal</strong> dziennie.`;
    } else if (goal === 'lose') {
        const deficitCalories = (goalWeight * 7700) / (goalWeeks * 7);
        finalCalories -= deficitCalories;
        document.getElementById('finalCalorieResult').innerHTML = `Aby schudnąć, musisz spożywać: <strong>${finalCalories.toFixed(2)} kcal</strong> dziennie.`;
    } else {
        document.getElementById('finalCalorieResult').innerHTML = `Aby utrzymać wagę, musisz spożywać: <strong>${finalCalories.toFixed(2)} kcal</strong> dziennie.`;
    }

    document.getElementById('mealCount').style.display = 'block';
});

document.getElementById('calculateMeals').addEventListener('click', function() {
    const meals = parseInt(document.getElementById('meals').value);
    const finalCaloriesText = document.getElementById('finalCalorieResult').textContent;
    const finalCalories = parseFloat(finalCaloriesText.match(/[\d\.]+/)[0]);

    let mealDistribution = '';
    if (meals === 3) {
        const breakfast = 0.325 * finalCalories;
        const lunch = 0.4 * finalCalories;
        const dinner = 0.275 * finalCalories;
        mealDistribution = `<strong>Śniadanie:</strong> 32.5% - <strong>${breakfast.toFixed(2)} kcal</strong><br>
                            <strong>Obiad:</strong> 40% - <strong>${lunch.toFixed(2)} kcal</strong><br>
                            <strong>Kolacja:</strong> 27.5% - <strong>${dinner.toFixed(2)} kcal</strong>`;
    } else if (meals === 4) {
        const breakfast = 0.3 * finalCalories;
        const secondBreakfast = 0.1 * finalCalories;
        const lunch = 0.35 * finalCalories;
        const dinner = 0.25 * finalCalories;
        mealDistribution = `<strong>Śniadanie:</strong> 30% - <strong>${breakfast.toFixed(2)} kcal</strong><br>
                            <strong>II Śniadanie:</strong> 10% - <strong>${secondBreakfast.toFixed(2)} kcal</strong><br>
                            <strong>Obiad:</strong> 35% - <strong>${lunch.toFixed(2)} kcal</strong><br>
                            <strong>Kolacja:</strong> 25% - <strong>${dinner.toFixed(2)} kcal</strong>`;
    } else if (meals === 5) {
        const firstMeal = 0.25 * finalCalories;
        const secondMeal = 0.1 * finalCalories;
        const thirdMeal = 0.35 * finalCalories;
        const fourthMeal = 0.1 * finalCalories;
        const fifthMeal = 0.2 * finalCalories;
        mealDistribution = `<strong>Posiłek 1:</strong> 25% - <strong>${firstMeal.toFixed(2)} kcal</strong><br>
                            <strong>Śniadanie:</strong> 10% - <strong>${secondMeal.toFixed(2)} kcal</strong><br>
                            <strong>II Śniadanie:</strong> 35% - <strong>${thirdMeal.toFixed(2)} kcal</strong><br>
                            <strong>Obiad:</strong> 10% - <strong>${fourthMeal.toFixed(2)} kcal</strong><br>
                            <strong>Kolacja:</strong> 20% - <strong>${fifthMeal.toFixed(2)} kcal</strong>`;
    }

    document.getElementById('mealDistribution').innerHTML = mealDistribution;
});