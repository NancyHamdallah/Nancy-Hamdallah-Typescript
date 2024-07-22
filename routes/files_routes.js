const {Router} = require('express');
const router = new Router();
const fs = require('fs');
const {readMyFileFunc} = require('../middleware/filesOperations')
const files_controller = require('../controllers/files_controller')
const path = require('path');
const multer = require('multer');
const sharp = require('sharp')
const { createCanvas, loadImage } = require('canvas');
const gm = require('gm')
const imageManipulation = require('../controllers/imageManipulation')


const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"data");
    }
    ,
    filename: (req,file,cb)=>{
        cb(null, file.originalname);
    }

});

const upload = multer({storage:storage});



router.get('/',(req,res)=>{

    res.render('index',{ data : fs.readdirSync('./data')}) 
})

router.get('/files/:id',files_controller.readFiles)

router.get('/create',(req,res)=>{
    res.render('create')
})



router.post('/createNewFile',files_controller.createFile);

router.get('/delete/:id',files_controller.deleteFile);

router.get('/showUpdate/:id',files_controller.readFilesUpdate);
router.post('/update/:id',files_controller.updateFile);

router.get('/renamePage/:id',files_controller.showRenamePage)
router.post('/renameFile/:id',files_controller.renameFile);

router.get('/upload',(req,res)=> res.render('upload'))


router.post('/upload',upload.single("file"),(req,res)=>{
   // const result = req.file;
    //console.log('/'+result.destination+'/'+result.filename);
    //console.log(req.file.path)
  
    res.redirect('/');
});

router.post('/resize',upload.single("image"),imageManipulation.resize);
router.get('/resize',(req,res)=>{
    res.render('resizedImages',{data:fs.readdirSync('./resizedImages')})
})

router.post('/crop',upload.single("image"),imageManipulation.crop)

router.get('/crop',(req,res)=>{
    res.render('croppedImages',{data:fs.readdirSync('./croppedImages')})
})

router.get('/blur',(req,res)=>{
    res.render('blurredImages',{data:fs.readdirSync('./blurredImages')})
})

router.post('/blur',upload.single('image'),imageManipulation.bluring);

router.post('/rotate',upload.single("image"),imageManipulation.rotate)

router.get('/rotate',(req,res)=>{
    res.render('rotatedImages',{data:fs.readdirSync('./rotatedImages')})
})

router.post('/grayscale',upload.single("image"),imageManipulation.grayscale)

router.get('/grayscale',(req,res)=>{
    res.render('grayImages',{data:fs.readdirSync('./grayImages')})
})

router.post('/composite',upload.array('images',2),(req,res)=>{
    //make both images same size
    sharp(req.files[0].path)
    .resize({
        width: 200,
        height: 200
      })
    .toFile('./resizedImages/'+req.files[0].originalname)
    .then(()=>{
        
    sharp(req.files[1].path)
    .resize({
        width: 200,
        height: 200
      })
    .toFile('./resizedImages/'+req.files[1].originalname)
    .then(()=>{
        sharp('./resizedImages/'+req.files[0].originalname)
    .composite([{
        input : ('./resizedImages/'+req.files[1].originalname),
        top:20,
        left:20
    }
])
    .toFile('./compositedImages/'+req.files[0].originalname)
    .then()
    })

    
    

    })

    res.send('Transparent')
    
})
router.get('/composite',(req,res)=>{

    res.render('compositedImages',{data:fs.readdirSync('./compositedImages')})
})


// Define a route to handle image download
router.get('/download/:imageName', (req, res) => {
    const imageName = req.params.imageName;
   
    // Send the file as response
    console.log(req.params.path)
    res.sendFile(req.params.imageName.path);
});





module.exports = router;