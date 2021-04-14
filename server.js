const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology: true}
);

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB connected sucessfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const imgRouter = require('./routes/image');
const nutritionRouter = require('./routes/nutrition');


app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/image', imgRouter);
app.use('/nutrition', nutritionRouter);

app.get("/", (req,res) => {
    console.log(process.env.PORT)
    res.json("running here")
});
app.listen(port, ()=> {
    console.log('Server is running on http: ' + port)
});
