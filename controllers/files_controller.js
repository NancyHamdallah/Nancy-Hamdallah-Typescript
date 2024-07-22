const fs = require('fs');
const path = require('path');
const {readMyFileFunc} = require('../middleware/filesOperations')
//npm install multer
const multer = require('multer')


const readFiles = (req,res)=>{
    const id = './data/'+ req.params.id;
    console.log(id)
    res.render('details',{ data:{ filename: req.params.id,
                                fileContent: readMyFileFunc('./data/'+ req.params.id) 
                            }})    
}

const readFilesUpdate = (req,res)=>{
    const id = './data/'+ req.params.id;
    
    res.render('update',{ data:{ filename: req.params.id,
                                fileContent: readMyFileFunc('./data/'+ req.params.id) 
                            }})    
}

const createFile = (req,res)=>{
    console.log('./data/'+req.body.title)
    
    if(fs.existsSync('./data/'+req.body.title)){
        console.log('File exists')
        //res.redirect('/create')
        
    }
    else{
        fs.writeFileSync('./data/'+req.body.title,req.body.content)
        //res.render('index',{ data : fs.readdirSync('./data')})
        res.redirect('/')
    }
    
}

const deleteFile = (req,res)=>{
    
    if(!fs.existsSync('./data/'+req.params.id)){
        console.log('file does not exist');
    }
    else{
        fs.unlinkSync('./data/'+req.params.id);
        res.redirect('/')
    }
}

const updateFile = (req,res)=>{

    try {
        fs.appendFileSync('./data/'+req.params.id,req.body.content, { flag: 'w' });
        console.log('Appended data to ./data/'+ req.params.id);
        res.redirect('/')
      } catch (error) {
        res.sendStatus(400)
        console.error(`Got an error trying to append the file: {error.message}`);
      }


}

const showRenamePage = (req,res)=>{
    res.render('rename',{data:{filename:req.params.id}})
}
const renameFile = (req,res)=>{
    // check for file existence
    fs.renameSync('./data/'+req.params.id,'./data/'+req.body.newName)
    res.redirect('/');     
            
        }

const upload = (req,res)=>{

    res.redirect('/');
}


module.exports = {
    readFiles,
    createFile,
    deleteFile,
    readFilesUpdate,
    updateFile,
    showRenamePage,
    upload,
    renameFile
}