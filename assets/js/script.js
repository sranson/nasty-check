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
$(mealTypeDropDown).click(function(e) {
  mealType = e.target.id;
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


// Meal Data API calls
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

function showFoodCards(recipeImage, recipeLabel, recipeSourceName, recipeInstructionsLink) {
  searchResults.innerHTML += `
  <div class="card" style="width: 18rem;">
  <img src="${recipeImage}" class="card-img-top" alt="image of desired food item">
  <div class="card-body food-result">
      <h5 class="card-title">${recipeLabel}</h5>
      <p class="card-text">${recipeSourceName}</p>
      <a href="${recipeInstructionsLink}" target="_blank" class="btn btn-primary recipeButton">Go To Recipe</a>
  </div>
</div>
  `
}

// GET USER INPUT FROM ALCOHOL TYPE DROP DOWN MENU
$(alcoholTypeDropDown).click(function(e) {
  alcoholType = e.target.id;
})


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



function formatDrinkData(data) {
  cockTailData = data;
  removeSearchDropdowns();
  cocktailSearchResultsBody.classList.remove('hide');

  for (i=0; i < 5; i++) {
    cocktailName = cockTailData.drinks[i].strDrink;
    cocktailImage = cockTailData.drinks[i].strDrinkThumb;
    cocktailID = cockTailData.drinks[i].idDrink;                          
    getCocktailRecipeData(cocktailID);
  }                     
}


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

function formatCocktailRecipeData(data) {
  cocktailRecipe = data;
  //=================================================================
  cocktailName = cocktailRecipe.drinks[0].strDrink;
  cocktailImage = cocktailRecipe.drinks[0].strDrinkThumb;
  ingr1 = cocktailRecipe.drinks[0].strIngredient1;
  ingr2 = cocktailRecipe.drinks[0].strIngredient2;
  ingr3 = cocktailRecipe.drinks[0].strIngredient3;
  ingr4 = cocktailRecipe.drinks[0].strIngredient4;
  ingr5 = cocktailRecipe.drinks[0].strIngredient5;
  ingr6 = cocktailRecipe.drinks[0].strIngredient6;
  ingr7 = cocktailRecipe.drinks[0].strIngredient7;
  ingr8 = cocktailRecipe.drinks[0].strIngredient8;
  ingr9 = cocktailRecipe.drinks[0].strIngredient9;
  ingr10 = cocktailRecipe.drinks[0].strIngredient10;
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
  //=================================================================
  cocktailRecipesResults.innerHTML += `
  <div class="card bg-light m-4" style="width: 18rem">
  <div class="card-body">
    <h2 class="card-title text-center">${cocktailName}</h2>
    <a href="#"><img src="${cocktailImage}" class="card-img rounded mx-auto d-block" alt="Responsive image of cocktail"/></a>
  </div>
<div>

<h4>Ingredients:</h4>
  <ul>
    <li class="text-left"> ${meas1} ${ingr1}</li>
    <li>${meas2} ${ingr2}</li>
    <li>${meas3} ${ingr3}</li>
    <li>${meas4} ${ingr4}</li>
    <li>${meas5} ${ingr5}</li>
  </ul>

  <h4>Instructions:</h4>
    <p>${instructions}</p>
</div>

<!-- Save Recipe Button -->
<button type="button" class="btn my-btn mb-4">Save Recipe</button>
</div>
</div>
</div>
  `
}


// EVENT LISTENERS
//================================================================================
mealSearchBtn.addEventListener('click', getMealRecipes)
cocktailSearchBtn.addEventListener('click', getCocktailAPIdata)
//================================================================================

