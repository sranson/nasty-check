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
  //console.log("Number of Food Recipes:" + recipeNumber);
  for (i = 0; i < recipeNumber; i++) {
    recipeLabel = mealData.hits[i].recipe.label; // Recipe Label
    recipeSourceName = mealData.hits[i].recipe.source; // Source Name
    recipeImage = mealData.hits[i].recipe.image; // Recipe image
    recipeInstructionsLink = mealData.hits[i].recipe.url; // Recipe Instructions URL
  }
}

getMealReceipes(mealType, proteinType, cusineType);

// Make API call to CocktailDB to get the "drink ID" based on "Alcohol ingredient"
// Will need to pass in a "alcohol type""

let alcoholType = "gin";

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

getCocktailID(alcoholType);

//Grab drink ID
function getDrinkID(data) {
  cocktailIDdata = data;
  cocktailNumber = cocktailIDdata.drinks.length;
  console.log("Number of Cocktail recipes returned: " + cocktailNumber);

  for (i = 0; i < cocktailNumber; i++) {
    cocktailID = cocktailIDdata.drinks[i].idDrink;
    console.log(cocktailID);
  }
}

// Make API call to get Cocktail recipes based on the "drink ID"
