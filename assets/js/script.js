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


function removeSearchDropdowns() {
  toggle.classList.add('hide');
  foodForm.classList.add('hide');
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
    "https://api.edamam.com/search?q=+" +proteinType +"&app_id=1c0e8432&app_key=85fb82c1cc22979ec45ced7b58e387af&from=0&to=3&calories=591-722&health=alcohol-free&mealType=" +mealType +"&cuisineType=" +cusineType;

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


//Step 2: We make an API call based on alcohol type     ====================  PASSES ALL THE DATA FOR SELECTED ALCOHOL TYPE TO THE "formatDrinkData" function  ==================
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


cocktailNameArray = [];
cocktailImageArray = [];
cocktailIdArray = []


// Step 3: FIRST API call returns (1)DRINK NAME (2)DRINK IMAGE (3)DRINK ID into ARRAYS  ================= USE THIS DATA TO SHOW THE USER 5 DRINK CARDS/ OPTIONS ==============================
function formatDrinkData(data) {
  cockTailData = data;
  for (i=0; i < 5; i++) {
    // Use cocktailName and cocktailImage to show search results for 5 cards
    //==================================================================================
    cocktailName = cockTailData.drinks[i].strDrink;
    cocktailImage = cockTailData.drinks[i].strDrinkThumb;
    cocktailID = cockTailData.drinks[i].idDrink; //Although the cocktailID will not be visible, add the cocktailID on to each card so an event listener will push the cocktailID to the "getCocktailRecipeData" function
    //==================================================================================
    cocktailNameArray.push(cocktailName);
    cocktailImageArray.push(cocktailImage);
    cocktailIdArray.push(cocktailID);                             // I am pushing the 5 cocktail IDs into an array
    getCocktailRecipeData(cocktailID);
  }
    // Add an event listener to ALL 5 Cards
    // Based on the target card, grab the drinkID and store it in a variable called "currentCocktailID"
    //Pass "currentCocktailID" to the "getCocktailRecipeData" function) 
    //getCocktailRecipeData(currentCocktailID);                        
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


  //=================================================================CONSOLE LOGS FOR TESTING===========================================================
  console.log(cocktailName);
  console.log(cocktailImage);
  // For front-end, only add ingredients to HTML if ingredient !== null
  if (ingr1 !== null) {console.log(`${meas1} ${ingr1}`)};
  if (ingr2 !== null) {console.log(`${meas2} ${ingr2}`)};
  if (ingr3 !== null) {console.log(`${meas3} ${ingr3}`);}
  if (ingr4 !== null) {console.log(`${meas4} ${ingr4}`);}
  if (ingr5 !== null) {console.log(`${meas5} ${ingr5}`);}
  if (ingr6 !== null) {console.log(`${meas6} ${ingr6}`);}
  if (ingr7 !== null) {console.log(`${meas7} ${ingr7}`);}
  if (ingr8 !== null) {console.log(`${meas8} ${ingr8}`);}
  if (ingr9 !== null) {console.log(`${meas9} ${ingr9}`);}
  if (ingr10 !== null) {console.log(`${meas10} ${ingr10}`);}
  console.log(instructions);
  console.log("------------------------");
  console.log("");
  //======================================================================================================================================================
}


// EVENT LISTENERS
//================================================================================

// Add an event listener to the search button that passes mealType, proteinType, and cusineType to the "getMealReceipes" function
mealSearchBtn.addEventListener('click', getMealRecipes)
cocktailSearchBtn.addEventListener('click', getCocktailAPIdata)
//================================================================================

