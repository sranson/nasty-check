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
  console.log(recipeNumber);
  for (i = 0; i < recipeNumber; i++) {
    console.log(mealData.hits[i].recipe.label); // Recipe Label
    console.log(mealData.hits[i].recipe.source); // Source Name
    console.log(mealData.hits[i].recipe.image); // Recipe image
    console.log(mealData.hits[i].recipe.url); // Recipe Instructions URL
  }
}

getMealReceipes(mealType, proteinType, cusineType);
