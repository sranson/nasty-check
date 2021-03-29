var searchBtn = document.getElementById('searchBtn');
var mealTypeDropDown = document.getElementById('mealTypeDropDown');
var proteinTypeDropDown = document.getElementById('proteinTypeDropDown');
var cuisineTypeDropDown = document.getElementById('cuisineTypeDropDown');



let mealType = "";
let proteinType = "";
let cusineType = "";

// GET USER INPUT FROM MEAL TYPE DROP DOWN MENU
//=======================================================================================
$(mealTypeDropDown).click(function(e) {
  mealType = e.target.id;
})
//=======================================================================================


// GET USER INPUT FROM PROTEIN TYPE DROP DOWN MENU
//=======================================================================================
$(proteinTypeDropDown).click(function(e) {
  proteinType = e.target.id;
})
//=======================================================================================

// GET USER INPUT FROM CUISINE TYPE DROP DOWN MENU
//=======================================================================================
$(cuisineTypeDropDown).click(function(e) {
  cusineType = e.target.id;
})
//=======================================================================================



// Meal Data API calls
var getMealReceipes = function () {
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
  console.log("-------------");
  for (i = 0; i < recipeNumber; i++) {
    recipeLabel = mealData.hits[i].recipe.label; 
    recipeSourceName = mealData.hits[i].recipe.source; 
    recipeImage = mealData.hits[i].recipe.image; 
    recipeInstructionsLink = mealData.hits[i].recipe.url;
    console.log("Recipe Label " + i + ": " + recipeLabel);
    console.log("Recipe Source " + i + ": " + recipeSourceName);
    console.log("Recipe Image " + i + ": " + recipeImage);
    console.log(
    "Recipe URL for instructions " + i + ": " + recipeInstructionsLink
    );
    console.log("-------------");
  }
}


// Step 1: User provides alcohol type
let alcoholType = "vodka";



//Step 2: We make an API call based on alcohol type     ====================  PASSES ALL THE DATA FOR SELECTED ALCOHOL TYPE TO THE "formatDrinkData" function  ==================
var getCocktailAPIdata = function (alcoholType) {
  var cocktailAPI1 =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + alcoholType;

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
    cocktailName = cockTailData.drinks[i].strDrink;
    cocktailImage = cockTailData.drinks[i].strDrinkThumb;
    cocktailID = cockTailData.drinks[i].idDrink;
    cocktailNameArray.push(cocktailName);
    cocktailImageArray.push(cocktailImage);
    cocktailIdArray.push(cocktailID);
    //console.log(cocktailIdArray);
  }
}


// Add an event listener to ALL 5 Cards ... Based on "e.target", grab the drinkID and store it in a variable -- "drinkID"... Pass the drinkID to the "getCocktailRecipeData" function) 
// THIS IS HARD-CODED FOR NOW
getCocktailRecipeData("178318");


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
  //console.log(cocktailRecipe);
  cocktailName = cocktailRecipe.drinks[0].strDrink;
  cocktailImage = cocktailRecipe.drinks[0].strDrinkThumb;
   if (cocktailRecipe.drinks[0].strIngredient1 !== null) {ingredients.push(cocktailRecipe.drinks[0].strIngredient1)};
   if (cocktailRecipe.drinks[0].strIngredient2 !== null) {ingredients.push(cocktailRecipe.drinks[0].strIngredient2)};
   if (cocktailRecipe.drinks[0].strIngredient3 !== null) {ingredients.push(cocktailRecipe.drinks[0].strIngredient3)};
   if (cocktailRecipe.drinks[0].strIngredient4 !== null) {ingredients.push(cocktailRecipe.drinks[0].strIngredient4)};
   if (cocktailRecipe.drinks[0].strIngredient5 !== null) {ingredients.push(cocktailRecipe.drinks[0].strIngredient5)};
   if (cocktailRecipe.drinks[0].strIngredient6 !== null) {ingredients.push(cocktailRecipe.drinks[0].strIngredient6)};
   if (cocktailRecipe.drinks[0].strIngredient7 !== null) {ingredients.push(cocktailRecipe.drinks[0].strIngredient7)};
   if (cocktailRecipe.drinks[0].strIngredient8 !== null) {ingredients.push(cocktailRecipe.drinks[0].strIngredient8)};
   if (cocktailRecipe.drinks[0].strIngredient9 !== null) {ingredients.push(cocktailRecipe.drinks[0].strIngredient9)};
   if (cocktailRecipe.drinks[0].strIngredient10 !== null) {ingredients.push(cocktailRecipe.drinks[0].strIngredient10)};
  

   if (data.drinks[0].strMeasure1 !== null) {measurements.push(data.drinks[0].strMeasure1)};
   if (data.drinks[0].strMeasure2 !== null) {measurements.push(data.drinks[0].strMeasure2)};
   if (data.drinks[0].strMeasure3 !== null) {measurements.push(data.drinks[0].strMeasure3)};
   if (data.drinks[0].strMeasure4 !== null) {measurements.push(data.drinks[0].strMeasure4)};
   if (data.drinks[0].strMeasure5 !== null) {measurements.push(data.drinks[0].strMeasure5)};
   if (data.drinks[0].strMeasure6 !== null) {measurements.push(data.drinks[0].strMeasure6)};
   if (data.drinks[0].strMeasure7 !== null) {measurements.push(data.drinks[0].strMeasure7)};
   if (data.drinks[0].strMeasure8 !== null) { measurements.push(data.drinks[0].strMeasure8)};
   if (data.drinks[0].strMeasure9 !== null) {measurements.push(data.drinks[0].strMeasure9)};
   if (data.drinks[0].strMeasure10 !== null) {measurements.push(data.drinks[0].strMeasure10)};

  instructions = data.drinks[0].strInstructions;

  //return (cocktailName, cocktailImage, ingredients, measurements, instructions)
  //console.log(cocktailName);
  //console.log(cocktailImage);
  //if (cocktailRecipe.drinks[0].strIngredient1 !== null) {console.log(`${measurements[0]} ${ingredients[0]}`)};
  //if (cocktailRecipe.drinks[0].strIngredient2 !== null) {console.log(`${measurements[1]} ${ingredients[1]}`)};
  //if (cocktailRecipe.drinks[0].strIngredient3 !== null) {console.log(`${measurements[2]} ${ingredients[2]}`);}
  //if (cocktailRecipe.drinks[0].strIngredient4 !== null) {console.log(`${measurements[3]} ${ingredients[3]}`);}
  //if (cocktailRecipe.drinks[0].strIngredient5 !== null) {console.log(`${measurements[4]} ${ingredients[4]}`);}
  //if (cocktailRecipe.drinks[0].strIngredient6 !== null) {console.log(`${measurements[5]} ${ingredients[5]}`);}
  //if (cocktailRecipe.drinks[0].strIngredient7 !== null) {console.log(`${measurements[6]} ${ingredients[6]}`);}
  //console.log(instructions);
}




// TRIGGERS API CALL FUNCTIONS
//================================================================================
//getMealReceipes(mealType, proteinType, cusineType);
//getCocktailAPIdata(alcoholType);
//================================================================================


// EVENT LISTENERS
//================================================================================

// Add an event listener to the search button that passes mealType, proteinType, and cusineType to the "getMealReceipes" function
searchBtn.addEventListener('click', getMealReceipes)
//================================================================================

