const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nutritionSchema = new Schema({
    nutrition : {
        type: Object,
        required: true
    }
});

const Nutrition = mongoose.model("Nutrition", nutritionSchema);

module.exports = Nutrition;