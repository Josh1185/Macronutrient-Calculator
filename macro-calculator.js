const ageInput = document.getElementById("age-input");
const genderInput = document.getElementById("gender-input");
const heightFtInput = document.querySelector(".height-ft-input");
const heightInInput = document.querySelector(".height-in-input");
const weightInput = document.getElementById("weight-input");
const activityLevelInput = document.getElementById("activity-level-input");
const goalInput = document.getElementById("goals-input");
const calculateBtn = document.getElementById("calc-btn");
const outputDisplayToggle = document.querySelector(".output-section");
const outputContent = document.querySelector(".output-content");
const outputContent2 = document.getElementById("output-2");
const outputContent3 = document.getElementById("output-3");

outputDisplayToggle.style.display = 'none';

function cleanInput(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, '');
}

function checkInputError(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

let isError = false;

function handleNumbers(input) {
  if (checkInputError(cleanInput(input))) {
    isError = true;
    alert(`Invalid Input: ${cleanInput(input)}`);
    return;
  }

  return parseInt(cleanInput(input));
}

function calculateAndDisplay() {
  const age = handleNumbers(ageInput.value);
  const gender = genderInput.value;
  const heightFt = handleNumbers(heightFtInput.value);
  const heightIn = handleNumbers(heightInInput.value);
  const weight = handleNumbers(weightInput.value);
  const activityLevel = activityLevelInput.value;
  const goal = goalInput.value;

  // Convert ft to in
  const totalHeightIn = heightIn + (heightFt * 12);
  
  // Calculate BMR
  let bmr = 0;
  if (gender === 'male') {
    bmr = 66 + (6.23 * weight) + (12.7 * totalHeightIn) - (6.8 * age);
  } else if (gender === 'female') {
    bmr = (655 + ((4.35 * weight) + (4.7 * totalHeightIn))) - (4.7 * age);
  }

  // Calculate TDEE
  let tdee = 0;
  switch (activityLevel) {
    case "sedentary": tdee = bmr * 1.2; break;
    case "light": tdee = bmr * 1.375; break;
    case "moderate": tdee = bmr * 1.55; break;
    case "very": tdee = bmr * 1.725; break;
    case "extremely": tdee = bmr * 1.9; break;
  }

  // Calculate Macro Breakdown Based on Goal
  let calorieIntake;
  let proteinRatio;
  let carbRatio;
  let fatRatio;

  switch (goal) {
    case "weight-loss":
      calorieIntake = tdee * 0.80;
      proteinRatio  = 0.40;
      carbRatio = 0.35;
      fatRatio = 0.25;
      break;
    case "maintenance":
      calorieIntake = tdee;
      proteinRatio = 0.30;
      carbRatio = 0.40;
      fatRatio = 0.30;
      break;
    case "muscle-gain":
      calorieIntake = tdee * 1.20;
      proteinRatio = 0.35;
      carbRatio = 0.45;
      fatRatio = 0.20;
      break;
  }

  const proteinCals = calorieIntake * proteinRatio;
  const proteinGrams = Math.round(proteinCals / 4);
  const carbCals = calorieIntake * carbRatio;
  const carbGrams = Math.round(carbCals / 4);
  const fatCals = calorieIntake * fatRatio;
  const fatGrams = Math.round(fatCals / 9);

  if (isError) {
    outputDisplayToggle.style.display = 'none';
    isError = false;
    return;
  }

  outputContent.innerHTML = `
    <h3>Macros:</h3>
    <p id="protein-output"><i>Protein:</i> <span class="output-num">${proteinGrams}</span>g</p>
    <p id="carb-output"><i>Carbs:</i> <span class="output-num">${carbGrams}</span>g</p>
    <p id="fat-output"><i>Fats:</i> <span class="output-num">${fatGrams}</span>g</p>
  `;

  outputContent2.innerHTML = `
    <h3>Macro Calories:</h3>
    <p><i>Protein:</i> <span class="output-num">${Math.round(proteinCals)}</span> calories</p>
    <p><i>Carbs:</i> <span class="output-num">${Math.round(carbCals)}</span> calories</p>
    <p><i>Fats:</i> <span class="output-num">${Math.round(fatCals)}</span> calories</p>
  `;

  outputContent3.innerHTML = `
    <h3>Calorie Breakdown:</h3>
    <p><i>BMR:</i> <span class="output-num">${Math.round(bmr)}</span> calories</p>
    <p><i>TDEE:</i> <span class="output-num">${Math.round(tdee)}</span> calories</p>
    <p><i>Calories:</i> <span class="output-num">${Math.round(calorieIntake)}</span> calories</p>
  `;

  outputDisplayToggle.style.display = 'flex';
}

const form = document.querySelector('.macro-calculator');
form.addEventListener('submit', (e) => {
  e.preventDefault();
});

calculateBtn.addEventListener('click', () => {
  if (ageInput.value === '') {
    alert('Please fill in your age.');
    return;
  } else if (heightFtInput.value === '') {
    alert('Please fill in your height (feet).');
    return;
  } else if (heightInInput.value === '') {
    alert('Please fill in your height (inches).');
    return;
  } else if (weightInput.value === '') {
    alert('Please fill in your weight.');
    return;
  }
  // Make sure all inputs are in range
  else if (Number(ageInput.value) < 18 || Number(ageInput.value) > 80) {
    alert(`Age: ${ageInput.value} is out of bounds.`);
    return;
  } 
  else if (Number(heightFtInput.value) > 8 || Number(heightFtInput.value) < 4) {
    alert(`Height(feet): ${heightFtInput.value} is out of bounds.`);
    return;
  } 
  else if (Number(heightInInput.value) > 11 || Number(heightInInput.value) < 0) {
    alert(`Height(inches): ${heightInInput.value} is out of bounds.`);
    return;
  } 
  else if (Number(weightInput.value) > 600 || Number(weightInput.value) < 60) {
    alert(`Weight: ${weightInput.value} is out of bounds.`);
    return;
  }
  else {
    calculateAndDisplay();
  }
});