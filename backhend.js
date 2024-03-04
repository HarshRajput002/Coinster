
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const mailer = require('nodemailer');
const admin = require("./database");
const axios = require('axios');
const Razorpay=require("razorpay");
const data=require('./database2');
const subscribers=require('./subscribe')
mongoose.connect("mongodb://0.0.0.0/project");

const razorpay = new Razorpay({
  key_id: 'rzp_test_GAsukwnMdiybvM',
  key_secret: 'VZljKsSDGASH7PWvOtw7lI7N',
});


let smtpProtocol = mailer.createTransport({
  // host: "smtp.gmail.com",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "testingpro242@gmail.com",
    pass: "pjba uxhw epow uujv"
  }
})
app.use('/', express.static(path.join(__dirname, 'Coinster')));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: "screct", resave: true, saveUninitialized: true }));
app.use('/login', express.static(path.join(__dirname, 'Coinster', 'Sign')));
app.use(bodyParser.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.get('/login/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Coinster', 'Sign', 'sign in.html'));
});

app.post('/login/', async (req, res) => {
  const { email, password } = req.body;

  const client = await data.findOne({ email, password });
  const admins = await admin.findOne({ email, password });
  if (client || admins) {
    req.session.client = client;
    req.session.admins = admins

    var mailOptions = {
      from: 'testingpro242@gmail.com',
      to: email,
      subject: 'Greting!!',
      html: '<html> <body> <h1>Thank you for chossing Coinster</h1></body> </html>'
    };
    smtpProtocol.sendMail(mailOptions, function (err, response) {
      console.log(response);
      if (err) {
        res.sendFile(path.join(__dirname, 'Coinster', 'error.html'));
      }
      else{
      res.redirect("/");
      }
      smtpProtocol.close();
    });
  }

  else {
    res.sendFile(path.join(__dirname, 'Coinster', 'Sign', '403.html'));
  }


});


app.get('/login/sing', (req, res) => {
  res.sendFile(path.join(__dirname, 'Coinster', 'Sign', 'sign up.html'));
});

app.post('/login/sing', async (req, res) => {
  const { name, email, password } = req.body;
  const client = await data.findOne({ email });
  if (client) {
    res.sendFile(path.join(__dirname, 'Coinster', 'Sign', '4032.html'));
  }
  else {
    console.log(name);
    const save = new data(req.body);
    const resl = await save.save();
    if (resl) {
      res.redirect('/login')
    }

    else {
      res.sendFile(path.join(__dirname, 'Coinster', 'error.html'));
    }
  }
})

app.get("/login/forgotpassword", async (req, res) => {
  res.sendFile(path.join(__dirname, 'Coinster', 'Sign', 'forgot.html'));
})

app.post("/login/forgotpassword", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const abc = await data.findOne({ email });
  console.log(abc)
  if (abc) {
    res.redirect("/login/");
    const xyz = abc.password;
    var mailOptions = {
      from: 'testingpro242@gmail.com',
      to: email,
      subject: 'Greting!!',
      text: "This is your password" + " " + xyz
    };
    smtpProtocol.sendMail(mailOptions, function (err, response) {
      console.log(response);
      if (err) {
        res.sendFile(path.join(__dirname, 'Coinster', 'error.html'));
      }
      smtpProtocol.close();
    });
  }

  else {
    res.sendFile(path.join(__dirname, 'Coinster', 'Sign', '403.html'));
  }

})

app.get('/', (req, res) => {
  if (req.session.client || req.session.admins) {
    res.render(path.join(__dirname, 'Coinster','home.ejs'));
  }
  else {
    res.redirect('/login');
  }
});

app.get("/bitcoin", async(req, res) => {
  if(req.session.admins || req.session.client) {
    const response = await axios.get('https://api.coincap.io/v2/assets/bitcoin',{
      headers: {
        'Authorization': 'Bearer 8f0a96d4-6e4a-4607-bd6a-510133cddf45'
    }
    })
    const bitcoinData = response.data.data;
    console.log(bitcoinData);
    res.render(path.join(__dirname, 'Coinster', 'Bitcoin.ejs'), {bitcoinData});
  } else {
    res.redirect("/login");
  }
});

