var express = require('express');
var Image = require('../models/image');
var ImageRouter = express.Router();
const multer = require('multer');
const path = require('path')
const AWS = require('aws-sdk')
require('dotenv/config')


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
})

const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
})

const upload = multer({storage}).single('image')
/* 
    stores image in uploads folder
    using multer and creates a reference to the 
    file
*/
ImageRouter.route("/uploadmulter").post(upload, (req, res) => {
        
    
        console.log("UPLOADING TO AWS")

        // const newImage = new Image({
        //     imageName: req.body.imageName,
        //     imageData: req.file.path
        // });

        const params = {
            Bucket: process.env.AWS_BUCKETNAME,
            Key: req.body.imageName,
            Body: req.file.buffer,
        }

        s3.upload(params, (error, data)=> {
            if(error){
                res.status(500).send(error)
            }
            console.log(data)
            res.send(data)
        })
    });

ImageRouter.route("/picture/:id").get((req, res) => {
    let repath = path.join(__dirname, '../')
    const filePath = (repath + 'uploads/'+req.params.id);
    console.log(filePath)
    res.sendFile(filePath)
});


module.exports = ImageRouter;