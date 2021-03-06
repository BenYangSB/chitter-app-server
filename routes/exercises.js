const router = require('express').Router();
const axios = require('axios');
let Exercise = require('../models/exercise.model');
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

  const username = req.body.username;
  const userKey = req.body.userKey;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);
  const ingredients = req.body.ingredients;
  const image = req.body.image;
  const instructions = req.body.instructions;
  const totalRating = req.body.totalRating;
  const numRatings = req.body.numRatings;
  const servings = req.body.servings;
  const nutritionEtagAndId = req.body.nutritionEtagAndId;  // most likely will be null (that is fine)


  const newExercise = new Exercise({
    username,
    userKey,
    description,
    duration,
    date,
    ingredients,
    image,
    instructions,
    totalRating,
    numRatings,
    servings,
    nutritionEtagAndId
  });

  console.log("uploading")

  newExercise.save()
    .then(() => res.json(newExercise._id))    // im trying to make res get set to the object id fo the newly saved recipe (not sure how)
    .catch(err => console.log(err));
});

router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/feed/:id').get((req, res) => {

  let following = [];
  console.log(req);
  Exercise.find({ userKey: req.params.id })
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/myRecipes/:id').get((req, res) => {
  Exercise.find({ userKey: req.params.id })
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(exercise => {
          console.log("Deleting nutrtion from db" + exercise.nutritionEtagAndId.id);
          axios.delete('http://localhost:5000/nutrition/db/recipe/delete/' + exercise.nutritionEtagAndId.id)
            .catch(err => console.log(err));
      res.json('Exercise deleted.')
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {

      exercise.username = exercise.username;
      exercise.userKey = exercise.userKey;
      exercise.description = req.body.description;
      exercise.instructions = req.body.instructions;
      exercise.duration = Number(req.body.duration);
      exercise.date = exercise.date;
      exercise.ingredients = req.body.ingredients;
      exercise.image = req.body.image;
      exercise.totalRating = req.body.totalRating;
      exercise.numRatings = req.body.numRatings;
      exercise.servings = req.body.servings;
      exercise.nutritionEtagAndId = req.body.nutritionEtagAndId;


      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = router;