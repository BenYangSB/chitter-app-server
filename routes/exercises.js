const router = require('express').Router();
let Exercise = require('../models/exercise.model');
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

  console.log("HERE");
  const username = req.body.username;
  const userKey = req.body.userKey;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);
  const ingredients = req.body.ingredients;
  const image = req.body.image;
  const instructions = req.body.instructions;


  const newExercise = new Exercise({
    username,
    userKey,
    description,
    instructions,
    duration,
    date,
    ingredients,
    image,
  });

  console.log(image)

  newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/feed/:id').get((req, res) => {

  let following = [];
  console.log(req);
  Exercise.find({userKey: req.params.id})
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/myRecipes/:id').get((req, res) => {
  Exercise.find({userKey : req.params.id})
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {

  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = exercise.username;
      exercise.userKey = exercise.userKey;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = exercise.date;
      exercise.ingredients = req.body.ingredients;
      exercise.image = req.body.image;
      exercise.instructions = re.body.instructions;

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;