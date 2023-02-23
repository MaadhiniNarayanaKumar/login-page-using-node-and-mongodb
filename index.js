//import all
var express =require("express");
var bodyParse =require("body-parser");
var mongoose =require("mongoose");

// let's create app
const app=express()
app.use(bodyParse.json())
app.use(express.static('public'))
app.use(bodyParse.urlencoded({
    extended:true
}))

//let's connect database

mongoose.connect('mongodb://0.0.0.0:27017/login_page',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

var db=mongoose.connection;

//check the connection

db.on('error',()=>console.log("error not connecting"));
db.once('open',()=>console.log("connected"));

//create checking page
app.get("/",(req,res)=>{
    return res.redirect("index.html");
}).listen(3000);

app.post("/login",(request,response)=>{
    try{
        //let's try to get data from index.html
        const username=request.body.username;
        const password=request.body.password;
        
        const usermail = db.collection('login').findOne({ username: username }, (err, res) => {
            if (res == null) {
                response.send("Invalid information!❌❌❌! Please create account first");
            }
            else if (err) throw err;


            if (res.password === password) {
                return response.redirect('login.html');
            }
            else {
                response.send("Invalid Password!❌❌❌");
            }
    });
    }
    catch(error){
        console.log("Invalid info catch error")
    }
})