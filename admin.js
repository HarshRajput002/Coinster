const express=require('express')
const app=express();
const path=require('path')
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const session = require('express-session');
const subs=require("./subscribe");
mongoose.connect("mongodb://0.0.0.0/project");

const adminSchema = new mongoose.Schema({
    name:String,
    email:String,
    password: String
  });
  const data = mongoose.model('admins',adminSchema);
  app.set('view engine','ejs');
app.use("/",express.static(path.join(__dirname, 'Coinster','admin-dashboard')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: "screct", resave: true, saveUninitialized: true }));

app.get("/",async(req,res)=>{
    const da=req.session.admin
    const pass=await data.findOne(da)
    if( req.session.admin){
    res.render(path.join(__dirname, 'Coinster', 'admin-dashboard', 'home.ejs'),{pass});
    }
    else{
        res.redirect("/adminlogin");
    }

})




app.get("/adminlogin",(req,res)=>{
    res.sendFile(path.join(__dirname, 'Coinster', 'admin-dashboard', 'login2.html'));
})

app.post("/adminlogin",async(req,res)=>{
    const {email,password}=req.body
    const check= await data.findOne({email,password}); 
    console.log(check);
    if(check){
        req.session.admin = check;
        res.redirect("/")
    }
    else{
        res.sendFile(path.join(__dirname, 'Coinster', 'admin-dashboard', '4033.html'));
    }
})

app.get("/adminsingup",(req,res)=>{
    res.sendFile(path.join(__dirname, 'Coinster', 'admin-dashboard', 'register2.html'));
})

app.post('/adminsingup',async(req,res)=>{
    const {name,email,password}=req.body
    const save=new data(req.body)
    
    const checkl = await data.findOne({email}); 
    if(checkl){
        res.sendFile(path.join(__dirname, 'Coinster', 'admin-dashboard', '4034.html'));
            
    }
    else {
        const resl=await save.save();
                        if(resl){
                                res.redirect("/adminlogin")
                        }
                        else{
                            res.sendFile(path.join(__dirname, 'Coinster', 'error.html'));
                        }
        }

})

app.get("/resetpassword",(req,res)=>{
    res.sendFile(path.join(__dirname, 'Coinster', 'admin-dashboard', 'reset-pass.html'));
})

app.post("/resetpassword",async(req,res)=>{
    const {email,password}=req.body
    const edit = await data.findOne({email}); 
    console.log(req.params);
    if(edit){
        edit.password = password;
        await edit.save();
        res.redirect("/adminlogin")
            }
    else{
        res.sendFile(path.join(__dirname, 'Coinster', 'admin-dashboard', '4033.html'));
    }
})

app.get("/logout",(req,res)=>{
        req.session.destroy((err)=>{
                if(err){
                    res.send("server error");
                }
                else{
                    res.redirect("/adminlogin");
                }
        })
})
app.get("/clients",async(req,res)=>{
    const client= await data.find()
    if(req.session.admin){
    res.render(path.join(__dirname, 'Coinster', 'admin-dashboard', 'client.ejs'),{client});
    }
    else{
        res.redirect("/adminlogin");
    }
})
app.get("/subs",async(req,res)=>{
    const sub=await subs.find()
    if(req.session.admin){
        res.render(path.join(__dirname, 'Coinster', 'admin-dashboard', 'subs.ejs'),{sub});
    }
})
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'Coinster', 'error.html'));
  })
app.listen(5000);