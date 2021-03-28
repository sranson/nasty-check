// temporary hard-coded values
// get this data from user dropdown menus
let proteinType = "chicken";
let mealType = "dinner";
let cusineType = "italian";

// Meal Data API calls
var getMealReceipes = function (mealType, proteinType, cusineType) {
  var mealAPI =
    "https://api.edamam.com/search?q=+" +
    proteinType +
    "&app_id=1c0e8432&app_key=85fb82c1cc22979ec45ced7b58e387af&from=0&to=3&calories=591-722&health=alcohol-free&mealType=" +
    mealType +
    "&cuisineType=" +
    cusineType;

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
  //console.log("Number of Food Recipes Returned from API call: " + recipeNumber);
  //console.log("-------------");
  for (i = 0; i < recipeNumber; i++) {
    recipeLabel = mealData.hits[i].recipe.label; // Recipe Label
    recipeSourceName = mealData.hits[i].recipe.source; // Source Name
    recipeImage = mealData.hits[i].recipe.image; // Recipe image
    recipeInstructionsLink = mealData.hits[i].recipe.url; // Recipe Instructions URL
    //console.log("Recipe Label " + i + ": " + recipeLabel);
    //console.log("Recipe Source " + i + ": " + recipeSourceName);
    //console.log("Recipe Image " + i + ": " + recipeImage);
    //console.log(
      //"Recipe URL for instructions " + i + ": " + recipeInstructionsLink
   // );
    //console.log("-------------");
  }
}


// Step 1: User provides alcohol type
let alcoholType = "rum";



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
  //console.log("Number of recipes returned from API call: " + cockTailData.drinks.length);

  for (i=0; i < 5; i++) {
    cocktailName = cockTailData.drinks[i].strDrink;
    cocktailImage = cockTailData.drinks[i].strDrinkThumb;
    cocktailID = cockTailData.drinks[i].idDrink;
    cocktailNameArray.push(cocktailName);
    cocktailImageArray.push(cocktailImage);
    cocktailIdArray.push(cocktailID);
  }
}


// Add an event listener to ALL 5 Cards ... Based on "e.target", grab the drinkID and store it in a variable -- "drinkID") 
// THIS IS HARD-CODED FOR NOW
getCocktailRecipeData("14364");


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
   if (cocktailRecipe.drinks[0].strIngredient1 !== null && cocktailRecipe.drinks[0].strIngredient1 !== "") {ingredients.push(cocktailRecipe.drinks[0].strIngredient1)};
   if (cocktailRecipe.drinks[0].strIngredient2 !== null && cocktailRecipe.drinks[0].strIngredient1 !== "") {ingredients.push(cocktailRecipe.drinks[0].strIngredient2)};
   if (cocktailRecipe.drinks[0].strIngredient3 !== null && cocktailRecipe.drinks[0].strIngredient1 !== "") {ingredients.push(cocktailRecipe.drinks[0].strIngredient3)};
   if (cocktailRecipe.drinks[0].strIngredient4 !== null && cocktailRecipe.drinks[0].strIngredient1 !== "") {ingredients.push(cocktailRecipe.drinks[0].strIngredient4)};
   if (cocktailRecipe.drinks[0].strIngredient5 !== null && cocktailRecipe.drinks[0].strIngredient1 !== "") {ingredients.push(cocktailRecipe.drinks[0].strIngredient5)};
   if (cocktailRecipe.drinks[0].strIngredient6 !== null && cocktailRecipe.drinks[0].strIngredient1 !== "") {ingredients.push(cocktailRecipe.drinks[0].strIngredient6)};
   if (cocktailRecipe.drinks[0].strIngredient7 !== null && cocktailRecipe.drinks[0].strIngredient1 !== "") {ingredients.push(cocktailRecipe.drinks[0].strIngredient7)};
   if (cocktailRecipe.drinks[0].strIngredient8 !== null && cocktailRecipe.drinks[0].strIngredient1 !== "") {ingredients.push(cocktailRecipe.drinks[0].strIngredient8)};
   if (cocktailRecipe.drinks[0].strIngredient9 !== null && cocktailRecipe.drinks[0].strIngredient1 !== "") {ingredients.push(cocktailRecipe.drinks[0].strIngredient9)};
   if (cocktailRecipe.drinks[0].strIngredient10 !== null && cocktailRecipe.drinks[0].strIngredient1 !== "") {ingredients.push(cocktailRecipe.drinks[0].strIngredient10)};
  

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
  console.log(cocktailName);
  console.log(cocktailImage);
  console.log(ingredients);
  console.log(measurements);
  console.log(instructions);
}



// TRIGGERS API CALL FUNCTIONS
//================================================================================
getMealReceipes(mealType, proteinType, cusineType);
getCocktailAPIdata(alcoholType);
//================================================================================





