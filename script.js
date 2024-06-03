// Function to fetch a random meal
function fetchRandomMeal() {
    return fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then(response => response.json())
      .then(data => data.meals[0])
      .catch(error => {
        console.error(error);
        return null;
      });
  }
  
  // Function to fetch multiple random meals
  async function fetchRandomMeals(count) {
    const meals = [];
    for (let i = 0; i < count; i++) {
      const meal = await fetchRandomMeal();
      if (meal) {
        meals.push(meal);
      }
    }
    return meals;
  }
  
  // Function to display the random meals in a section with a heading
  async function displayRandomMeals() {
    const meals = await fetchRandomMeals(4); // Fetch 8 random meals
    const mealContainer = document.getElementById('random-meal');
    mealContainer.innerHTML = ''; // Clear previous meals
  
    const heading = document.createElement('h2');
    heading.textContent = 'Random Meals';
    mealContainer.appendChild(heading);
  
    meals.forEach((meal, index) => {
      const mealDiv = document.createElement('div');
      mealDiv.className = 'meal-container';
  
      const mealImage = document.createElement('img');
      mealImage.src = meal.strMealThumb;
      mealImage.addEventListener('click', () => {
        showIngredientsModal(meal);
      });
      mealDiv.appendChild(mealImage);
  
      const mealName = document.createElement('p');
      mealName.textContent = meal.strMeal;
      mealDiv.appendChild(mealName);
  
      mealContainer.appendChild(mealDiv);
  
      if ((index + 1) % 4 === 0) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        mealContainer.appendChild(rowDiv);
      }
    });
  }
  
  // Function to display the ingredients of a meal in a modal
  function showIngredientsModal(meal) {
    const modalContent = document.getElementById('meal-recipe');
    modalContent.innerHTML = ''; // Clear previous content
  
    const mealName = document.createElement('h1');
    mealName.textContent = meal.strMeal;
    modalContent.appendChild(mealName);
  
    const ingredientsHeader = document.createElement('h4');
    ingredientsHeader.textContent = 'Ingredients';
    modalContent.appendChild(ingredientsHeader);
  
    const ingredientsList = document.createElement('ul');
    ingredientsList.style.listStyleType = 'none';
    modalContent.appendChild(ingredientsList);
  
    // Loop through ingredients and measures
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        const listItem = document.createElement('li');
        listItem.textContent = `${ingredient} - ${measure}`;
        ingredientsList.appendChild(listItem);
      }
    }
  
    // Show the modal content
    modalContent.style.display = 'block';
  }
  
  // Event listener for closing the modal
  document.getElementById('meal-recipe').addEventListener('click', () => {
    document.getElementById('meal-recipe').style.display = 'none';
  });
  
  // Function to fetch meals by category
  function fetchMealsByCategory(category) {
    return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then(response => response.json())
      .then(data => data.meals)
      .catch(error => {
        console.error(error);
        return null;
      });
  }
  
  // Function to display meals based on search input
  async function searchMeals(category) {
    const meals = await fetchMealsByCategory(category);
    const searchResultContainer = document.getElementById('search-result');
    const notFoundContainer = document.getElementById('notfound');
  
    if (!meals || meals.length === 0) {
      searchResultContainer.innerHTML = '';
      notFoundContainer.innerHTML = '<p>No meals found</p>';
      return;
    }
  
    notFoundContainer.innerHTML = ''; // Clear previous not found message
    searchResultContainer.innerHTML = ''; // Clear previous search results
  
    const heading = document.createElement('h2');
    heading.textContent = `Meals in Category: ${category}`;
    searchResultContainer.appendChild(heading);
  
    meals.forEach(meal => {
      const mealDiv = document.createElement('div');
      mealDiv.className = 'meal-container';
  
      const mealImage = document.createElement('img');
      mealImage.src = meal.strMealThumb;
      mealImage.addEventListener('click', () => {
        showIngredientsModal(meal);
      });
      mealDiv.appendChild(mealImage);
  
      const mealName = document.createElement('p');
      mealName.textContent = meal.strMeal;
      mealDiv.appendChild(mealName);
  
      searchResultContainer.appendChild(mealDiv);
    });
  }
  
  // Event listener for search input
  document.getElementById('search-btn').addEventListener('input', (event) => {
    const query = event.target.value.trim();
    if (query) {
      searchMeals(query);
    } else {
      document.getElementById('search-result').innerHTML = '';
      document.getElementById('notfound').innerHTML = '';
    }
  });
  
  // Display random meals on page load
  displayRandomMeals();
  