var toggle = document.getElementById('toggle');
var foodForm = document.getElementById('foodForm');
var drinkForm = document.getElementById('drinkForm');
var mealSearchBtn = document.getElementById('mealSearchBtn');
var cocktailSearchBtn = document.getElementById('cocktailSearchBtn');
var mealTypeDropDown = document.getElementById('mealTypeDropDown');
var proteinTypeDropDown = document.getElementById('proteinTypeDropDown');
var cuisineTypeDropDown = document.getElementById('cuisineTypeDropDown');
var alcoholTypeDropDown = document.getElementById('alcoholTypeDropDown');
var searchResults = document.getElementById('searchResults')
var cocktailSearchResultsBody = document.getElementById('cocktailSearchResultsBody');
var cocktailRecipesResults = document.getElementById('cocktailRecipesResults');
var MealResultsGoBackBtn = document.getElementById('MealResultsGoBackBtn');
var CocktailResultsGoBackBtn = document.getElementById('CocktailResultsGoBackBtn')

function removeSearchDropdowns() {
  toggle.classList.add('hide');
  foodForm.classList.add('hide');
  drinkForm.classList.add('hide');
}



$(toggle).click(function(e) {
  userToggleOption = e.target.id;
  if (userToggleOption === "meals") {
    // Hide "drink form"
      drinkForm.classList.add('hide');    
    // Show "food-form"
    foodForm.classList.remove('hide');
  } else {
      // Hide "food form"
      foodForm.classList.add('hide');
      // Show "food-form"
      drinkForm.classList.remove('hide');
  }
})



let mealType = "";
let proteinType = "";
let cusineType = "";
let alcoholType = "";

//=======================================================================================
// GET USER INPUT FROM MEAL TYPE DROP DOWN MENU
// GET USER INPUT FROM MEAL TYPE DROP DOWN MENU
$(mealTypeDropDown).click(function(e) {
  mealType = e.target.id;
  if (mealType == "snack" || mealType == "teatime") {
    proteinDropdownDiv.classList.add('hide');
  } else {
    proteinDropdownDiv.classList.remove('hide');
  }
})
// GET USER INPUT FROM PROTEIN TYPE DROP DOWN MENU
$(proteinTypeDropDown).click(function(e) {
  proteinType = e.target.id;
})
// GET USER INPUT FROM CUISINE TYPE DROP DOWN MENU
$(cuisineTypeDropDown).click(function(e) {
  cusineType = e.target.id;
})
//=======================================================================================


// Meal Recipe Data API calls
var getMealRecipes = function () {
  var mealAPI =
    "https://api.edamam.com/search?q=+" +proteinType +"&app_id=bb8fbaaa&app_key=5f7663bd4a1e69d006360434dbeda6ff&from=0&to=3&calories=591-722&health=alcohol-free&mealType=" +mealType +"&cuisineType=" +cusineType;

  fetch(mealAPI)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          formatMealData(data);
        });
      } else {
        alert("Error" + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Meal API");
    });
};

// Formats the Meal Recipe Data
function formatMealData(data) {
  mealData = data;
  recipeNumber = mealData.hits.length;
  console.log("Number of Food Recipes Returned from API call: " + recipeNumber);
  removeSearchDropdowns();

  for (i = 0; i < recipeNumber; i++) {
    recipeLabel = mealData.hits[i].recipe.label; 
    console.log(recipeLabel);
    recipeSourceName = mealData.hits[i].recipe.source; 
    console.log(recipeSourceName);
    recipeImage = mealData.hits[i].recipe.image; 
    console.log(recipeImage);
    recipeInstructionsLink = mealData.hits[i].recipe.url;
    console.log(recipeInstructionsLink);
    foodSearchResultsBody.classList.remove('hide');
    showFoodCards(recipeImage, recipeLabel, recipeSourceName, recipeInstructionsLink);
  }
}

// Adds food recipe data to HTML
function showFoodCards(recipeImage, recipeLabel, recipeSourceName, recipeInstructionsLink) {
  searchResults.innerHTML += `
  <div class="card" style="width: 18rem;">
  <img src="${recipeImage}" class="card-img-top" alt="image of desired food item">
  <div class="card-body food-result">
      <h5 class="card-title">${recipeLabel}</h5>
      <p class="card-text">${recipeSourceName}</p>
      <a href="${recipeInstructionsLink}" target="_blank" class="btn btn-primary recipeButton">Go To Recipe</a>
</div>
  `
}

// GET USER INPUT FROM ALCOHOL TYPE DROP DOWN MENU
$(alcoholTypeDropDown).click(function(e) {
  alcoholType = e.target.id;
})

// Cocktail Recipe Data API calls
var getCocktailAPIdata = function () {
  var cocktailAPI1 = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + alcoholType;

  fetch(cocktailAPI1)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          formatDrinkData(data);
        });
      } else {
        alert("Error" + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Meal API");
    });
};


