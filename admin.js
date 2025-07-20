const express=require('express')
const app=express();
const path=require('path')
const dir=path.join(__dirname,'Coinster','admin-dashboard','videos');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const session = require('express-session');
const multer=require('multer');
const subs=require("./subscribe");
const conten=require("./conten")
const data2=require("./database2")
mongoose.connect("mongodb://0.0.0.0/project");

const storage =  multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload =multer({ storage: storage ,
    limits: { fileSize: 10000000 * 1024 * 1024 }

    
});

const adminSchema = new mongoose.Schema({
    name:String,
    email:String,
    password: String
  });

  const data = mongoose.model('admins',adminSchema);

  app.set('view engine','ejs');

app.use("/",express.static(path.join(__dirname, 'Coinster','admin-dashboard')));
app.use(express.static(path.join(__dirname, 'Coinster')))
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
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
    const client= await data2.find()
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
    else{
        res.redirect("/adminlogin");
    }
})
app.get("/content",async(req,res)=>{

    if(req.session.admin){
        const con=await conten.find()
        const img=con.img
        res.render(path.join(__dirname, 'Coinster', 'admin-dashboard', 'conten2.ejs'),{con});
    }
    else{
        res.redirect("/adminlogin");
    }
})
app.post("/content",upload.fields([{ name: 'imge' }, { name: 'video' }]),async(req,res)=>{
    try {
        console.log(req.body);
        console.log(req.files); 
        const img1=req.files['imge'][0].path
        const resl=img1.replace(/\\/g, '/')
        const img2=resl.slice(65);
        const vid=req.files['video'][0].path
        const resl2=vid.replace(/\\/g, '/');
        const vid2=resl2.slice(65)

        const dat=new conten({
            contentype: req.body.contentype,
            contenname: req.body.contenname,
            imge:img2,
            video:vid2
    });
        const re=await dat.save();
        res.redirect("/content");
        console.log(re);
    } catch (error) {
        console.log(error);
    }
})

app.get('/edit', async (req, res) => {
    if (req.session.admin) {
        const params = req.query;
        const contentName = params.contentName;
        console.log(params);
        try {
            const con = await conten.findOne({contenname:contentName});
            console.log(con);
            if (!con) {
                return res.status(404).send("Data not found");
            }
            res.render(path.join(__dirname, 'Coinster', 'admin-dashboard', 'edit.ejs'), { con });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    } else {
        res.redirect("/adminlogin");
    }
});

app.post("/edit", upload.fields([{ name: 'imge' }, { name: 'video' }]), async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.files); 

        // Extracting file paths and names
        const img1 = req.files['imge'][0].path.replace(/\\/g, '/');
        const img2 = img1.slice(65);
        const vid1 = req.files['video'][0].path.replace(/\\/g, '/');
        const vid2 = vid1.slice(65);

        const params = req.query;
        const contentName = params.contentName;

        const con = await conten.findOne({ contenname: contentName });
        console.log(con);
        if (con) {
            con.contentype = req.body.contentype;
            con.contenname = req.body.contenname;
            con.imge = img2;
            con.video = vid2;
            await con.save(); 
        } else {
        
            res.status(404).send("Content not found");
        }
    } catch (error) {
    
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/delete",async(req,res)=>{
    if (req.session.admin) {
        const params = req.query;
        const contentName = params.contentName;
        console.log()
        console.log(params);
        try {
            const con = await conten.findOne({contenname:contentName});
            console.log(con);
            if (!con) {
                return res.status(404).send("Data not found");
            }
            res.render(path.join(__dirname, 'Coinster', 'admin-dashboard', 'delete.ejs'), { con });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    } 
    else {
        res.redirect("/adminlogin");
    }
});


app.post('/delete', async (req, res) => {
    try {
        const contentId = req.body.contentId;
        
        const deletedContent = await conten.deleteOne({_id:contentId});

        if (deletedContent) {
            res.redirect("/content")
        } else {
            res.status(404).send("Content not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'Coinster','admin-dashboard','4042.html'));
  })
app.listen(5000);