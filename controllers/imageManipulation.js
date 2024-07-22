
const express= require ('express')
const path = require('path');
const multer = require ('multer');
const sharp = require('sharp')
const fs = require('fs')

const resize = (req,res)=>{
    try{

    sharp(req.file.path)
    .resize({
        width: Number(req.body.width),
        height: Number(req.body.height)
      })
    .toFile('./resizedImages/'+req.file.filename )
    .then()
    //res.send('Image resized successfully')
    res.render('resizedImages',{data:fs.readdirSync('./resizedImages')});
    }catch(error){
        console.log('Error occurres while resizing');
    }
    
 
        
       
}

const crop = (req,res)=>{
    try{
        sharp(req.file.path)
        .extract({
            width:Number(req.body.width),
            height: Number(req.body.height),
            top: Number(req.body.top),
            left: Number(req.body.left)
        })
        .toFile('./croppedImages/'+req.file.filename)
        .then()

        res.render('croppedImages',{data:fs.readdirSync('./croppedImages')})
    }
    catch(error){
        console.error('Error occurred while Cropping')
    }
    
}

const bluring = (req,res)=>{
    try{
        sharp(req.file.path)
        .blur(10)
        .toFile('./blurredImages/'+req.file.filename)
        .then()

        res.render('blurredImages',{data:fs.readdirSync('./blurredImages')})
    }
    catch(error){
        console.error('Error occurred while Blurring')
    }
    
}

const rotate = (req,res)=> {
    try{
        sharp(req.file.path)
        //.rotate(33, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .rotate(20)
        .toFile('./rotatedImages/'+req.file.filename)
        .then()

        res.render('rotatedImages',{data:fs.readdirSync('./rotatedImages')})


    }catch(error){
        console.error('Error occurred while rotating')
    }
    
}

const grayscale = (req,res)=>{
    
        sharp(req.file.path)
        .grayscale()
        .toFile('./grayImages/'+req.file.filename)
        .then()

        res.render('grayImages',{data:fs.readdirSync('./grayImages')})
   
}



module.exports = {
    resize,
    crop,
    bluring,
    rotate,
    grayscale
}