// Formats the Cocktail Recipe Data
function formatDrinkData(data) {
  cockTailData = data;
  removeSearchDropdowns();
  cocktailSearchResultsBody.classList.remove('hide');

  for (i=0; i < 3; i++) {
    cocktailName = cockTailData.drinks[i].strDrink;
    cocktailImage = cockTailData.drinks[i].strDrinkThumb;
    cocktailID = cockTailData.drinks[i].idDrink;                          
    getCocktailRecipeData(cocktailID);
  }                     
}

// Gets the cocktail recipe ingredients and instructions
function getCocktailRecipeData (drinkID) {
  var cocktailAPI2 = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+drinkID;

  fetch(cocktailAPI2)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          formatCocktailRecipeData(data);
        });
      } else {
        alert("Error" + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Meal API");
    });
};


ingredients = [];
measurements = [];

// Formats the cocktail recipe ingredients and instruction data ---- Adds the cocktail recipe to HTML
function formatCocktailRecipeData(data) {
  cocktailRecipe = data;
  //=================================================================
  cocktailName = cocktailRecipe.drinks[0].strDrink;
  cocktailImage = cocktailRecipe.drinks[0].strDrinkThumb;
  meas1 =  cocktailRecipe.drinks[0].strMeasure1
  meas2 =  cocktailRecipe.drinks[0].strMeasure2
  meas3 =  cocktailRecipe.drinks[0].strMeasure3
  meas4 =  cocktailRecipe.drinks[0].strMeasure4
  meas5 =  cocktailRecipe.drinks[0].strMeasure5
  meas6 =  cocktailRecipe.drinks[0].strMeasure6
  meas7 =  cocktailRecipe.drinks[0].strMeasure7
  meas8 =  cocktailRecipe.drinks[0].strMeasure8
  meas9 =  cocktailRecipe.drinks[0].strMeasure9
  meas10 =  cocktailRecipe.drinks[0].strMeasure10
  instructions = data.drinks[0].strInstructions;

  ingredients = [];
  measurements = [];

  ingr1 = cocktailRecipe.drinks[0].strIngredient1;
  if (ingr1 == null) {ingr1 = ""};
  if (meas1 == null) {meas1 = ""}
  ingr2 = cocktailRecipe.drinks[0].strIngredient2;
  if (ingr2 == null) {ingr2 = ""};
  if (meas2 == null) {meas2 = ""}
  ingr3 = cocktailRecipe.drinks[0].strIngredient3;
  if (ingr3 == null) {ingr3 = ""};
  if (meas3 == null) {meas3 = ""}
  ingr4 = cocktailRecipe.drinks[0].strIngredient4;
  if (ingr4 == null) {ingr4 = ""};
  if (meas4 == null) {meas4 = ""}
  ingr5 = cocktailRecipe.drinks[0].strIngredient5;
  if (ingr5 == null) {ingr5 = ""};
  if (meas5 == null) {meas5 = ""}
  ingr6 = cocktailRecipe.drinks[0].strIngredient6;
  if (ingr6 == null) {ingr6= ""};
  if (meas6 == null) {meas6 = ""}
  ingr7 = cocktailRecipe.drinks[0].strIngredient7;
  if (ingr7 == null) {ingr7 = ""};
  if (meas7 == null) {meas7 = ""}
  ingr8 = cocktailRecipe.drinks[0].strIngredient8;
  if (ingr8 == null) {ingr8 = ""};
  if (meas8 == null) {meas8 = ""}
  ingr9 = cocktailRecipe.drinks[0].strIngredient9;
  if (ingr9 == null) {ingr9 = ""};
  if (meas9 == null) {meas9 = ""}
  ingr10 = cocktailRecipe.drinks[0].strIngredient10;
  if (ingr10== null) {ingr10 = ""};
  if (meas10 == null) {meas10 = ""}

    cocktailRecipesResults.innerHTML += `
    <div class="card bg-light m-4" style="width: 18rem">
      <div class="card-body">
        <h2 class="card-title text-center">${cocktailName}</h2>
        <a href="#"><img src="${cocktailImage}" class="card-img rounded mx-auto d-block" alt="Responsive image of cocktail"/></a>
      </div>
    <div>

    <h4>Ingredients:</h4>
          ${meas1} ${ingr1} <br>
          ${meas2} ${ingr2} <br>
          ${meas3} ${ingr3} <br>
          ${meas4} ${ingr4} <br>
          ${meas5} ${ingr5} <br>
          ${meas6} ${ingr6} <br>
          ${meas7} ${ingr7} <br>
          ${meas8} ${ingr8} <br>
          ${meas9} ${ingr9} <br>
          ${meas10} ${ingr10} <br>

    <h4>Instructions:</h4>
      <p id="instructionsSection1">${instructions}</p>
  </div>

    <!-- Save Recipe Button -->
    <button type="button" class="btn my-btn mb-4">Save Recipe</button>
          </div>
        </div>
    </div>
`
}

function reloadSearchPage() {
  location.reload();
}


// EVENT LISTENERS
//================================================================================
mealSearchBtn.addEventListener('click', getMealRecipes)
cocktailSearchBtn.addEventListener('click', getCocktailAPIdata)
//================================================================================
