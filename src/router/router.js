const express = require('express')
const router = express.Router();
const multer = require('multer');
const {createUser,userLogin,loginPage,registerPage,update,updatePage} = require('../controller/userController')



var Storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "./uploads/");
    },
    filename:(req, file, cb) =>{
        cb(null, Date.now() + "_" + file.originalname)
    }
})

var upload = multer ({
    storage:Storage
}).single('file');


router.post('/register',upload,createUser);
router.get('/register',registerPage);

router.post('/login',userLogin);
router.get('/login',loginPage);

router.get('/update',updatePage);
router.post('/update',update);


module.exports = router;