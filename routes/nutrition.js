const express = require('express');
const axios = require('axios');
require('dotenv/config');

var NutritionRouter = express.Router();

NutritionRouter.route("/").post((req, res) => {
    // const recipe = {
    //     "title": req.body.description,
    //     "prep": req.body.instructions,
    //     "yield": req.body.servings ? req.body.servings : "1 serving",
    //     "ingr": req.body.ingredients
    // };
    const recipe = {
        "title": "Fresh Ham Roasted With Rye Bread and Dried Fruit Stuffing",
        "prep": "1. Have your butcher bone and butterfly the ham and score the fat in a diamond pattern. ...",
        "yield": "About 15 servings",
        "ingr": [
            "1 fresh ham, about 18 pounds, prepared by your butcher (See Step 1)",
            "7 cloves garlic, minced",
            "1 tablespoon caraway seeds, crushed",
            "4 teaspoons salt",
            "Freshly ground pepper to taste",
            "1 teaspoon olive oil",
            "1 medium onion, peeled and chopped",
            "3 cups sourdough rye bread, cut into 1/2-inch cubes",
            "1 1/4 cups coarsely chopped pitted prunes",
            "1 1/4 cups coarsely chopped dried apricots",
            "1 large tart apple, peeled, cored and cut into 1/2-inch cubes",
            "2 teaspoons chopped fresh rosemary",
            "1 egg, lightly beaten",
            "1 cup chicken broth, homemade or low-sodium canned"
        ]
    };

    axios.post(`https://api.edamam.com/api/nutrition-details?app_id=${process.env.NUTRITION_APP_ID}&app_key=${process.env.NUTRITION_APP_KEY}`, recipe)
        .then(nutrition => res.json(nutrition))
        .catch(err => console.log("Error when posting recipe to API: " + err));

})

NutritionRouter.route("/").get((req, res) => {
    let urlEncodedIngredients = encodeURIComponent(req.body.ingredients);
    axios.get(`https://api.edamam.com/api/nutrition-data?app_id=${process.env.NUTRITION_APP_ID}&app_key=${process.env.NUTRITION_APP_KEY}&ingr=${urlEncodedIngredients}`)
        .then(nutriton => res.json(nutrition))
        .catch(err => console.log("Error when getting recipe to API: " + err));
})



module.exports = NutritionRouter;