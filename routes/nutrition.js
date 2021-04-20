const express = require('express');
const axios = require('axios');

let Nutrition = require('../models/nutrition'); // nutrition model

require('dotenv/config');

var NutritionRouter = express.Router();

// ================= Post and Get Nutriton obj read from API to MongoDB database ============

NutritionRouter.route("/db/recipe/add/:etag").post((req, res) => {    // just pass in the nutrtion response returned form the api call
    const newNutrition = new Nutrition({ 
        nutrition: req.body 
    });
    newNutrition.save()
        .then(() => res.json(newNutrition._id))
        .catch(err => console.log("Error when posting nutrtion to db: " + err));

});
NutritionRouter.route("/db/recipe/:id").get((req, res) => {     // pass in object id through params
    Nutrition.findById(req.params.id)
        .then(nutrition => res.json(nutrition.nutrition))
        .catch(err => res.status(400).json("Error: " + err));
})
NutritionRouter.route("/db/recipe/update/:id").post((req, res) => { // pass in object id throuhg params, pass in new nutrition obj throuhg body
    Nutrition.findById(req.params.id)
        .then(nutrition => {
            nutrition.nutrition = req.body;

            nutrition.save()
                .then(() => res.json("nutrition updated!"))
                .catch(err => console.log("Error: " + err))
        })
})
NutritionRouter.route("/db/recipe/delete/:id").delete((req, res) => {
    Nutrition.findByIdAndDelete(req.params.id)
        .then(() => res.json("nutrition deleted!"))
        .catch(err => console.log(err))
})

// =========================== Post and Get to API =======================================
const Err304Msg = "Request failed with status code 304";    // 304 status code means recipe already in database
const Err555Msg = "Request failed with status code 555"; // 555 status code means recipe quality is too low, no numbers, servings size is too large or small

// doc for how to use api: https://developer.edamam.com/edamam-docs-nutrition-api
NutritionRouter.route("/api/recipe").post((req, res) => { // send in a recipe in json format, works for a recipe
    // console.log(req.body)
    const recipe = {
        "title": req.body.description,
        "ingr": req.body.ingredients,    // array
        "prep": req.body.instructions,  // not required
        "yield": req.body.servings, // not required, API will autofill it
    };
    console.log(recipe);

    console.log("Etag passed in: " + req.query.etag);

    const headers = {headers: { 'If-None-Match': req.query.etag }};
    if (req.query.etag == "none") {
        headers.headers = null;
    }

    axios.post(`https://api.edamam.com/api/nutrition-details?app_id=${process.env.NUTRITION_APP_ID}&app_key=${process.env.NUTRITION_APP_KEY}`, recipe, { headers })
        .then(response => {
            // console.log(response);
            // console.log("Etag: " + response.headers.etag);  // need to use etag so we don't double submit recipes
            // console.log("Staus: " + response.status);

            response.data.etag = response.headers.etag;

            // save nutrition data to database
            axios.post('http://localhost:5000/nutrition/db/recipe/add/' + response.headers.etag, response.data)
                .then((addRes) => {
                    response.data.id = addRes.data;
                    res.json(response.data)
                    console.log("Id for nutrition in db: " + addRes.data);
                })
                .catch(err => console.log("Error when saving nutrition data to db: "+ err));

        })
        .catch(err => {
            if (err.message == Err304Msg) {
                res.json({ alreadyInDatabase: true });
            }
            else if (err.message == Err555Msg) {
                res.json({recipeQualityTooLow : true})
            }
            else
                console.log("Error when posting recipe to API (If status code is 304, means we already have this recipe in the database): " + err);
        });

})

// only works for 1 or 2 item, wants a string of ingredients
NutritionRouter.route("/api/item").get((req, res) => {
    // console.log("req.body: " + req.body);
    // console.log("req.query: "+ req.query);
    // console.log("req.params: "+req.params);
    console.log(req.query.ingredients)
    let urlEncodedIngredients = encodeURIComponent(req.query.ingredients);
    console.log("Encoded ingr: " + urlEncodedIngredients);

    const headers = {headers: { 'If-None-Match': req.query.etag }};
    if (req.query.etag == "none") {
        headers.headers = null;
    }
    axios.get(`https://api.edamam.com/api/nutrition-data?app_id=${process.env.NUTRITION_APP_ID}&app_key=${process.env.NUTRITION_APP_KEY}&ingr=${urlEncodedIngredients}`, { headers })
        .then(response => {

            response.data.etag = response.headers.etag;
            // save nutrition response to database
            axios.post('http://localhost:5000/nutrition/db/recipe/add/' + response.headers.etag, response.data)
                .then((addRes) => {
                    response.data.id = addRes.data;
                    res.json(response.data)
                    console.log("Id for nutrition in db: " + addRes.data);
                })
                .catch(err => console.log("Error when saving nutrition data to db: "+ err));
        })
        .catch(err => {
            if (err.message == Err304Msg) {
                res.json({ alreadyInDatabase: true });
            }
            else if (err.message == Err555Msg) {
                res.json({recipeQualityTooLow : true})
            }
            else
                console.log("Error when getting recipe to API (If status code is 304, means we already have this recipe in the database): " + typeof (err))
        });
})



module.exports = NutritionRouter;