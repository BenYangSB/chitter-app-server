const express = require('express');
const axios = require('axios');
require('dotenv/config');

var NutritionRouter = express.Router();

// doc for how to use api: https://developer.edamam.com/edamam-docs-nutrition-api
NutritionRouter.route("/recipe").post((req, res) => { // send in a recipe in json format, works for a recipe
    console.log(req.body)
    const recipe = {
        "title": req.body.description,
        "ingr": req.body.ingredients,    // array
        "prep": req.body.instructions,  // not required
        "yield": req.body.servings, // not required, API will autofill it
    };
    console.log(recipe);

    const headers = {'If-None-Match' : req.query.etag};
    console.log(headers);

    axios.post(`https://api.edamam.com/api/nutrition-details?app_id=${process.env.NUTRITION_APP_ID}&app_key=${process.env.NUTRITION_APP_KEY}`, recipe, headers)
        .then(response => {
            // console.log(response);
            console.log("Etag: " + response.headers.etag);  // need to use etag so we don't double submit recipes
            res.json(response.data)
        })
        .catch(err => console.log("Error when posting recipe to API: " + err));

})

// only works for 1 or 2 item, wants a string of ingredients
NutritionRouter.route("/item").get((req, res) => {
    // console.log("req.body: " + req.body);
    // console.log("req.query: "+ req.query);
    // console.log("req.params: "+req.params);
    // console.log(req.query.ingredients)
    let urlEncodedIngredients = encodeURIComponent(req.query.ingredients);
    console.log("Encoded ingr: "+ urlEncodedIngredients);
    axios.get(`https://api.edamam.com/api/nutrition-data?app_id=${process.env.NUTRITION_APP_ID}&app_key=${process.env.NUTRITION_APP_KEY}&ingr=${urlEncodedIngredients}`)
        .then(response => res.json(response.data))
        .catch(err => console.log("Error when getting recipe to API: " + err));
})



module.exports = NutritionRouter;