app.get("/Ethernum",async(req, res) => {
  if(req.session.admins || req.session.client){
    const response = await axios.get('https://api.coincap.io/v2/assets/ethereum',{
      headers: {
        'Authorization': 'Bearer 8f0a96d4-6e4a-4607-bd6a-510133cddf45'
    }
  })
    const coin = response.data.data;
    console.log(coin);
    
    res.render(path.join(__dirname, 'Coinster','Ethernum.ejs'),{coin});
  }
  else{
    res.redirect("/login");
  }
})
app.get("/Litecoin", async (req, res) => {
    if(req.session.admins || req.session.client){
      const response = await axios.get('https://api.coincap.io/v2/assets/litecoin',{
        headers: {
          'Authorization': 'Bearer 8f0a96d4-6e4a-4607-bd6a-510133cddf45'
      }
    })
      const coin = response.data.data;
      console.log(coin);
    res.render(path.join(__dirname, 'Coinster','Litcoin.ejs'),{coin});
    }
    else{
      res.redirect("/login");
    }
})
app.get("/Dogecoin",async (req, res) => {
    if(req.session.admins || req.session.client){
      const response = await axios.get('https://api.coincap.io/v2/assets/dogecoin',{
        headers: {
          'Authorization': 'Bearer 8f0a96d4-6e4a-4607-bd6a-510133cddf45'
      }
    })
      const coin = response.data.data;
      console.log(coin);
    res.render(path.join(__dirname, 'Coinster','Dogcoin.ejs'),{coin});
    }
    else{
      res.redirect("/login");
    }
})

app.get("/test",async(req,res)=>{
  const data=req.session.client;

  if(req.session.admins){
  res.sendFile(path.join(__dirname, 'Coinster', 'payment.html'));
  }
 else  if(req.session.client){
      const email=data.email;
      const resl =await subscribers.findOne({email});
  if(resl){
    res.sendFile(path.join(__dirname, 'Coinster', 'payment.html'));
  }
  res.sendFile(path.join(__dirname, 'Coinster', 'payment.html'));
  const sub= new subscribers(data);
  const resp=await sub.save();
  console.log(resp);
}
  else{
    res.redirect("/login");
  }
})

//coin's chart 
app.get('/dogechart', async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/dogecoin/market_chart?vs_currency=inr&days=365&interval=daily', {
    });
    const data = response.data;
    res.json(data);
  } catch (err) {
    console.error('Error fetching cryptocurrency data:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/Bitchart', async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=inr&days=365&interval=daily', {

    });
    const bitcoinData = response.data;

    res.json(bitcoinData);
  } catch (error) {
    console.error('Error fetching Bitcoin trading data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/litechart', async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/litecoin/market_chart?vs_currency=inr&days=365&interval=daily      ', {
    });
    const data = response.data;
    res.json(data);
  } catch (err) {
    console.error('Error fetching cryptocurrency data:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/etherumchart', async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=inr&days=365&interval=daily ', {
    });
    const data = response.data;
    res.json(data);
  } catch (err) {
    console.error('Error fetching cryptocurrency data:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/create-order", async (req, res) => {
  const data = req.session.client;
  const admin = req.session.admins;
  
  if (admin) {
    // If the user is an admin, return admin data
    return res.json({ admin: admin });
  }
    else if(data){
    const email=data.email; 
  const subscriber = await subscribers.findOne({ email });
      return res.json({subscriber: subscriber});

    }
  else {
    const options = {
      amount: 100*100, // amount in the smallest currency unit (in this case, paise)
      currency: 'INR',
      receipt: 'order_rcptid_11'
    };
    razorpay.orders.create(options, (err, order) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json(order);
    });
  }
});


app.get('*',async(req,res)=>{
  res.sendFile(path.join(__dirname, 'Coinster', 'error.html'));
})
app.listen(4000);

