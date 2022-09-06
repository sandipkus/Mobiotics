const express = require('express');
const bodyParser = require('body-parser');
const router = require ('./router/router')
const mongoose = require('mongoose');
const app = express();
app.set('view engine','ejs');

app.use('/assets',express.static('assets'))
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'views'))



app.get('/', function(req,res){
    res.set({"Allow-access-Allow-Origin":'*'})
    return res.render('index.ejs')
})

mongoose.connect("mongodb+srv://Sandip:Sandip123@cluster0.69xqplz.mongodb.net/mobioticsDB?retryWrites=true&w=majority",{
    useNewUrlParser:true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/',router)

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});



