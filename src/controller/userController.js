const { findByIdAndUpdate } = require('../model/userModel');
const userModel = require('../model/userModel')



/*--------------------------Create User API----------------------------------*/

const registerPage = async function(req, res) {
    res.render('/');
  };

const createUser = async function(req,res){
    let profile = req.file.filename;
    let data = req.body;
    let save = await userModel.create({
        name:data.name,
        email:data.email,
        password:data.password,
        image:profile
    });
    return res.render('login.ejs')
}



  /*--------------------------Login API----------------------------------*/

  const loginPage = async function(req, res) {
    res.render('login.ejs');
  };


const userLogin = async function(req,res){
    let data = req.body;
    let email = data.email;
    let password = data.password;

    let userData = await userModel.findOne({email:email,password:password})
    if(userData==null){
        return res.render('validation.ejs')
    }else{
        return res.render('userProfile',{user:userData})
    }
    
}


/*--------------------------Update API----------------------------------*/

const updatePage = async function(req, res) {
    const id = req.query.id;
    const userId = await userModel.findById({_id:id})
    res.render('update',{id:userId});
  };

const update = async function(req, res){
    let data = req.body;
    
    if(req.file){
        updateData: await userModel.findByIdAndUpdate({_id:req.body.userId},{$set:{name:data.name,email:data.email,image:req.file.filename}})
    }
    else{
       updateData: await userModel.findByIdAndUpdate({_id:req.body.userId},{$set:{name:data.name,email:data.email}})

    }
    return res.render('login')
}


module.exports = {createUser,userLogin,loginPage,registerPage,update,updatePage};