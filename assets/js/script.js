// temporary hard-coded values
// get this data from user dropdown menus
let proteinType = "beef";
let mealType = "dinner";
let cusineType = "chinese";

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
  console.log("Number of Food Recipes Returned from API call: " + recipeNumber);
  console.log("-------------");
  for (i = 0; i < recipeNumber; i++) {
    recipeLabel = mealData.hits[i].recipe.label; // Recipe Label
    recipeSourceName = mealData.hits[i].recipe.source; // Source Name
    recipeImage = mealData.hits[i].recipe.image; // Recipe image
    recipeInstructionsLink = mealData.hits[i].recipe.url; // Recipe Instructions URL

    console.log("Recipe Label " + i + ": " + recipeLabel);
    console.log("Recipe Source " + i + ": " + recipeSourceName);
    console.log("Recipe Image " + i + ": " + recipeImage);
    console.log(
      "Recipe URL for instructions " + i + ": " + recipeInstructionsLink
    );
    console.log("-------------");
  }
}

// Make API call to CocktailDB to get the "drink ID" based on "Alcohol ingredient"
// Will need to pass in a "alcohol type""

let alcoholType = "tequila";

var getCocktailID = function (alcoholType) {
  var cocktailAPI1 =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + alcoholType;

  fetch(cocktailAPI1)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          getDrinkID(data);
        });
      } else {
        alert("Error" + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Meal API");
    });
};

//Grab drink ID
function getDrinkID(data) {
  cocktailIDdata = data;
  cocktailNumber = cocktailIDdata.drinks.length;
  //console.log("Number of Cocktail recipes returned from API Call: " + cocktailNumber);

  for (i = 0; i < cocktailNumber; i++) {
    drinkID = cocktailIDdata.drinks[i].idDrink;
    //console.log(drinkID);
  }
}

let drinkID = "13940";

// Make API call to get Cocktail recipes based on the "drink ID"
var getCocktailRecipe = function (drinkID) {
  var cocktailRecipe =
    "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkID;

  fetch(cocktailRecipe)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          formatCocktailData(data);
        });
      } else {
        alert("Error" + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Meal API");
    });
};

getCocktailRecipe(drinkID);

function formatCocktailData(data) {
  //console.log(data);
}

// TRIGGERS API CALL FUNCTIONS
//================================================================================
getMealReceipes(mealType, proteinType, cusineType);
getCocktailID(alcoholType);
