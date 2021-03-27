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

// Make API call to CocktailDB to get the "drink ID" based on "Alcohol ingredient"
// Will need to pass in a "alcohol type""

let alcoholType = "rum";



// GET ALCOHOL TYPE FROM USER AND MAKES API CALL
// PASSES ALL THE DATA FOR SELECTED ALCOHOL TYPE TO THE "getDrinkID" function
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


drinkIDarray = [];


// Data is being passed to this function that includes (1)DRINK NAME, (2)DRINK IMAGE, AND (3)DRINK ID
function formatDrinkData(data) {
  cockTailData = data;
  console.log("Number of recipes returned from API call: " + cockTailData.drinks.length);

  for (i=0; i < 6; i++) {
    cocktailName = cockTailData.drinks[i].strDrink;
    cocktailImage = cockTailData.drinks[i].strDrinkThumb;
    cocktailID = cockTailData.drinks[i].idDrink;
    getCocktailRecipe(cocktailID);
    storeAllCocktailVariables(cocktailName, cocktailImage, cocktailID)
  }
}


function getCocktailRecipe(cocktailID) {
  drinkIDarray.push(cocktailID);
  //console.log(drinkIDarray);

  for (i=0; i < drinkIDarray.length; i++) {
      // Make an API call that returns the (1) Ingredients and (2) the instructions;  
      // Note: the "formatDrinkData" function already has the (1) Cocktail name and (2) Cocktail Image stored in variables
  } 
}

function storeAllCocktailVariables(cocktailName, cocktailImage, cocktailID) {
  console.log(cocktailName);
  console.log(cocktailImage);
  console.log(cocktailID);
}



// TRIGGERS API CALL FUNCTIONS
//================================================================================
getMealReceipes(mealType, proteinType, cusineType);
getCocktailAPIdata(alcoholType);
//================================================================================
