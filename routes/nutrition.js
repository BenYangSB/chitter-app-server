const express = require('express');
const axios = require('axios');
require('dotenv/config');

var NutritionRouter = express.Router();

NutritionRouter.route("/").post((req, res) => { // send in a recipe in json format
    console.log(req.body)
    console.log(req.query);
    const recipe = {
        "title": req.body.description,
        "prep": req.body.instructions,
        "yield": req.body.servings ? req.body.servings : "1 serving",
        "ingr": req.body.ingredients
    };
    console.log(recipe);
    // const recipe = {
    //     "title": "Fresh Ham Roasted With Rye Bread and Dried Fruit Stuffing",
    //     "prep": "1. Have your butcher bone and butterfly the ham and score the fat in a diamond pattern. ...",
    //     "yield": "About 15 servings",
    //     "ingr": [
    //         "1 fresh ham, about 18 pounds, prepared by your butcher (See Step 1)",
    //         "7 cloves garlic, minced",
    //         "1 tablespoon caraway seeds, crushed",
    //         "4 teaspoons salt",
    //         "Freshly ground pepper to taste",
    //         "1 teaspoon olive oil",
    //         "1 medium onion, peeled and chopped",
    //         "3 cups sourdough rye bread, cut into 1/2-inch cubes",
    //         "1 1/4 cups coarsely chopped pitted prunes",
    //         "1 1/4 cups coarsely chopped dried apricots",
    //         "1 large tart apple, peeled, cored and cut into 1/2-inch cubes",
    //         "2 teaspoons chopped fresh rosemary",
    //         "1 egg, lightly beaten",
    //         "1 cup chicken broth, homemade or low-sodium canned"
    //     ]
    // };

    axios.post(`https://api.edamam.com/api/nutrition-details?app_id=${process.env.NUTRITION_APP_ID}&app_key=${process.env.NUTRITION_APP_KEY}`, recipe)
        .then(nutrition => res.json(nutrition.data))
        .catch(err => console.log("Error when posting recipe to API: " + err));
    // example response from api
    // nutrition.data = {
    //     "uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_6959eb753e3c401281437b52eb857e27",
    //     "yield": 15,
    //     "calories": 18528,
    //     "totalWeight": 7980.792295779999,
    //     "dietLabels": [
    //         "LOW_CARB"
    //     ],
    //     "healthLabels": [
    //         "DAIRY_FREE",
    //         "MILK_FREE",
    //         "PEANUT_FREE",
    //         "TREE_NUT_FREE",
    //         "SOY_FREE",
    //         "FISH_FREE",
    //         "SHELLFISH_FREE",
    //         "CRUSTACEAN_FREE",
    //         "CELERY_FREE",
    //         "MUSTARD_FREE",
    //         "SESAME_FREE",
    //         "LUPINE_FREE",
    //         "MOLLUSK_FREE",
    //         "ALCOHOL_FREE"
    //     ],
    //     "cautions": [
    //         "SULFITES"
    //     ],
    //     "totalNutrients": {
    //         "ENERC_KCAL": {
    //             "label": "Energy",
    //             "quantity": 18528.0174619398,
    //             "unit": "kcal"
    //         },
    //         "FAT": {
    //             "label": "Fat",
    //             "quantity": 1301.175677060008,
    //             "unit": "g"
    //         },
    //         "FASAT": {
    //             "label": "Saturated",
    //             "quantity": 447.7932857588015,
    //             "unit": "g"
    //         },
    //         "FATRN": {
    //             "label": "Trans",
    //             "quantity": 0.01634,
    //             "unit": "g"
    //         },
    //         "FAMS": {
    //             "label": "Monounsaturated",
    //             "quantity": 578.2895613618124,
    //             "unit": "g"
    //         },
    //         "FAPU": {
    //             "label": "Polyunsaturated",
    //             "quantity": 140.5167025908204,
    //             "unit": "g"
    //         },
    //         "CHOCDF": {
    //             "label": "Carbs",
    //             "quantity": 417.07965316320997,
    //             "unit": "g"
    //         },
    //         "FIBTG": {
    //             "label": "Fiber",
    //             "quantity": 40.91053885894,
    //             "unit": "g"
    //         },
    //         "SUGAR": {
    //             "label": "Sugars",
    //             "quantity": 123.034722643072,
    //             "unit": "g"
    //         },
    //         "PROCNT": {
    //             "label": "Protein",
    //             "quantity": 1228.290578080662,
    //             "unit": "g"
    //         },
    //         "CHOLE": {
    //             "label": "Cholesterol",
    //             "quantity": 5114.129105694,
    //             "unit": "mg"
    //         },
    //         "NA": {
    //             "label": "Sodium",
    //             "quantity": 14090.702361262,
    //             "unit": "mg"
    //         },
    //         "CA": {
    //             "label": "Calcium",
    //             "quantity": 972.6032361414,
    //             "unit": "mg"
    //         },
    //         "MG": {
    //             "label": "Magnesium",
    //             "quantity": 1697.7621140057997,
    //             "unit": "mg"
    //         },
    //         "K": {
    //             "label": "Potassium",
    //             "quantity": 26576.780731824194,
    //             "unit": "mg"
    //         },
    //         "FE": {
    //             "label": "Iron",
    //             "quantity": 79.32516922915802,
    //             "unit": "mg"
    //         },
    //         "ZN": {
    //             "label": "Zinc",
    //             "quantity": 136.99246637750204,
    //             "unit": "mg"
    //         },
    //         "P": {
    //             "label": "Phosphorus",
    //             "quantity": 14347.693530530398,
    //             "unit": "mg"
    //         },
    //         "VITA_RAE": {
    //             "label": "Vitamin A",
    //             "quantity": 530.0160177545999,
    //             "unit": "µg"
    //         },
    //         "VITC": {
    //             "label": "Vitamin C",
    //             "quantity": 66.7138900546,
    //             "unit": "mg"
    //         },
    //         "THIA": {
    //             "label": "Thiamin (B1)",
    //             "quantity": 51.21801532842641,
    //             "unit": "mg"
    //         },
    //         "RIBF": {
    //             "label": "Riboflavin (B2)",
    //             "quantity": 15.171811133964,
    //             "unit": "mg"
    //         },
    //         "NIA": {
    //             "label": "Niacin (B3)",
    //             "quantity": 331.3620359083834,
    //             "unit": "mg"
    //         },
    //         "VITB6A": {
    //             "label": "Vitamin B6",
    //             "quantity": 29.577510589299806,
    //             "unit": "mg"
    //         },
    //         "FOLDFE": {
    //             "label": "Folate equivalent (total)",
    //             "quantity": 844.5366895026,
    //             "unit": "µg"
    //         },
    //         "FOLFD": {
    //             "label": "Folate (food)",
    //             "quantity": 658.7166895025999,
    //             "unit": "µg"
    //         },
    //         "FOLAC": {
    //             "label": "Folic acid",
    //             "quantity": 113.28,
    //             "unit": "µg"
    //         },
    //         "VITB12": {
    //             "label": "Vitamin B12",
    //             "quantity": 43.07572104914,
    //             "unit": "µg"
    //         },
    //         "VITD": {
    //             "label": "Vitamin D",
    //             "quantity": 34.743350039,
    //             "unit": "µg"
    //         },
    //         "TOCPHA": {
    //             "label": "Vitamin E",
    //             "quantity": 9.707631794991997,
    //             "unit": "mg"
    //         },
    //         "VITK1": {
    //             "label": "Vitamin K",
    //             "quantity": 63.92098542326,
    //             "unit": "µg"
    //         },
    //         "WATER": {
    //             "label": "Water",
    //             "quantity": 4907.222550954967,
    //             "unit": "g"
    //         }
    //     },
    //     "totalDaily": {
    //         "ENERC_KCAL": {
    //             "label": "Energy",
    //             "quantity": 926.4008730969899,
    //             "unit": "%"
    //         },
    //         "FAT": {
    //             "label": "Fat",
    //             "quantity": 2001.8087339384738,
    //             "unit": "%"
    //         },
    //         "FASAT": {
    //             "label": "Saturated",
    //             "quantity": 2238.9664287940077,
    //             "unit": "%"
    //         },
    //         "CHOCDF": {
    //             "label": "Carbs",
    //             "quantity": 139.0265510544033,
    //             "unit": "%"
    //         },
    //         "FIBTG": {
    //             "label": "Fiber",
    //             "quantity": 163.64215543576,
    //             "unit": "%"
    //         },
    //         "PROCNT": {
    //             "label": "Protein",
    //             "quantity": 2456.581156161324,
    //             "unit": "%"
    //         },
    //         "CHOLE": {
    //             "label": "Cholesterol",
    //             "quantity": 1704.709701898,
    //             "unit": "%"
    //         },
    //         "NA": {
    //             "label": "Sodium",
    //             "quantity": 587.1125983859167,
    //             "unit": "%"
    //         },
    //         "CA": {
    //             "label": "Calcium",
    //             "quantity": 97.26032361413999,
    //             "unit": "%"
    //         },
    //         "MG": {
    //             "label": "Magnesium",
    //             "quantity": 404.22907476328567,
    //             "unit": "%"
    //         },
    //         "K": {
    //             "label": "Potassium",
    //             "quantity": 565.4634198260467,
    //             "unit": "%"
    //         },
    //         "FE": {
    //             "label": "Iron",
    //             "quantity": 440.69538460643344,
    //             "unit": "%"
    //         },
    //         "ZN": {
    //             "label": "Zinc",
    //             "quantity": 1245.3860579772913,
    //             "unit": "%"
    //         },
    //         "P": {
    //             "label": "Phosphorus",
    //             "quantity": 2049.6705043614857,
    //             "unit": "%"
    //         },
    //         "VITA_RAE": {
    //             "label": "Vitamin A",
    //             "quantity": 58.8906686394,
    //             "unit": "%"
    //         },
    //         "VITC": {
    //             "label": "Vitamin C",
    //             "quantity": 74.12654450511111,
    //             "unit": "%"
    //         },
    //         "THIA": {
    //             "label": "Thiamin (B1)",
    //             "quantity": 4268.167944035535,
    //             "unit": "%"
    //         },
    //         "RIBF": {
    //             "label": "Riboflavin (B2)",
    //             "quantity": 1167.0623949203077,
    //             "unit": "%"
    //         },
    //         "NIA": {
    //             "label": "Niacin (B3)",
    //             "quantity": 2071.0127244273963,
    //             "unit": "%"
    //         },
    //         "VITB6A": {
    //             "label": "Vitamin B6",
    //             "quantity": 2275.193122253831,
    //             "unit": "%"
    //         },
    //         "FOLDFE": {
    //             "label": "Folate equivalent (total)",
    //             "quantity": 211.13417237565002,
    //             "unit": "%"
    //         },
    //         "VITB12": {
    //             "label": "Vitamin B12",
    //             "quantity": 1794.8217103808336,
    //             "unit": "%"
    //         },
    //         "VITD": {
    //             "label": "Vitamin D",
    //             "quantity": 231.6223335933333,
    //             "unit": "%"
    //         },
    //         "TOCPHA": {
    //             "label": "Vitamin E",
    //             "quantity": 64.71754529994664,
    //             "unit": "%"
    //         },
    //         "VITK1": {
    //             "label": "Vitamin K",
    //             "quantity": 53.26748785271666,
    //             "unit": "%"
    //         }
    //     },
    //     "totalNutrientsKCal": {
    //         "ENERC_KCAL": {
    //             "label": "Energy",
    //             "quantity": 18529,
    //             "unit": "kcal"
    //         },
    //         "PROCNT_KCAL": {
    //             "label": "Calories from protein",
    //             "quantity": 4977,
    //             "unit": "kcal"
    //         },
    //         "FAT_KCAL": {
    //             "label": "Calories from fat",
    //             "quantity": 11862,
    //             "unit": "kcal"
    //         },
    //         "CHOCDF_KCAL": {
    //             "label": "Calories from carbohydrates",
    //             "quantity": 1690,
    //             "unit": "kcal"
    //         }
    //     }
    // }

})

NutritionRouter.route("/").get((req, res) => {
    let urlEncodedIngredients = encodeURIComponent(req.body.ingredients);
    axios.get(`https://api.edamam.com/api/nutrition-data?app_id=${process.env.NUTRITION_APP_ID}&app_key=${process.env.NUTRITION_APP_KEY}&ingr=${urlEncodedIngredients}`)
        .then(nutriton => res.json(nutrition.data))
        .catch(err => console.log("Error when getting recipe to API: " + err));
})



module.exports = NutritionRouter;